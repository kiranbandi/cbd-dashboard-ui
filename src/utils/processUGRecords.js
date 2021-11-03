import _ from 'lodash';
import moment from 'moment';

export default function (allRecords = []) {

    // The UG data is a mix of paper and one45 records
    // so if the date format can be 8 or 10 digits example YY-MM-DD or YYYY-MM-DD
    let processedRecords = _.map(allRecords, (d) => ({
        'epa': d.epa,
        'name': capitalizeStr(d.resident_name),
        'nsid': d.username,
        'observer_name': d.observer_name,
        'date': d.observation_date.length == 8 ? moment(d.observation_date, 'YY-MM-DD').format('YYYY-MM-DD') : d.observation_date,
        'rating': d.rating,
        'rotation': d.rotationTag,
        'feedback': d.feedback,
        'patient_type': d.situation_context,
        'admission_type': d.professionalism_safety
    }));
    return _.map(processedRecords, (d) => ({ ...d, 'academicYear': getAcademicYear(d.date) }));

}


function getAcademicYear(recordDate) {
    var academicYear = +moment(recordDate).format('YYYY');
    // If a value is before July 15th it goes in the previous academic year
    if (moment(recordDate, 'YYYY-MM-DD').isSameOrBefore(moment('07/15/' + academicYear, 'MM/DD/YYYY')))
        return academicYear - 1;
    else
        return academicYear;
}

const capitalizeStr = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());