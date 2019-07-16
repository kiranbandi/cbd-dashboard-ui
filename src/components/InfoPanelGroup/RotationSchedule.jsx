import React, { Component } from 'react';
import moment from 'moment';
import rotationScheduleMap from '../../utils/rotationScheduleMap';


export default class InfoPanel extends Component {

    constructor(props) {
        super(props);
        this.showHistorySchedule = this.showHistorySchedule.bind(this);

        this.state = {
            isHistoryVisible: false
        };
    }

    showHistorySchedule() {
        this.setState({ isHistoryVisible: !this.state.isHistoryVisible });
    }

    render() {


        const dateBoxes = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
            //200px to offset the 30px margin on both sides and vertical scroll bar width
            widthAvailable = document.body.getBoundingClientRect().width - 200,
            widthForEachMonth = widthAvailable / 12,
            { residentInfo } = this.props,
            { isHistoryVisible } = this.state,
            { rotationSchedule = {}, longitudinalSchedule = {}, programStartDate } = residentInfo;

        // if the current month is before july then pick the last year  
        const currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year();
        const currentScheduleDates = rotationScheduleMap[currentAcademicYear];
        const currentSchedule = rotationSchedule[currentAcademicYear];
        const currentLongSchedule = longitudinalSchedule[currentAcademicYear];

        const historicalYears = _.filter(_.keys(rotationSchedule), (year) => {
            // if the resident started before july of a year say 2017 then we add the schedule of the year 
            // before too if not we just get that year alone 
            return year != currentAcademicYear && year >= (moment(programStartDate).year() - (moment(programStartDate).month() <= 5 ? 1 : 0))
        });

        return (
            <div className='schedule-box text-center hidden-xs'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content"> ROTATION SCHEDULE </h4>
                </div>
                <button onClick={this.showHistorySchedule} className='view-history-button btn btn-primary-outline'>
                    <span className="icon icon-clock"></span>
                    <span>View History</span>
                </button>

                {isHistoryVisible && <div className='all-historical-schedule'>
                    {_.map(historicalYears, (year) => {
                        return makeScheduleChart(rotationScheduleMap[year], rotationSchedule[year], '', widthAvailable, year, true);
                    })}
                </div>}
                <div style={{ width: widthAvailable }} className='custom-gannt-style-chart'>
                    {dateBoxes.map((year, index) => {
                        return <span style={{ width: widthForEachMonth }} key={index} className='yearBox'>{year}</span>
                    })}
                </div>
                {makeScheduleChart(currentScheduleDates, currentSchedule, currentLongSchedule, widthAvailable, currentAcademicYear)}

            </div>
        )


    }
}


function makeScheduleChart(scheduleDateList = [], scheduleRotationList = [], LongSchedule, widthAvailable, yearId, isHistorical = false) {

    let scheduleChart = [], longScheduleChart = [], widthForEachMonth = widthAvailable / 12;

    const startDate = moment(scheduleDateList[0], "DD-MMM-YYYY");

    // Add regular rotation schedules
    scheduleDateList.map((periodStart, index) => {
        // skip the last record
        if (index < scheduleDateList.length - 1) {
            let periodStartDate = moment(periodStart, "DD-MMM-YYYY"),
                endingDate = moment(scheduleDateList[index + 1], "DD-MMM-YYYY"),
                distanceFromStart = periodStartDate.diff(startDate, "days"),
                distanceInBetween = endingDate.diff(periodStartDate, "days"),
                widthFromleft = (widthForEachMonth * distanceFromStart) / 30,
                internalWidth = (widthForEachMonth * distanceInBetween) / 30,
                isTodayInPeriod = moment().isBetween(periodStartDate, endingDate, 'days', '(]') ? 'between-lot' : '';

            // when the last element overshoots cut it back to the max available
            if (widthAvailable < (internalWidth + widthFromleft)) {
                internalWidth = widthAvailable - widthFromleft;
            }
            // append the individual box to the list
            scheduleChart.push(<span
                className={'chart-line ' + isTodayInPeriod}
                key={"index-" + index}
                style={{ left: widthFromleft, width: internalWidth }}>
                {scheduleRotationList[index] || 'EM'}
            </span>)
        }
    })
    // Add longitudinal schedules if any
    if (!!LongSchedule) {
        const LongScheduleList = LongSchedule.split(',');
        _.map(LongScheduleList, (longEntry, longIndex) => {
            longScheduleChart.push(<span className='chart-line-long'
                key={"index-long-" + longIndex}
                style={{ width: widthAvailable }}>
                {longEntry}</span>)
        })
    }

    return (<div style={{ width: widthAvailable, margin: '5px auto' }} key={yearId}>
        <div className={'schedule-box-rotation ' + (isHistorical ? 'historical' : '')}  >
            {scheduleChart}
        </div>
        <div className='schedule-box-long'>
            {longScheduleChart}
        </div>
    </div>
    )
}


