import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScheduleBlock from './ScheduleBlock';
import MonthLayer from './MonthLayer';
import { showRotationTooltip } from '../../../redux/actions/actions';
import RotationTooltip from './RotationTooltip';

class RotatioSchedule extends Component {

    constructor(props) {
        super(props);
        this.showHistorySchedule = this.showHistorySchedule.bind(this);
        this.showEPAsPerBlock = this.showEPAsPerBlock.bind(this);
        this.state = {
            isHistoryVisible: false,
            isEPAperBlockVisible: false
        };
    }

    showHistorySchedule() {
        this.setState({ isHistoryVisible: !this.state.isHistoryVisible });
    }

    showEPAsPerBlock() {
        this.setState({ isEPAperBlockVisible: !this.state.isEPAperBlockVisible });
    }


    render() {

        const { residentData = [], width, rotationSchedule = [],
            isRotationTooltipVisible, rotationTooltipData } = this.props,
            { isHistoryVisible, isEPAperBlockVisible } = this.state;

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
        if (currentSchedule.length == 0) { this.return; }

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
                        _.map(historicalYears, (year) => {
                            return <ScheduleBlock
                                key={'yearblock-' + year}
                                academicYear={year}
                                isEPAperBlockVisible={isEPAperBlockVisible}
                                residentData={recordsGroupedByAcademicYear[year]}
                                scheduleList={rotationScheduleYearGroup[year]}
                                widthAvailable={widthAvailable}
                                showRotationTooltip={this.props.showRotationTooltip} />
                        }) :
                        <h3 className='no-history-label'>No Historical Data available</h3>}
                </div>}
                {/* Display month list chronological as a reference map */}
                <MonthLayer width={widthAvailable} />
                {/* Display the current schedule */}
                <ScheduleBlock
                    academicYear={currentAcademicYear}
                    isEPAperBlockVisible={isEPAperBlockVisible}
                    residentData={recordsGroupedByAcademicYear[currentAcademicYear]}
                    scheduleList={currentSchedule}
                    widthAvailable={widthAvailable}
                    showRotationTooltip={this.props.showRotationTooltip} />
                {/* code chunk to show rotation tooltip*/}
                {isRotationTooltipVisible && <RotationTooltip {...rotationTooltipData} />}
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        isRotationTooltipVisible: state.oracle.isRotationTooltipVisible,
        rotationTooltipData: state.oracle.rotationTooltipData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showRotationTooltip: bindActionCreators(showRotationTooltip, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RotatioSchedule);
