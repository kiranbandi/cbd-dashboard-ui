/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResidentData, getNarratives } from '../utils/requestServer';
import moment from 'moment';
import templateEpaSourceMap from '../utils/epaSourceMap';
import _ from 'lodash';
import Loading from 'react-loading';
import { toggleFilterLoader, setResidentFilter, setResidentData, setNarrativeData } from '../redux/actions/actions';

class FilterPanel extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEPAToggle = this.onEPAToggle.bind(this);
        this.onVisbilityToggle = this.onVisbilityToggle.bind(this);
        this.onFilterToggleClick = this.onFilterToggleClick.bind(this);
        this.state = {
            showUncommencedEPA: true,
            openOnlyCurrentPhase: true,
            isFilterOpen: false
        };
    }

    onChange(event) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.isAllData = event.target.checked;
        actions.setResidentFilter({ ...residentFilter });
    }

    onFilterToggleClick(event) {
        const { isFilterOpen } = this.state;
        this.setState({ 'isFilterOpen': !isFilterOpen });
    }

    onEPAToggle(event) {
        this.setState({ showUncommencedEPA: !this.state.showUncommencedEPA });
    }

    onVisbilityToggle(event) {
        this.setState({ openOnlyCurrentPhase: !this.state.openOnlyCurrentPhase });
    }

    onSubmit(event) {
        let { residentFilter = {}, actions, residentList } = this.props,
            { showUncommencedEPA, openOnlyCurrentPhase } = this.state;

        residentFilter.startDate = document.getElementById('filter-startDate').value;
        residentFilter.endDate = document.getElementById('filter-endDate').value;
        residentFilter.username = document.getElementById('filter-residentName').value;

        // set all the parameters in the resident filter
        actions.setResidentFilter({ ...residentFilter });
        // toggle loader
        actions.toggleFilterLoader();

        // Fitler out resident info from the list 
        let residentInfo = _.find(residentList, (d) => d.username == residentFilter.username);

        // fetch data from server based on the filter params
        // Dirty solution but eventually all filtering will happen on the server so no point 
        //  in repeating this again.
        getResidentData(residentFilter.username)
            .then((residentData) => {

                // mark records in the selected date range with a flag
                var markedResidentData = _.map(residentData, (d) => {
                    if (residentFilter.isAllData) {
                        d.mark = false;
                    }
                    else {
                        d.mark = moment(d.Date, 'YYYY-MM-DD').isAfter(moment(residentFilter.startDate, 'MM/DD/YYYY')) && moment(d.Date, 'YYYY-MM-DD').isBefore(moment(residentFilter.endDate, 'MM/DD/YYYY'));
                    }
                    return d;
                })

                // group data on the basis of EPA
                var groupedResidentData = _.groupBy(markedResidentData, (d) => d.EPA);

                // if uncommenced EPAs are needed to be seen then sub in empty records
                if (showUncommencedEPA) {
                    _.map(templateEpaSourceMap, (source) => {
                        _.map(source.subRoot, (epa, innerKey) => {
                            if (!groupedResidentData.hasOwnProperty(innerKey)) {
                                groupedResidentData[innerKey] = [];
                            }
                        })
                    })
                }
                // store the info of visibility of phase into resident info
                residentInfo.openOnlyCurrentPhase = openOnlyCurrentPhase;
                actions.setResidentData(groupedResidentData, residentInfo);
                // Finally get narratives for the resident
                return getNarratives(residentFilter.username);

            })
            .then((narrativeData) => {
                actions.setNarrativeData(narrativeData);
            })
            .finally(() => { actions.toggleFilterLoader(); });
    }

    render() {

        const { filterLoaderState, residentList = [], residentFilter = {} } = this.props,
            {
                isAllData = false,
                residentName = '',
                startDate = moment().format('MM/DD/YYYY'),
                endDate = moment().format('MM/DD/YYYY')
            } = residentFilter,
            { isFilterOpen } = this.state;


        // Sort the residents alphabetically so that they are easier to look up
        residentList.sort((previous, current) => previous.fullname.localeCompare(current.fullname));

        return (
            <div className='filter-panel m-t center-align'>

                <div className='text-xs-center text-sm-left root-box'>
                    <div className='name-box'>
                        <label className='filter-label'>Resident Name  </label>
                        <select id='filter-residentName' defaultValue={residentName} className="custom-select">
                            {residentList.map((val, index) => { return <option key={index} value={val.username}> {val.fullname}</option> })}
                        </select>
                    </div>

                    <div className='filter-button-container'>
                        <button className={'btn btn-primary-outline ' + (isFilterOpen ? " active-button" : "not-active")} onClick={this.onFilterToggleClick} ><span className="icon icon-funnel"></span></button>
                    </div>

                    <div className='text-xs-left button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>
                            GET RECORDS
                    {filterLoaderState && <Loading className='filter-loader' type='spin' height='25px' width='25px' color='white' delay={-1} />}
                        </button>
                    </div>
                </div>

                {/* let the elements be hidden by css style instead of react , to prevent dead elements value problem when submitting */}

                <div className={'text-xs-left advanced-filter-box ' + (isFilterOpen ? 'show-filter' : 'hide-filter')}>
                    <div className="checkbox custom-control text-center custom-checkbox">
                        <label className='filter-label'>
                            {"Show EPAs with No Data"}
                            <input id='filter-hide-epa' type="checkbox" checked={this.state.showUncommencedEPA} onChange={this.onEPAToggle} />
                            <span className="custom-control-indicator"></span>
                        </label>
                    </div>
                    <div className="checkbox custom-control text-center custom-checkbox">
                        <label className='filter-label'>
                            {"Open Current Phase Only"}
                            <input id='filter-hide-phases' type="checkbox" checked={this.state.openOnlyCurrentPhase} onChange={this.onVisbilityToggle} />
                            <span className="custom-control-indicator"></span>
                        </label>
                    </div>

                    <div>
                        <div className="checkbox custom-control text-center custom-checkbox">
                            <label className='filter-label'>
                                {"Disable Date Filter"}
                                <input id='filter-isAllData' type="checkbox" checked={isAllData} onChange={this.onChange} />
                                <span className="custom-control-indicator"></span>
                            </label>
                        </div>
                        <div className='date-box'>
                            <label className='filter-label'> Start Date</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='filter-startDate' defaultValue={startDate} disabled={isAllData} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                        <div className='date-box'>
                            <label className='filter-label'> End Date</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='filter-endDate' disabled={isAllData} defaultValue={endDate} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList,
        filterLoaderState: state.oracle.filterLoaderState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleFilterLoader,
            setResidentFilter,
            setResidentData,
            setNarrativeData
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
