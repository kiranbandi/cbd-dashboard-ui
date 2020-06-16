import _ from 'lodash';
import moment from 'moment';
import { PHASES_LIST } from './programInfo';

export default function(allRecords = [], residentList = [], programList) {

    // now group the records by the program name
    let recordsGroupedByProgram = _.groupBy(allRecords, (d) => d.program);

    // temporarily remove UG from program list
    let filteredProgramList = _.filter(programList, (d) => d.value != 'UNDERGRADUATE');

    // add an 'All' program to the grouped list and recordsgroup collection
    filteredProgramList.push({ value: "all", label: "All Programs" });
    recordsGroupedByProgram['all'] = _.clone(allRecords);

    // convert the grouped records into list such that every group has 
    // a program name and then a list of the all required parameters
    return _.map(filteredProgramList, (programEntry) => {

        const program = programEntry.value,
            programName = programEntry.label,
            records = recordsGroupedByProgram[program] || [],
            // for some calculations we can ignore the expired records as for them the metrics dont
            // exist so we filter them out from the list
            nonExpiredRecords = records.filter(dd => !dd.isExpired),
            expiredRecords = records.filter(dd => dd.isExpired),
            // group records by rating
            ratingGroup = _.groupBy(nonExpiredRecords, (d) => d.rating),
            resident_list_from_records = _.groupBy(records, (d) => d.username),
            resident_count = Object.keys(resident_list_from_records).length,

            // group residents in a program based on the current phase they are in
            // the phase info is looked up from residentList
            currentPhaseGroup = _.groupBy(Object.keys(resident_list_from_records), (username_key) => {
                const residentInfo = _.find(residentList, (resident) => resident.username == username_key) || { 'currentPhase': 'unmapped' };
                return residentInfo.currentPhase;
            });

        return {
            programName,
            resident_count,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            current_phase_group: _.map(PHASES_LIST, (d) => (currentPhaseGroup[d] ? currentPhaseGroup[d].length : 0)),
            epa_count: records.length,
            expired_count: records.length - nonExpiredRecords.length,
            monthly_count: _.groupBy(nonExpiredRecords, (d) => moment(d.observation_date, 'YYYY-MM-DD').format('MMM')),
            monthly_count_expired: _.groupBy(expiredRecords, (d) => moment(d.observation_date, 'YYYY-MM-DD').format('MMM')),
            expired_epa_percentage: records.length == 0 ? 0 : Math.round(records.filter(dd => dd.isExpired).length / records.length * 100),
            entrustment_score: Math.round((_.meanBy(nonExpiredRecords, (dd) => +dd.rating || 0) || 0) * 100) / 100,
            words_per_comment: Math.round(_.meanBy(nonExpiredRecords, (dd) => dd.feedback.split(" ").length) || 0)
        }
    }).sort((a, b) => a.epa_count - b.epa_count);
}