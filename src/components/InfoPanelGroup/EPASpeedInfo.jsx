import React from 'react';
import moment from 'moment';
import StatCard from './StatCard';

export default (props) => {

    const { residentData, residentInfo } = props,
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
        totalEPAsAchieved = highPerformanceEPAList.length,
        averageEPAsPerWeek = Math.round((totalEPAs / weeksPassed) * 100) / 100,
        averageEPAsSince3Months = Math.round((recordsSinceLast3Months / (moment().diff(dateSinceMeasure, "weeks"))) * 100) / 100;


    return (
        <div className='epaSpeedBox'>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> EPA ACQUISITION METRICS </h4>
            </div>

            <div className='row'>
                <StatCard title='EPAs observed per week' type='info' metric={averageEPAsPerWeek} />
                <StatCard title='EPAs per week (last 3 months)' type='success' metric={averageEPAsSince3Months} />
                <StatCard title='Total EPAs Observed' type='primary' metric={totalEPAs} />
                <StatCard title='Total EPAs Achieved' type='danger' metric={totalEPAsAchieved} />
            </div>
        </div>)

}


