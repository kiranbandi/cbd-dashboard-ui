import _ from 'lodash';
import moment from 'moment';

export default function(allRecords = [], academicYear, trainingPhase = 'all') {

    // remove records that dont have a rotation or a phase tag as  they might be erroneous
    // as also consider only records that lie in that given academic year
    let recordsInYear = _.filter(allRecords, (d) => (!!d.rotationTag && !!d.phaseTag && matchAcademicYear(d.observation_date, academicYear.value))),
        // then consider only records that were attained by residents in that phase
        recordsInYearAndPhase = trainingPhase == 'all' ? recordsInYear : _.filter(recordsInYear, (d) => d.phaseTag == trainingPhase);

    // for some calculations we can ignore the expired records as for them the metrics dont
    // exist so we filter them out from the list
    let nonExpiredRecords = recordsInYearAndPhase.filter(dd => !dd.isExpired),
        // group records by rating and only consider the non expired ones as expired records have no rating
        ratingGroup = _.groupBy(nonExpiredRecords, (d) => d.rating),
        //get residents with available data
        residentsWithData = _.groupBy(recordsInYearAndPhase, (d) => d.username),
        resident_count = Object.keys(residentsWithData).length,
        epa_count = recordsInYearAndPhase.length,
        expired_count = epa_count - nonExpiredRecords.length;

    return {
        recordsInYearAndPhase,
        'summaryData': {
            resident_count,
            epa_count,
            expired_count,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            expired_epa_percentage: epa_count == 0 ? 0 : Math.round((expired_count / epa_count) * 100),
            entrustment_score: Math.round((_.meanBy(nonExpiredRecords, (dd) => +dd.rating || 0) || 0) * 100) / 100,
            words_per_comment: Math.round(_.meanBy(nonExpiredRecords, (dd) => dd.feedback.split(" ").length) || 0)
        }
    }

}

function matchAcademicYear(recordDate, academicYear) {
    var timeObj = moment(recordDate, 'YYYY-MM-DD');
    return (timeObj.isBetween(moment('07/01/' + Number(academicYear), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]'))
}