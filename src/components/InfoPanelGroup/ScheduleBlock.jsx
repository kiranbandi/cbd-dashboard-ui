import React, { Component } from 'react';
import moment from 'moment';

export default class ScheduleBlock extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        const { scheduleDateList = [], scheduleRotationList = [],
            LongSchedule, widthAvailable, yearId,
            isHistorical = false, isEPAperBlockVisible = false, residentData, academicYear } = this.props;

        // create an empty count map
        let epaPerBlockList = _.times(scheduleDateList.length, () => 0);
        // if EPAs per block are needed , filter the records first then slot them into block
        if (isEPAperBlockVisible) {
            // Filter out records which fall in a given academic year 
            const recordsInAcademicYear = _.filter(_.flatMap(residentData), (d) => matchAcademicYear(d.Date, academicYear));
            // slot the records so they fall into respective periods
            _.map(recordsInAcademicYear, (record) => {
                let iterator = 0, slotted = false, recordStamp = moment(record.Date, 'YYYY-MM-DD');
                while (!slotted && (iterator < scheduleDateList.length - 1)) {
                    if (recordStamp.isBetween(moment(scheduleDateList[iterator], 'DD/MMM/YYYY'), moment(scheduleDateList[iterator + 1], 'DD/MMM/YYYY'), 'days', '[)')) {
                        epaPerBlockList[iterator] += 1;
                        slotted = true;
                    }
                    iterator += 1;
                }
            })
        }

        let scheduleChart = [], longScheduleChart = [], perBlockCountChart = [], widthForEachMonth = widthAvailable / 12;
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

                // if we also need to show the corresponding count per block 
                if (isEPAperBlockVisible) {
                    perBlockCountChart.push(<span
                        className={'chart-count'}
                        key={"count-" + index}
                        style={{ left: widthFromleft, width: internalWidth }}>
                        {epaPerBlockList[index] || 'N/A'}
                    </span>)
                }
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

            <div className={'schedule-box-rotation ' + (isHistorical ? 'historical ' : '') + (isEPAperBlockVisible ? 'dual-block' : '')}  >
                {perBlockCountChart}
                {scheduleChart}
            </div>
            <div className='schedule-box-long'>
                {longScheduleChart}
            </div>
        </div>
        )

    }
}


function matchAcademicYear(recordDate, academicYear) {
    var timeObj = moment(recordDate, 'YYYY-MM-DD');
    return (timeObj.isBetween(moment('07/01/' + Number(academicYear), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]'))
}