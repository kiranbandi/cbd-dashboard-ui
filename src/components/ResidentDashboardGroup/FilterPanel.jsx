/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import Loading from 'react-loading';
import ReactSelect from 'react-select';
import { getLearnerData } from '../../utils/requestServer';
import { STAGES_LIST } from '../../utils/programInfo';
import {
    toggleFilterLoader, setResidentFilter, toggleExamScore,
    setResidentData, setNarrativeData
} from '../../redux/actions/actions';

const MODDED_PHASE_LIST = STAGES_LIST.map((phase) => phase.split('-').join(" ").toUpperCase());

class FilterPanel extends Component {

    constructor(props) {
        super(props);
        this.onAllDataToggle = this.onAllDataToggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEPAToggle = this.onEPAToggle.bind(this);
        this.onVisbilityToggle = this.onVisbilityToggle.bind(this);
        this.onFilterToggleClick = this.onFilterToggleClick.bind(this);
        this.onExamScoreToggle = this.onExamScoreToggle.bind(this);
        this.onResidentNameChange = this.onResidentNameChange.bind(this);
        this.state = {
            showUncommencedEPA: true,
            openOnlyCurrentPhase: true,
            isFilterOpen: false
        };
    }


    onResidentNameChange(option) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.username = option.value;
        actions.setResidentFilter({ ...residentFilter });
        // clear data if present for any other previously selected resident
        actions.setNarrativeData([]);
        actions.setResidentData(null);
    }

    onAllDataToggle(event) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.isAllData = !residentFilter.isAllData;
        actions.setResidentFilter({ ...residentFilter });
    }

    onFilterToggleClick(event) {
        this.setState({ isFilterOpen: !this.state.isFilterOpen });
    }

    onExamScoreToggle(event) {
        this.props.actions.toggleExamScore();
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

        // Fitler out resident info from the list 
        let residentInfo = _.find(residentList, (d) => d.username == residentFilter.username);

        // if the selected resident is valid and his info is available
        if (residentInfo) {
            // set all the parameters in the resident filter
            actions.setResidentFilter({ ...residentFilter });
            // toggle loader
            actions.toggleFilterLoader();

            // fetch data from server based on the filter params
            // Dirty solution but eventually all filtering will happen on the server so no point 
            //  in repeating this again.
            getLearnerData(residentFilter.username, residentInfo.fullname)
                .then((processedData) => {

                    const { programInfo, residentData } = processedData;

                    // mark records in the selected date range with a flag
                    var markedResidentData = _.map(residentData, (d) => {
                        if (residentFilter.isAllData) { d.mark = false }
                        else {
                            d.mark = moment(d.Date, 'YYYY-MM-DD').isBetween(moment(residentFilter.startDate, 'MM/DD/YYYY'), moment(residentFilter.endDate, 'MM/DD/YYYY'), 'days', '[]')
                        }
                        return d;
                    })

                    // group data on the basis of EPA
                    var groupedResidentData = _.groupBy(markedResidentData, (d) => d.EPA);

                    // force sort data by Date in each EPA type
                    // also if uncommenced EPAs are needed to be seen then sub in empty records
                    _.map(programInfo.epaSourceMap, (source) => {
                        _.map(source.subRoot, (epa, innerKey) => {
                            if (showUncommencedEPA && !groupedResidentData.hasOwnProperty(innerKey)) {
                                groupedResidentData[innerKey] = [];
                            }
                            if (groupedResidentData[innerKey]) {
                                groupedResidentData[innerKey] = _.sortBy(groupedResidentData[innerKey], (d) => d.Date);
                            }
                        })
                    })

                    // store the info of visibility of phase into resident info
                    residentInfo.openOnlyCurrentPhase = openOnlyCurrentPhase;
                    actions.setResidentData(groupedResidentData, residentInfo, programInfo);
                })
                .finally(() => { actions.toggleFilterLoader(); });
        }

    }

    render() {

        const { filterLoaderState, residentList = []
            , residentFilter = {} } = this.props,
            isFilterOpen = false,
            { isAllData = false, username = '' } = residentFilter;
        //  first convert the array into the format required by react-select 
        let modifiedResidentList = _.map(residentList, (d) => {
            return {
                label: d.fullname,
                value: d.username,
                currentPhase: d.currentPhase.split("-").join(" ").toUpperCase()
            };
        })
        // then group the array based on current phase of resident
        let groupedResidentList = _.groupBy(modifiedResidentList, (d) => d.currentPhase);

        //  then remap the array without the phase info in it 
        // and also internally sort the elements
        // so first the groups are sorted based on the order in which the resident goes 
        // through them and then the residents in each group are sorted alpabetically
        groupedResidentList = _.map(groupedResidentList, (options, label) => {
            return { label, options: options.sort((prev, cur) => prev.label.localeCompare(cur.label)) }
        }).sort((a, b) => MODDED_PHASE_LIST.indexOf(a.label) - MODDED_PHASE_LIST.indexOf(b.label));

        const currentSelectValue = _.find(modifiedResidentList, (d) => d.value == username) || null;

        return (
            <div className='filter-panel m-t center-align'>

                <div className='text-xs-center text-sm-left root-box'>

                    <div className='react-select-root-filter'>
                        <ReactSelect
                            placeholder='Select Resident...'
                            isSearchable={true}
                            value={currentSelectValue}
                            options={groupedResidentList}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                            onChange={this.onResidentNameChange} />
                    </div>

                    <div className='filter-button-container'>
                        <button className={'btn btn-primary-outline ' + (isFilterOpen ? " active-button" : "not-active")} onClick={this.onFilterToggleClick} ><span className="icon icon-funnel"></span></button>
                    </div>

                    <div className='text-xs-left button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>
                            GET RECORDS
                    {filterLoaderState && <Loading className='filter-loader' type='spin' height='25px' width='25px' color='grey' delay={-1} />}
                        </button>
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
            setNarrativeData,
            toggleExamScore
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
