import React from 'react';
import moment from 'moment';
import { StatCard } from '../../';

export default (props) => {

    const { residentData, residentFilter, residentInfo = {}, expiredResidentData = [] } = props,
        residentDataList = _.flatMap(residentData);

    let startDate = moment("01-07-2018", "DD-MM-YYYY");

    // All records we have are from 1st July 2018 , so if someone has 
    //  a valid program start date and this date is after the July 2018 then we use it
    // if not we assume he was from a batch earlier.
    if (residentInfo.programStartDate && moment(residentInfo.programStartDate).isAfter(startDate)) {
        startDate = moment(residentInfo.programStartDate);
    }

    // Get the number of weeks that have passed since the start of the program
    const weeksPassed = (moment().diff(startDate, "weeks"));

    // Get the required Metrics 
    const totalEPAs = residentDataList.length,
        averageEPAsPerWeek = Math.round((totalEPAs / weeksPassed) * 100) / 100,
        totalExpiredEPAs = expiredResidentData.length,
        expiryRate = Math.round((totalExpiredEPAs / (totalEPAs + totalExpiredEPAs)) * 100);

    let recordsInPeriod, recordsInPeriodCount, recordsExpiredInPeriod,
        weeksInPeriod, averageEPAsPerWeekInPeriod;
    // if there is a date range
    if (!residentFilter.isAllData) {
        recordsInPeriod = _.filter(residentDataList, (d) => d.mark);
        recordsExpiredInPeriod = _.filter(expiredResidentData, (d) => {
            return moment(d.Date, 'YYYY-MM-DD').isAfter(moment(residentFilter.startDate, 'MM/DD/YYYY')) && moment(d.Date, 'YYYY-MM-DD').isBefore(moment(residentFilter.endDate, 'MM/DD/YYYY'));
        }).length;

        recordsInPeriodCount = recordsInPeriod.length;

        weeksInPeriod = (moment(residentFilter.endDate, 'MM/DD/YYYY').diff(moment(residentFilter.startDate, 'MM/DD/YYYY'), "weeks"));
        averageEPAsPerWeekInPeriod = weeksInPeriod != 0 ? Math.round((recordsInPeriodCount / weeksInPeriod) * 100) / 100 : 0;
    }

    return (
        <div className='epaSpeedBox'>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> EPA ACQUISITION METRICS </h4>
            </div>
            {residentFilter.isAllData ?
                <div className='row text-center'>
                    <StatCard title='EPAs observed per week' type='success' metric={averageEPAsPerWeek} />
                    <StatCard title='Total EPAs Observed' type='primary' metric={totalEPAs} />
                    <StatCard title='EPA Expiry Rate' type='danger' metric={expiryRate + '%'} />
                </div> :
                <div className='row text-center'>
                    <StatCard dual={true} title='EPAs observed per week' type='success' metric={averageEPAsPerWeek} secondMetric={averageEPAsPerWeekInPeriod} />
                    <StatCard dual={true} title='Total EPAs Observed' type='primary' metric={totalEPAs} secondMetric={recordsInPeriodCount} />
                    <StatCard dual={true} title='Total EPAs Expired' type='danger' metric={totalExpiredEPAs} secondMetric={recordsExpiredInPeriod} />
                </div>
            }

        </div>)

}


