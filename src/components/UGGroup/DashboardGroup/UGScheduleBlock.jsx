import React, { Component } from 'react';
import moment from 'moment';

export default class ScheduleBlock extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { scheduleDateList = [], scheduleRotationList = [],
            LongSchedule, widthAvailable, rotationRequired,
            isHistorical = false, isEPAperBlockVisible = false,
            studentRecords, academicYear } = this.props;

        // create an empty count map
        let epaPerBlockList = _.times(scheduleDateList.length, () => 0);
        // if EPAs per block are needed , filter the records first then slot them into block
        if (isEPAperBlockVisible) {
            // Filter out records which fall in a given academic year 
            const recordsInAcademicYear = _.filter(studentRecords, (d) => matchAcademicYear(d.date, academicYear));

            // slot the records so they fall into respective periods
            _.map(recordsInAcademicYear, (record) => {
                let iterator = 0, slotted = false, recordStamp = moment(record.date, 'YYYY-MM-DD');
                while (!slotted && (iterator < scheduleDateList.length - 1)) {
                    if (recordStamp.isBetween(moment(scheduleDateList[iterator], 'DD/MMM/YYYY'), moment(scheduleDateList[iterator + 1], 'DD/MMM/YYYY'), 'days', '[)')) {
                        epaPerBlockList[iterator] += 1;
                        slotted = true;
                    }
                    iterator += 1;
                }
            })
        }

        let scheduleChart = [], longScheduleChart = [],
            perBlockCountChart = [], widthForEachMonth = widthAvailable / 12,
            startDate = moment(scheduleDateList[0], "DD-MMM-YYYY");

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

                let rotationLabel = scheduleRotationList[index] || 'OTHER';

                // append the individual box to the list
                // temporarily anesthesia and EM are combined
                scheduleChart.push(<span
                    className={'chart-line ' + isTodayInPeriod}
                    key={"index-" + index}
                    id={index + "-" + rotationLabel}
                    style={{ left: widthFromleft, width: internalWidth }}>
                    {rotationLabel == 'Anesthesia' ? "EM/Anesthesia" : rotationLabel}
                </span>)

                let averageColorLabel = 'dark-green';

                let averageRotationPercentage = 0;
                if (epaPerBlockList[index] && rotationRequired[rotationLabel] != 0) {
                    averageRotationPercentage = (Number(epaPerBlockList[index]) || 0) / rotationRequired[rotationLabel];
                }

                if (averageRotationPercentage > 0 && averageRotationPercentage <= 0.25) {
                    averageColorLabel = 'dark-red';
                }
                else if (averageRotationPercentage > 0 && averageRotationPercentage <= 0.50) {
                    averageColorLabel = 'red';
                }
                else if (averageRotationPercentage > 0 && averageRotationPercentage <= 0.75) {
                    averageColorLabel = 'green';
                }

                if (isNaN(averageRotationPercentage)) {
                    averageRotationPercentage = '0';
                }

                // if we also need to show the corresponding count per block 
                if (isEPAperBlockVisible) {
                    perBlockCountChart.push(<span
                        className={'chart-count '}
                        key={"count-" + index}
                        style={{ left: widthFromleft, width: internalWidth }}>
                        <span className={'count-text' + ((averageRotationPercentage != 0) ? '' : ' use-entire-width')}>
                            {epaPerBlockList[index] || ' - '}
                        </span>
                        {(averageRotationPercentage != 0) &&
                            <span className={'count-chart ' + averageColorLabel}>
                                {Math.round(averageRotationPercentage * 100) + "%"}
                            </span>}
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


        return (<div style={{ width: widthAvailable, margin: '5px auto' }} key={academicYear}>
            <span className='yearname-label'>{academicYear}</span>
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