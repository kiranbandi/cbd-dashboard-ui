import React from 'react';
import moment from 'moment';
import rotationScheduleMap from '../../utils/rotationScheduleMap';

export default (props) => {

    const dateBoxes = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
        //200px to offset the 30px margin on both sides and vertical scroll bar width
        widthAvailable = document.body.getBoundingClientRect().width - 200,
        widthForEachMonth = widthAvailable / 12,
        { scheduleMap, longitudinalScheduleMap } = props;

    // if the current month is before july then pick the last year  
    const currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year();
    const currentScheduleDates = rotationScheduleMap[currentAcademicYear];
    const currentSchedule = scheduleMap[currentAcademicYear];
    const currentLongSchedule = longitudinalScheduleMap[currentAcademicYear];


    return (
        <div className='schedule-box text-center hidden-xs'>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> ROTATION SCHEDULE </h4>
            </div>
            <div style={{ width: widthAvailable }} className='custom-gannt-style-chart'>
                {dateBoxes.map((year, index) => {
                    return <span style={{ width: widthForEachMonth }} key={index} className='yearBox'>{year}</span>
                })}
            </div>
            {makeScheduleChart(currentScheduleDates, currentSchedule, currentLongSchedule, widthAvailable)}
        </div>
    )
}

function makeScheduleChart(scheduleDateList = [], scheduleRotationList = [], LongSchedule, widthAvailable) {

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


    return (<div style={{ width: widthAvailable, margin: '5px auto' }}>
        <div className='schedule-box-rotation'>
            {scheduleChart}
        </div>
        <div className='schedule-box-long'>
            {longScheduleChart}
        </div>
    </div>
    )

}


