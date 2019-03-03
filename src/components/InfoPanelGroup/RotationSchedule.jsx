import React from 'react';
import moment from 'moment';

export default (props) => {


    const dateBoxes = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
        //200px to offset the 30px margin on both sides and vertical scroll bar width
        widthAvailable = document.body.getBoundingClientRect().width - 200,
        widthForEachMonth = widthAvailable / 12,
        { scheduleMap, longitudinalScheduleMap } = props;

    // This will change once a year when systems are updated/upgraded :-D
    const currentSchedule = ["01-Jul-2018", "30-Jul-2018", "27-Aug-2018",
        "24-Sep-2018", "22-Oct-2018", "19-Nov-2018",
        "17-Dec-2018", "14-Jan-2019", "11-Feb-2019",
        "11-Mar-2019", "08-Apr-2019", "06-May-2019",
        "03-Jun-2019", "27-Jun-2019"],
        startDate = moment("01-07-2018", "DD-MM-YYYY");

    return (
        <div className='schedule-box text-center hidden-xs'>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> ROTATION SCHEDULE </h4>
            </div>
            <div style={{ width: widthAvailable }} className='custom-gannt-style-chart'>
                {dateBoxes.map((year, index) => {
                    return <span style={{ width: widthForEachMonth }} key={index} className='yearBox'>{year}</span>
                })}
                {currentSchedule.map((current, index) => {
                    // skip the last record
                    if (index < currentSchedule.length - 1) {
                        const currentDate = moment(current, "DD-MMM-YYYY"),
                            endingDate = moment(currentSchedule[index + 1], "DD-MMM-YYYY"),
                            distanceFromStart = currentDate.diff(startDate, "days"),
                            distanceInBetween = endingDate.diff(currentDate, "days"),
                            widthFromleft = (widthForEachMonth * distanceFromStart) / 30,
                            internalWidth = (widthForEachMonth * distanceInBetween) / 30;
                        return <span className='chart-line' key={"index-" + index} style={{ left: widthFromleft, width: internalWidth }}>{scheduleMap[index]}</span>
                    }
                    return;

                })}
            </div>
            {!!longitudinalScheduleMap && _.map(longitudinalScheduleMap, (longEntry, longIndex) => {
                return <span className='chart-line-long' key={"index-" + longIndex} style={{ width: widthAvailable }}>{longEntry}</span>
            })}
        </div>)

}


