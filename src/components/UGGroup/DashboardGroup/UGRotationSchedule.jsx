import React, { Component } from 'react';
import moment from 'moment';
import ScheduleBlock from './UGScheduleBlock';
import { UG_ROTATION_MAP } from '../../../utils/programInfo';

export default class RotatioSchedule extends Component {

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

        const dateBoxes = ["AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
            //200px to offset the 30px margin on both sides and vertical scroll bar width
            { residentInfo, width, residentData,
                rotationRequired, studentRecords } = this.props,
            widthAvailable = width - 60,
            widthForEachMonth = widthAvailable / 12,
            { isHistoryVisible, isEPAperBlockVisible } = this.state,
            { rotationSchedule = {}, programStartDate } = residentInfo;

        // if the current month is before july then pick the last year  
        const currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year(),
            currentScheduleDates = UG_ROTATION_MAP[currentAcademicYear],
            currentSchedule = rotationSchedule[currentAcademicYear];

        let historicalYears = _.filter(_.keys(rotationSchedule), (year) => {
            // if the resident started before july of a year say 2017 then we add the schedule of the year 
            // before too if not we just get that year alone 
            return year < currentAcademicYear && year >= (moment(programStartDate).year() - (moment(programStartDate).month() <= 5 ? 1 : 0))
        });


        return (
            <div className='schedule-box text-center hidden-xs'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content"> ROTATION SCHEDULE </h4>
                </div>
                <button onClick={this.showHistorySchedule} className={'view-back-button btn btn-primary-outline' + (isHistoryVisible ? ' selected' : '')}>
                    <span className="icon icon-clock"></span>
                    <span>View History</span>
                </button>
                <button onClick={this.showEPAsPerBlock} className={'view-back-button per-block-button btn btn-primary-outline' + (isEPAperBlockVisible ? ' selected' : '')}>
                    <span className="icon icon-book"></span>
                    <span>View EPAs/Block</span>
                </button>

                {isHistoryVisible && <div className='all-historical-schedule'>
                    {historicalYears.length > 0 ?
                        _.map(historicalYears, (year) => {
                            return <ScheduleBlock
                                key={'yearblock-' + year}
                                studentRecords={studentRecords}
                                isEPAperBlockVisible={isEPAperBlockVisible}
                                rotationRequired={rotationRequired}
                                academicYear={year}
                                scheduleDateList={UG_ROTATION_MAP[year]}
                                scheduleRotationList={rotationSchedule[year]}
                                LongSchedule={''}
                                widthAvailable={widthAvailable}
                                isHistorical={true} />
                        }) :
                        <h3 className='no-history-label'>No Historical Data available</h3>}
                </div>}
                <div style={{ width: widthAvailable }} className='custom-gannt-style-chart'>
                    {dateBoxes.map((year, index) => {
                        return <span style={{ width: widthForEachMonth }} key={index} className='yearBox'>{year}</span>
                    })}
                </div>
                <ScheduleBlock
                    isEPAperBlockVisible={isEPAperBlockVisible}
                    studentRecords={studentRecords}
                    rotationRequired={rotationRequired}
                    academicYear={currentAcademicYear}
                    scheduleDateList={currentScheduleDates}
                    scheduleRotationList={currentSchedule}
                    LongSchedule={''}
                    widthAvailable={widthAvailable} />
            </div>
        )
    }
}



