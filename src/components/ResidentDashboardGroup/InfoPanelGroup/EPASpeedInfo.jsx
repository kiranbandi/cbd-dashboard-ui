import React from 'react';
import { MicroStatCard, StatCard } from '../../';
import WeeklyEPAChart from './WeeklyEPAChart';

export default (props) => {

    const { residentData, smallScreen, residentFilter, width,
        residentInfo = {} } = props,
        residentDataList = _.flatMap(residentData);

    // Get the required Metrics 
    let totalEPAs = residentDataList.length,
        { achievementRate = 0, totalProgress = 0 } = residentInfo,
        recordsInPeriod, recordsInPeriodCount;
    // if there is a date range
    if (!residentFilter.isAllData) {
        recordsInPeriod = _.filter(residentDataList, (d) => d.mark);
        recordsInPeriodCount = recordsInPeriod.length;
    }

    // One mobile screens we hide the weekly chart and show regular statcards
    const CardComponent = smallScreen ? StatCard : MicroStatCard;

    return (
        <div className='epaSpeedBox'>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> ACQUISITION METRICS </h4>
            </div>
            <div className='card-wrapper'>
                {residentFilter.isAllData ?
                    <div className='row text-center m-t'>
                        <CardComponent title='Total EPAs Observed' type='primary' metric={totalEPAs} />
                        <CardComponent title='Progress Rate' type='success' metric={totalProgress + '%'} />
                        <CardComponent title='Achievement Rate' type='danger' metric={achievementRate + '%'} />
                    </div> :
                    <div className='row text-center'>
                        <CardComponent dual={true} title='Total EPAs Observed' type='primary' metric={totalEPAs} secondMetric={recordsInPeriodCount} />
                        <CardComponent title='Progress Rate' type='success' metric={totalProgress + '%'} />
                        <CardComponent title='Achievement Rate' type='danger' metric={achievementRate + '%'} />
                    </div>}
            </div>
            {!smallScreen &&
                < WeeklyEPAChart
                    // the three cards in EPASpeedInfo each take 160 pixels 
                    // so removing that and the extra margin
                    width={width - 575}
                    residentData={residentData}
                    residentInfo={residentInfo}
                    residentFilter={residentFilter} />}
        </div>)

}


