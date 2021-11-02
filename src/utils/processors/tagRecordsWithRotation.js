import _ from 'lodash';
import moment from 'moment';


export default function (rotationSchedules, allRecords) {

    _.map(rotationSchedules, (schedule, username) => {
        let processedSchedule = processRotationSchedule(schedule);
        rotationSchedules[username] = _.groupBy(processedSchedule, (d) => d.Academic_Year);
    });

    return _.map(allRecords, (record) => {

        let allUserSchedules = rotationSchedules[record.username] || {},
            userScheduleInYear = allUserSchedules[record.Academic_Year] || [],
            recordDate = moment(record.Date, 'YYYY-MM-DD');

        let matchedRotation = _.find(userScheduleInYear, (d) => recordDate.isBetween(d.start_date, d.end_date, 'days', '[]'));

        let rotationTag = matchedRotation ? matchedRotation.schedule_group : 'No schedule';

        return { ...record, rotationTag };

    });
}



function processRotationSchedule(rotationList) {
    return rotationList.map((r, rotationID) => ({
        ...r,
        'start_date': moment(r.start_date, 'YYYY-MM-DD'),
        'end_date': moment(r.end_date, 'YYYY-MM-DD'),
        'Academic_Year': getAcademicYear(r.start_date),
        'unique_id': 'rotation-' + rotationID
    }));
}


function getAcademicYear(startDate) {
    const dateObject = moment(startDate, 'YYYY-MM-DD'), year = dateObject.year();
    // The academic year is always the year number when the academic calendar starts
    // so to get the academic year, we first get the year entry of the datapoint
    // then if the datapoint is after July 1st then the academic year is that year number
    // if not then the academic year is the previous year number.
    if (dateObject.isSameOrAfter(moment('07/01/' + (+year), 'MM/DD/YYYY'))) {
        return year;
    }
    return year - 1;
}