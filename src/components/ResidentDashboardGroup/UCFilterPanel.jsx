/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import ReactSelect from 'react-select';
import { getResidentData, getNarratives } from '../../utils/requestServer';
import {
    toggleFilterLoader, setResidentFilter, toggleExamScore,
    setResidentData, setNarrativeData
} from '../../redux/actions/actions';


class FilterPanel extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFilterToggleClick = this.onFilterToggleClick.bind(this);
        this.onResidentNameChange = this.onResidentNameChange.bind(this);
        this.state = {
            showUncommencedEPA: true,
            openOnlyCurrentPhase: true,
            isFilterOpen: false
        };
    }

    onSubmit() {
        let { residentFilter = {}, selectResident } = this.props;
        selectResident(residentFilter.username);
    }

    onResidentNameChange(option) {
        let { residentFilter = {}, actions, selectResident } = this.props;
        residentFilter.username = option.value;
        actions.setResidentFilter({ ...residentFilter });
        // clear data if present for any other previously selected resident
        actions.setNarrativeData([]);
        actions.setResidentData(null);
        selectResident(option.value);
    }

    onFilterToggleClick(event) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.isAllData = !residentFilter.isAllData;
        actions.setResidentFilter({ ...residentFilter });
    }

    render() {

        const { residentList = [], residentFilter = {} } = this.props,
            {
                isAllData = false,
                username = '',
                startDate = moment().format('MM/DD/YYYY'),
                endDate = moment().format('MM/DD/YYYY')
            } = residentFilter;


        //  first convert the array into the format required by react-select 
        let modifiedResidentList = _.map(residentList, (d) => {
            return {
                label: d.fullname,
                value: d.username,
            };
        })

        const currentSelectValue = _.find(modifiedResidentList, (d) => d.value == username) || null;

        return (
            <div className='upload-custom filter-panel m-t center-align'>

                <div className='text-xs-center text-sm-left root-box'>

                    <div className='react-select-root-filter'>
                        <ReactSelect
                            placeholder='Select Resident...'
                            isSearchable={true}
                            value={currentSelectValue}
                            options={modifiedResidentList}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                            onChange={this.onResidentNameChange} />
                    </div>

                    <div className='filter-button-container'>
                        <button className={'btn btn-primary-outline ' + ((!isAllData) ? " active-button" : "not-active")} onClick={this.onFilterToggleClick} ><span className="icon icon-funnel"></span></button>
                    </div>

                    <div className='text-xs-left button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>
                            FILTER RECORDS
                        </button>
                    </div>
                </div>

                {/* let the elements be hidden by css style instead of react , to prevent dead elements value problem when submitting */}

                <div className={'text-xs-left advanced-filter-box ' + ((!isAllData) ? 'show-filter' : 'hide-filter')}>
                    <div>
                        <div className='date-box'>
                            <label className='filter-label'>Period</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='filter-startDate-resident' defaultValue={startDate} disabled={isAllData} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                        <span className='inner-splice'>-</span>
                        <div className='date-box trailing'>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='filter-endDate-resident' disabled={isAllData} defaultValue={endDate} className="form-control" data-provide="datepicker" />
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
