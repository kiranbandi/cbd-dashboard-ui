import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import ReactSelect from 'react-select';
import { getLearnerData } from '../../utils/requestServer';
import getTrainingStages from '../../utils/getTrainingStages';
import {
    toggleFilterLoader, setResidentFilter,
    toggleExamScore, setResidentData, updateResidentData
} from '../../redux/actions/actions';
import { DateRangePicker } from 'react-dates';
import infoTooltipReference from '../../utils/infoTooltipReference';
import ReactTooltip from 'react-tooltip';

const MODDED_PHASE_LIST = getTrainingStages()
    .map((phase) => phase.split('-').join(" ").toUpperCase());

class FilterPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onResidentNameChange = (option) => {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.username = option.value;
        actions.setResidentFilter({ ...residentFilter });
        actions.setResidentData(null);
    }

    onDatesChange = ({ startDate, endDate }) => {
        let { residentFilter = {}, actions, residentData } = this.props;

        //Set the dates on the resident filter
        residentFilter.startDate = startDate;
        residentFilter.endDate = endDate;
        actions.setResidentFilter({ ...residentFilter });

        if (!!residentData) {
            var updatedResidentData = {};
            _.map(residentData, (epaList = [], epaKey) => {
                updatedResidentData[epaKey] = _.map(epaList, (d) => {
                    if (residentFilter.isAllData) { d.mark = false }
                    else if (!!startDate && !!endDate) {
                        d.mark = moment(d.Date, 'YYYY-MM-DD').isBetween(startDate, endDate, 'days', '[]')
                    }
                    else { d.mark = false }
                    return d;
                });
            });
            actions.updateResidentData(updatedResidentData);
        }

    }

    onHideNoRecordEPAs = (event) => {
        let { residentFilter = {}, actions, residentData } = this.props;

        residentFilter.hideNoDataEPAs = event.target.checked;
        actions.setResidentFilter({ ...residentFilter });

    }

    onDateFilterClick = (event) => {
        let { residentFilter = {}, actions, residentData } = this.props,
            { isAllData, startDate, endDate } = residentFilter;

        // Toggle the resident filter and set it
        residentFilter.isAllData = !isAllData;
        actions.setResidentFilter({ ...residentFilter });

        if (!!residentData) {
            var updatedResidentData = {};
            _.map(residentData, (epaList = [], epaKey) => {
                updatedResidentData[epaKey] = _.map(epaList, (d) => {
                    if (residentFilter.isAllData) { d.mark = false }
                    else if (!!startDate && !!endDate) {
                        d.mark = moment(d.Date, 'YYYY-MM-DD').isBetween(startDate, endDate, 'days', '[]')
                    }
                    else { d.mark = false }
                    return d;
                });
            });
            actions.updateResidentData(updatedResidentData);
        }

    }

    onSubmit = (event) => {
        let { residentFilter = {}, actions, residentList } = this.props;

        // Fitler out resident info from the list 
        let residentInfo = _.find(residentList, (d) => d.username == residentFilter.username);

        // if the selected resident is valid and his info is available
        if (residentInfo) {
            // set all the parameters in the resident filter
            actions.setResidentFilter({ ...residentFilter });
            // toggle loader
            actions.toggleFilterLoader();
            // fetch data from server based on the filter params
            getLearnerData(residentFilter.username, residentInfo)
                .then((processedData) => {
                    const { programInfo, residentData, rotationSchedule, expiredData } = processedData;
                    // remap the data and set it on redux store
                    mapDataAndMarkDatePeriod(residentData, residentFilter, programInfo, residentInfo, rotationSchedule, expiredData, actions.setResidentData);

                })
                .finally(() => { actions.toggleFilterLoader(); });
        }

    }

    render() {

        const { filterLoaderState, residentList = []
            , residentFilter = {}, dashboard_mode = 'faculty', residentData } = this.props,
            { isAllData = true, username = '',
                startDate, endDate, hideNoDataEPAs } = residentFilter;
        //  first convert the array into the format required by react-select 
        let modifiedResidentList = _.map(residentList, (d) => {
            return {
                label: d.fullname + " (" + (d.totalProgress || 0) + "%)",
                value: d.username,
                currentPhase: d.currentPhase ? d.currentPhase.split("-").join(" ").toUpperCase() : ''
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

        const isFacultyMode = dashboard_mode != 'resident';

        // If we are in resident mode and there is no data hide the filter panel
        if (!isFacultyMode && _.flatMap(residentData).length == 0) { return null };

        return (
            <div className={('filter-panel center-align') + (isFacultyMode ? '' : 'smaller-wrapper')}>
                <div className={('text-xs-center text-sm-left root-box ') + (isFacultyMode ? '' : 'smaller-box')}>
                    {isFacultyMode ? <div className='react-select-root-filter'>
                        <ReactSelect
                            placeholder='Select Resident...'
                            isSearchable={true}
                            value={currentSelectValue}
                            options={groupedResidentList}
                            styles={{
                                option: (styles, { isSelected }) => ({
                                    ...styles,
                                    color: isSelected ? 'white' : 'black',
                                    textAlign: 'left',
                                })
                            }}
                            onChange={this.onResidentNameChange} />
                    </div> : <p className='date-filter-label'>Date Filter</p>}

                    <div className='filter-button-container'>
                        <button data-for='date-buttontip' data-tip={infoTooltipReference.residentMetrics.dateFilter}
                            className={'btn btn-primary-outline ' + (!isAllData ? " active-button" : "not-active")}
                            onClick={this.onDateFilterClick} ><i className="fa fa-calendar" aria-hidden="true"></i></button>
                        <ReactTooltip id='date-buttontip' delayShow={500} className='custom-react-tooltip' />
                    </div>

                    {isFacultyMode && <div className='text-xs-left button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>
                            GET RECORDS
                            {filterLoaderState && <i className='fa fa-spinner fa-spin filter-loader'></i>}
                        </button>
                    </div>}
                </div>

                {/* let the elements be hidden by css style instead of react , to prevent dead elements value problem when submitting */}
                <div className={'text-xs-left advanced-filter-box ' + (!isAllData ? 'show-filter' : 'hide-filter')}>
                    <DateRangePicker
                        hideKeyboardShortcutsPanel={true}
                        isOutsideRange={() => false}
                        startDate={startDate}
                        startDateId="dashboard_unique_start_date_id"
                        endDate={endDate}
                        endDateId="dashboard_unique_end_date_id"
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    />

                    <div className="checkbox custom-control text-center custom-checkbox">
                        <label className='custom-checkbox-label'>
                            Hide EPAs with no assessments in the time period.
                            <input id='filter-dateFilterActive' type="checkbox"
                                checked={hideNoDataEPAs} onChange={this.onHideNoRecordEPAs} />
                            <span className="custom-control-indicator"></span>
                        </label>
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
        residentData: state.oracle.residentData,
        filterLoaderState: state.oracle.filterLoaderState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleFilterLoader,
            setResidentFilter,
            setResidentData,
            toggleExamScore,
            updateResidentData
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);


function mapDataAndMarkDatePeriod(residentData, residentFilter, programInfo, residentInfo, rotationSchedule, expiredData, setResidentData) {

    const { isAllData, startDate, endDate } = residentFilter;

    // mark records in the selected date range with a flag
    var markedResidentData = _.map(residentData, (d) => {
        if (isAllData) { d.mark = false }
        else if (!!startDate && !!endDate) {
            d.mark = moment(d.Date, 'YYYY-MM-DD').isBetween(startDate, endDate, 'days', '[]')
        }
        else { d.mark = false }
        return d;
    })

    // group data on the basis of EPA
    var groupedResidentData = _.groupBy(markedResidentData, (d) => d.EPA);

    // force sort data by Date in each EPA type
    // also if uncommenced EPAs are needed to be seen then sub in empty records
    _.map(programInfo.epaSourceMap, (source) => {
        _.map(source.subRoot, (epa, innerKey) => {
            if (!groupedResidentData.hasOwnProperty(innerKey)) {
                groupedResidentData[innerKey] = [];
            }
            if (groupedResidentData[innerKey]) {
                groupedResidentData[innerKey] = _.sortBy(groupedResidentData[innerKey], (d) => d.Date);
            }
        })
    })
    // set the resident data onto redux store
    setResidentData(groupedResidentData, residentInfo, programInfo, rotationSchedule, expiredData);
}