import * as d3 from 'd3';
import _ from 'lodash';
import moment from 'moment';

export default function(allRecords = [], programList) {

    // now group the records by the program name
    let recordsGroupedByProgram = _.groupBy(allRecords, (d) => d.program);

    // temporarily remove UG from program list
    let filteredProgramList = _.filter(programList, (d) => d.value != 'UNDERGRADUATE');

    // convert the grouped records into list such that every group has 
    // a program name and then a list of the all required parameters
    return _.map(filteredProgramList, (programEntry) => {

        const program = programEntry.value,
            programName = programEntry.label,
            records = recordsGroupedByProgram[program] || [];

        // for some calculations we can ignore the expired records as for them the metrics dont
        // exist so we filter them out from the list
        const nonExpiredRecords = records.filter(dd => !dd.isExpired);

        // group records by rating
        const ratingGroup = _.groupBy(nonExpiredRecords, (d) => d.rating);

        return {
            programName,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            epa_count: records.length,
            expired_count: records.length - nonExpiredRecords.length,
            monthlyCount: _.groupBy(nonExpiredRecords, (d) => moment(d.observation_date, 'YYYY-MM-DD').month()),
            expired_epa_percentage: records.length == 0 ? 0 : Math.round(records.filter(dd => dd.isExpired).length / records.length * 100),
            entrustment_score: Math.round((_.meanBy(nonExpiredRecords, (dd) => +dd.rating || 0) || 0) * 100) / 100,
            words_per_comment: Math.round(_.meanBy(nonExpiredRecords, (dd) => dd.feedback.split(" ").length) || 0)
        }
    }).sort((a, b) => a.epa_count - b.epa_count);
}