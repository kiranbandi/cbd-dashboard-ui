import React from 'react';
import moment from 'moment';
import StatCard from './StatCard';

export default (props) => {

    const { residentData, residentInfo, residentFilter } = props,
        startDate = moment("01-07-2018", "DD-MM-YYYY"),
        residentDataList = _.flatMap(residentData),
        highPerformanceEPAList = residentDataList.filter((record) => (+record.Rating) >= 4);


    // Get the number of weeks that have passed since the start of the program
    const weeksPassed = (moment().diff(startDate, "weeks"));
    // Get the timestamp that is 3 months from the last uploaded date 
    const dateSinceMeasure = moment(residentInfo.uploadedData).subtract(3, 'month');
    //  Get the records that fall in that 3 month period
    let recordsSinceLast3Months = residentDataList.filter((record) => {
        return moment(record.Date, 'YYYY-MM-DD').isAfter(dateSinceMeasure);
    }).length;

    // Get the required Metrics 
    const totalEPAs = residentDataList.length,
        achievementRatio = totalEPAs!=0 ? Math.round(highPerformanceEPAList.length * 100 / totalEPAs) : 0,
        averageEPAsPerWeek = Math.round((totalEPAs / weeksPassed) * 100) / 100,
        averageEPAsSince3Months = Math.round((recordsSinceLast3Months / (moment().diff(dateSinceMeasure, "weeks"))) * 100) / 100;

    let recordsInPeriod, recordsAchievedInPeriod, recordsInPeriodCount,
        achievementRatioInPeriod, weeksInPeriod, averageEPAsPerWeekInPeriod;
    // if there is a date range
    if (!residentFilter.isAllData) {
        recordsInPeriod = _.filter(residentDataList, (d) => d.mark);
        recordsAchievedInPeriod = _.filter(recordsInPeriod, (d) => (+d.Rating) >= 4);
        recordsInPeriodCount = recordsInPeriod.length;
        achievementRatioInPeriod = recordsInPeriodCount != 0 ? Math.round(recordsAchievedInPeriod.length * 100 / recordsInPeriodCount) : 0;
        weeksInPeriod = (moment(residentFilter.endDate, 'MM/DD/YYYY').diff(moment(residentFilter.startDate, 'MM/DD/YYYY'), "weeks"));
        averageEPAsPerWeekInPeriod = weeksInPeriod != 0 ? Math.round((recordsInPeriodCount / weeksInPeriod) * 100) / 100 : 0;
    }

    return (
        <div className='epaSpeedBox'>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> EPA ACQUISITION METRICS </h4>
            </div>
            {residentFilter.isAllData ?
                <div className='row'>
                    <StatCard title='EPAs observed per week' type='info' metric={averageEPAsPerWeek} />
                    <StatCard title='EPAs observed per week (last 3 months)' type='success' metric={averageEPAsSince3Months} />
                    <StatCard title='Total EPAs Observed' type='primary' metric={totalEPAs} />
                    <StatCard title='EPA Achievement Ratio' type='danger' metric={achievementRatio + "%"} />
                </div> :
                <div className='row'>
                    <StatCard dual={true} title='EPAs observed per week' type='info' metric={averageEPAsPerWeek} secondMetric={averageEPAsPerWeekInPeriod} />
                    <StatCard dual={true} title='Total EPAs Observed' type='primary' metric={totalEPAs} secondMetric={recordsInPeriodCount} />
                    <StatCard dual={true} title='EPA Achievement Rate' type='danger' metric={achievementRatio + "%"} secondMetric={achievementRatioInPeriod + "%"} />
                    <StatCard dual={true} title='Timeline in weeks' type='success' metric={weeksPassed} secondMetric={weeksInPeriod} />

                </div>
            }

        </div>)

}


