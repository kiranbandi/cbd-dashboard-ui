import _ from 'lodash';
import moment from 'moment';

export default function (allRecords = [], academicYear) {

    const recordsInYear = _.filter(allRecords, d => d.Academic_Year == academicYear.value);
    // group records by completion status 
    const assessmentGroup = _.groupBy(recordsInYear, d => d.progress),
        programRecords = assessmentGroup['complete'] || [],
        expiredRecords = _.filter(assessmentGroup['inprogress'], d => d.isExpired);

    // for some calculations we can ignore the expired records as for them the metrics dont
    // exist so we filter them out from the list
    // group records by rating and only consider the non expired ones as expired records have no rating

    // Also for rating group since we map the data to a 5 point scale
    // we only consider forms with a scale of size 5 and are Supervisor Forms
    let validScaleRecords = _.filter(programRecords, (d) => ((d.Type == "Supervisor Form") && (d.scale.length >= 5)));
    let ratingGroup = _.groupBy(validScaleRecords, (d) => d.Rating),
        //get residents with available data
        residentsWithData = _.groupBy(programRecords, (d) => d.username),
        resident_count = Object.keys(residentsWithData).length,
        epa_count = programRecords.length,
        expired_count = expiredRecords.length;

    // create a month count so we can identify the months in which epas
    // are not being filled out 
    let month_count = {};
    _.map(programRecords, (d) => {
        let monthKey = moment(d.Date, 'YYYY-MM-DD').format('MMM');
        if (month_count.hasOwnProperty(monthKey)) { month_count[monthKey] += 1 } else { month_count[monthKey] = 1 }
    });

    // create a month count so we can identify the months in which epas
    // are not being filled out 
    let expired_month_count = {};
    _.map(expiredRecords, (d) => {
        let monthKey = moment(d.Date, 'YYYY-MM-DD').format('MMM');
        if (expired_month_count.hasOwnProperty(monthKey)) { expired_month_count[monthKey] += 1 } else { expired_month_count[monthKey] = 1 }
    });

    return {
        programRecords,
        'summaryData': {
            resident_count,
            epa_count,
            expired_count,
            month_count,
            expired_month_count,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            expired_epa_percentage: epa_count == 0 ? 0 : Math.round((expired_count / epa_count) * 100),
            entrustment_score: Math.round((_.meanBy(validScaleRecords, (dd) => +dd.Rating || 0) || 0) * 100) / 100,
            words_per_comment: Math.round(_.meanBy(programRecords, (dd) => dd.Feedback.split(" ").length) || 0)
        }
    }

}