import React, { Component } from 'react';
import moment from 'moment';
import rotationScheduleMap from '../../utils/rotationScheduleMap';
import ScheduleBlock from './ScheduleBlock';


export default class InfoPanel extends Component {

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


        const dateBoxes = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
            //200px to offset the 30px margin on both sides and vertical scroll bar width
            widthAvailable = document.body.getBoundingClientRect().width - 200,
            widthForEachMonth = widthAvailable / 12,
            { residentInfo, residentData } = this.props,
            { isHistoryVisible, isEPAperBlockVisible } = this.state,
            { rotationSchedule = {}, longitudinalSchedule = {}, programStartDate } = residentInfo;

        // if the current month is before july then pick the last year  
        const currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year();
        const currentScheduleDates = rotationScheduleMap[currentAcademicYear];
        const currentSchedule = rotationSchedule[currentAcademicYear];
        const currentLongSchedule = longitudinalSchedule[currentAcademicYear];

        let historicalYears = _.filter(_.keys(rotationSchedule), (year) => {
            // if the resident started before july of a year say 2017 then we add the schedule of the year 
            // before too if not we just get that year alone 
            return year != currentAcademicYear && year >= (moment(programStartDate).year() - (moment(programStartDate).month() <= 5 ? 1 : 0))
        });
        // if there are more than 5 historical years then cut it to the recent 5
        if (historicalYears.length > 5) {
            historicalYears = historicalYears.slice(historicalYears.length - 5);
        }


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
                    {_.map(historicalYears, (year) => {
                        return <ScheduleBlock
                            key={'yearblock-' + year}
                            residentData={residentData}
                            isEPAperBlockVisible={isEPAperBlockVisible}
                            academicYear={year}
                            scheduleDateList={rotationScheduleMap[year]}
                            scheduleRotationList={rotationSchedule[year]}
                            LongSchedule={''}
                            widthAvailable={widthAvailable}
                            isHistorical={true} />
                    })}
                </div>}
                <div style={{ width: widthAvailable }} className='custom-gannt-style-chart'>
                    {dateBoxes.map((year, index) => {
                        return <span style={{ width: widthForEachMonth }} key={index} className='yearBox'>{year}</span>
                    })}
                </div>
                <ScheduleBlock
                    isEPAperBlockVisible={isEPAperBlockVisible}
                    residentData={residentData}
                    academicYear={currentAcademicYear}
                    scheduleDateList={currentScheduleDates}
                    scheduleRotationList={currentSchedule}
                    LongSchedule={currentLongSchedule}
                    widthAvailable={widthAvailable} />
            </div>
        )
    }
}


