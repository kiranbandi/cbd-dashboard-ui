import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScheduleBlock from './ScheduleBlock';
import MonthLayer from './MonthLayer';
import { showRotationTooltip, updateResidentData, setResidentFilter } from '../../../redux/actions/actions';
import RotationTooltip from './RotationTooltip';

class RotatioSchedule extends Component {

    constructor(props) {
        super(props);
        this.showHistorySchedule = this.showHistorySchedule.bind(this);
        this.showEPAsPerBlock = this.showEPAsPerBlock.bind(this);
        this.state = {
            isHistoryVisible: false,
            isEPAperBlockVisible: false,
            activeScheduleBlock: -1
        };
    }

    showHistorySchedule() {
        this.setState({ isHistoryVisible: !this.state.isHistoryVisible });
    }

    showEPAsPerBlock() {
        this.setState({ isEPAperBlockVisible: !this.state.isEPAperBlockVisible });
    }

    onScheduleBlockClick = (event) => {

        const { rotationSchedule = [], actions,
            residentData, residentFilter = {} } = this.props,
            activeScheduleBlock = event.currentTarget.id.slice(9);

        const block = _.find(rotationSchedule, (d) => d.unique_id == activeScheduleBlock) || false;

        this.setState({ activeScheduleBlock });

        if (block && block.start_date && block.end_date) {

            const startDate = block.start_date, endDate = block.end_date;

            //Set the dates and filter date props on the resident filter
            actions.setResidentFilter({
                ...residentFilter,
                startDate, endDate,
                'isAllData': false,
                'hideNoDataEPAs': true
            });

            if (!!residentData) {
                var updatedResidentData = {};
                _.map(residentData, (epaList = [], epaKey) => {
                    updatedResidentData[epaKey] = _.map(epaList, (d) => {
                        if (!!startDate && !!endDate) {
                            d.mark = moment(d.Date, 'YYYY-MM-DD').isBetween(startDate, endDate, 'days', '[]')
                        }
                        else { d.mark = false }
                        return d;
                    });
                });
                actions.updateResidentData(updatedResidentData);
            }
        }
    }


    render() {

        const { residentData = {}, width, rotationSchedule = [],
            isRotationTooltipVisible, rotationTooltipData, residentFilter } = this.props,
            { isHistoryVisible, isEPAperBlockVisible, activeScheduleBlock } = this.state;

        //200px to offset the margin on both sides and vertical scroll bar width
        const widthAvailable = width - 25;

        // group rotation blocks by academic year 
        const rotationScheduleYearGroup = _.groupBy(rotationSchedule, (e) => e['academic_year']);

        // group resident records also by academic year 
        const recordsGroupedByAcademicYear = _.groupBy(_.flatMap(residentData), (f) => f['academic_year']);

        // if the current month is before july then pick the last year  
        // moment months start from 0 (Jan) weirdly so also account for that
        const currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year();

        // Get a list of all academic years for which schedule blocks are available
        // then select all years before the current year from it and sort the list
        // in an ascending order to get historical schedule list
        const historicalYears = _.keys(rotationScheduleYearGroup)
            .filter((e) => +e < currentAcademicYear).sort();

        const currentSchedule = rotationScheduleYearGroup[currentAcademicYear] || [];

        // If a rotation schedule isnt available then dont render anything
        if (currentSchedule.length == 0 && historicalYears.length == 0) { return '' };

        // Only show active block is resident filter is off.
        const activeScheduleBlockID = residentFilter.isAllData ? -1 : activeScheduleBlock;


        return (
            <div className='schedule-box text-center hidden-xs'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content"> ROTATION SCHEDULE </h4>
                </div>
                <div className='button-wrapper'>
                    <button
                        onClick={this.showHistorySchedule}
                        className={'view-back-button btn btn-primary-outline' + (isHistoryVisible ? ' selected' : '')}>
                        <span className="fa fa-history"></span>
                        <span>View History</span>
                    </button>
                    <button
                        onClick={this.showEPAsPerBlock}
                        className={'view-back-button per-block-button btn btn-primary-outline' + (isEPAperBlockVisible ? ' selected' : '')}>
                        <span className="fa fa-database"></span>
                        <span>View EPAs/Block</span>
                    </button>
                </div>

                {/* Display historical schedules if available */}
                {isHistoryVisible && <div className='all-historical-schedule'>
                    {historicalYears.length > 0 ?
                        _.map(historicalYears, (year) => <ScheduleBlock
                            key={'yearblock-' + year}
                            academicYear={year}
                            activeScheduleBlock={activeScheduleBlockID}
                            isEPAperBlockVisible={isEPAperBlockVisible}
                            residentData={recordsGroupedByAcademicYear[year]}
                            scheduleList={rotationScheduleYearGroup[year]}
                            widthAvailable={widthAvailable}
                            onScheduleBlockClick={this.onScheduleBlockClick}
                            showRotationTooltip={this.props.actions.showRotationTooltip} />) :
                        <h3 className='no-history-label'>No Historical Data available</h3>}
                </div>}
                {/* Display month list chronological as a reference map */}
                <MonthLayer width={widthAvailable} />
                {/* Display the current schedule */}
                {currentSchedule.length > 0 ? <ScheduleBlock
                    activeScheduleBlock={activeScheduleBlockID}
                    academicYear={currentAcademicYear}
                    isEPAperBlockVisible={isEPAperBlockVisible}
                    residentData={recordsGroupedByAcademicYear[currentAcademicYear]}
                    scheduleList={currentSchedule}
                    widthAvailable={widthAvailable}
                    onScheduleBlockClick={this.onScheduleBlockClick}
                    showRotationTooltip={this.props.actions.showRotationTooltip} /> :
                    <p className='no-rotation-banner'>No rotation schedule available for academic year - {currentAcademicYear}</p>}
                {/* code chunk to show rotation tooltip*/}
                {isRotationTooltipVisible && <RotationTooltip {...rotationTooltipData} />}
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        isRotationTooltipVisible: state.oracle.isRotationTooltipVisible,
        rotationTooltipData: state.oracle.rotationTooltipData,
        residentFilter: state.oracle.residentFilter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            showRotationTooltip,
            setResidentFilter,
            updateResidentData
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RotatioSchedule);
