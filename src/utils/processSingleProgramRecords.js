import _ from 'lodash';
import moment from 'moment';

export default function(allRecords = []) {

    // temporarily remove UG records from list
    let records = _.filter(allRecords, (d) => d.program != 'UNDERGRADUATE'),
        // for some calculations we can ignore the expired records as for them the metrics dont
        // exist so we filter them out from the list
        nonExpiredRecords = records.filter(dd => !dd.isExpired),
        // group records by rating
        ratingGroup = _.groupBy(nonExpiredRecords, (d) => d.rating),
        resident_count = Object.keys(_.groupBy(records, (d) => d.username)).length;

    return {
        resident_count,
        rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
        epa_count: records.length,
        expired_count: records.length - nonExpiredRecords.length,
        monthlyCount: _.groupBy(nonExpiredRecords, (d) => moment(d.observation_date, 'YYYY-MM-DD').month()),
        expired_epa_percentage: records.length == 0 ? 0 : Math.round(records.filter(dd => dd.isExpired).length / records.length * 100),
        entrustment_score: Math.round((_.meanBy(nonExpiredRecords, (dd) => +dd.rating || 0) || 0) * 100) / 100,
        words_per_comment: Math.round(_.meanBy(nonExpiredRecords, (dd) => dd.feedback.split(" ").length) || 0)
    }

}