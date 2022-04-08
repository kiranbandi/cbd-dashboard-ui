import _ from 'lodash';
import moment from 'moment';

export default function (allRecords = [], academicYear, trainingPhase = 'A') {

    // remove records that dont have a rotation or a phase tag as  they might be erroneous
    // as also consider only records that lie in that given academic year
    let recordsInYear = _.filter(allRecords, (d) => d.Academic_Year == academicYear.value),
        // then consider only records that were attained by residents in that phase
        recordsInYearAndPhase = trainingPhase == 'A' ? recordsInYear : _.filter(recordsInYear, (d) => d.phaseTag == trainingPhase);

    // for some calculations we can ignore the expired records as for them the metrics dont
    // exist so we filter them out from the list
    // group records by rating and only consider the non expired ones as expired records have no rating
    // Also for rating group since we map the data to a 5 point scale
    // we only consider forms with a scale of size 5 and are Supervisor Forms
    let validScaleRecords = _.filter(recordsInYearAndPhase, (d) => ((d.Type == "Supervisor Form") && (d.scale.length >= 5)));
    let ratingGroup = _.groupBy(validScaleRecords, (d) => d.Rating),
        //get residents with available data
        residentsWithData = _.groupBy(recordsInYearAndPhase, (d) => d.username),
        resident_count = Object.keys(residentsWithData).length,
        completed_records = _.filter(recordsInYearAndPhase, d => d.progress == 'complete'),
        expired_records = _.filter(recordsInYearAndPhase, d => d.isExpired),
        epa_count = completed_records.length,
        expired_count = expired_records.length;

    // create a month count so we can identify the months in which epas
    // are not being filled out 
    let month_count = {};
    _.map(completed_records, (d) => {
        let monthKey = moment(d.Date, 'YYYY-MM-DD').format('MMM');
        if (month_count.hasOwnProperty(monthKey)) { month_count[monthKey] += 1 } else { month_count[monthKey] = 1 }
    });

    // Also return a list of unique schedule groups in the data if available
    let scheduleGroups = _.keys(_.groupBy(completed_records, (d) => d.scheduleTag)).sort();

    return {
        'recordsInYearAndPhase': completed_records,
        scheduleGroups,
        'summaryData': {
            resident_count,
            epa_count,
            expired_count,
            month_count,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            expired_epa_percentage: epa_count == 0 ? 0 : Math.round((expired_count / epa_count) * 100),
            entrustment_score: Math.round((_.meanBy(_.filter(validScaleRecords, d => d.progress == 'complete'), (dd) => +dd.Rating || 0) || 0) * 100) / 100,
            words_per_comment: Math.round(_.meanBy(completed_records, (dd) => dd.Feedback.split(" ").length) || 0)
        }
    }

}