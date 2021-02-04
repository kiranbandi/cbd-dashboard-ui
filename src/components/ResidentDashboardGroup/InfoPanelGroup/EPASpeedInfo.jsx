import React from 'react';
import moment from 'moment';
import { MicroStatCard, StatCard } from '../../';
import WeeklyEPAChart from './WeeklyEPAChart';

export default (props) => {

    const { residentData, smallScreen, residentFilter, width,
        residentInfo = {}, expiredResidentData = [] } = props,
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
    let totalEPAs = residentDataList.length,
        averageEPAsPerWeek = Math.round((totalEPAs / weeksPassed) * 100) / 100,
        totalExpiredEPAs = expiredResidentData.length,
        expiryRate = Math.round((totalExpiredEPAs / (totalEPAs + totalExpiredEPAs)) * 100);


    if (isNaN(expiryRate)) {
        expiryRate = 0;
    }

    let recordsInPeriod, recordsInPeriodCount, recordsExpiredInPeriod,
        weeksInPeriod, averageEPAsPerWeekInPeriod, expiryRateInPeriod;
    // if there is a date range
    if (!residentFilter.isAllData) {
        recordsInPeriod = _.filter(residentDataList, (d) => d.mark);
        recordsExpiredInPeriod = _.filter(expiredResidentData, (d) => {
            return moment(d.Date, 'YYYY-MM-DD').isBetween(moment(residentFilter.startDate, 'MM/DD/YYYY'), moment(residentFilter.endDate, 'MM/DD/YYYY'), 'days', '[]')
        }).length;

        recordsInPeriodCount = recordsInPeriod.length;

        weeksInPeriod = (moment(residentFilter.endDate, 'MM/DD/YYYY').diff(moment(residentFilter.startDate, 'MM/DD/YYYY'), "weeks"));
        averageEPAsPerWeekInPeriod = weeksInPeriod != 0 ? Math.round((recordsInPeriodCount / weeksInPeriod) * 100) / 100 : 0;

        expiryRateInPeriod = Math.round((recordsExpiredInPeriod / (recordsInPeriodCount + recordsExpiredInPeriod)) * 100);

        if (isNaN(expiryRateInPeriod)) {
            expiryRateInPeriod = 0;
        }

    }

    // One mobile screens we use hide the weekly chart and show regular statcards
    const CardComponent = smallScreen ? StatCard : MicroStatCard;

    return (
        <div className='epaSpeedBox'>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> ACQUISITION METRICS </h4>
            </div>
            <div className='card-wrapper'>
                {residentFilter.isAllData ?
                    <div className='row text-center m-t'>
                        <CardComponent title='EPAs observed per week' type='success' metric={averageEPAsPerWeek} />
                        <CardComponent title='Total EPAs Observed' type='primary' metric={totalEPAs} />
                        <CardComponent title='Achievement Rate' type='danger' metric={residentInfo.achievementRate + '%'} />
                    </div> :
                    <div className='row text-center'>
                        <CardComponent dual={true} title='EPAs observed per week' type='success' metric={averageEPAsPerWeek} secondMetric={averageEPAsPerWeekInPeriod} />
                        <CardComponent dual={true} title='Total EPAs Observed' type='primary' metric={totalEPAs} secondMetric={recordsInPeriodCount} />
                        <CardComponent dual={true} title='EPAs Expiry Rate' type='danger' metric={expiryRate + '%'} secondMetric={expiryRateInPeriod + '%'} />
                    </div>
                }
            </div>
            {!smallScreen &&
                < WeeklyEPAChart
                    // the three cards in EPASpeedInfo each take 160 pixels 
                    // so removing that and the extra margin
                    width={width - 575}
                    residentData={residentData}
                    residentInfo={residentInfo}
                    expiredResidentData={expiredResidentData}
                    residentFilter={residentFilter} />}

        </div>)

}


