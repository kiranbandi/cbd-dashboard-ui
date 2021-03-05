import _ from 'lodash';
import moment from 'moment';
import { STAGES_LIST, PROGRAM_INFO } from './programInfo';

var POSSIBLE_FEEDBACK = ['Accelerated', 'As Expected', 'Not as Expected', 'Not Progressing', 'Inactive', 'No Data'];

export default function (allRecords = [], residentList = [], programList) {

    // Remove all residents that have graduated
    let filteredResidentList = _.filter(residentList, (d) => !d.isGraduated);

    // now group the records by the program name
    let recordsGroupedByProgram = _.groupBy(allRecords, (d) => d.program);

    // group residents by program
    let residentsGroupedByProgram = _.groupBy(filteredResidentList, (d) => d.program);

    // temporarily remove UG from program list
    let filteredProgramList = _.filter(programList, (d) => d.value != 'UNDERGRADUATE');

    // add an 'All' program to the grouped list and recordsgroup collection
    filteredProgramList.push({ value: "all", label: "Overall" });
    recordsGroupedByProgram['all'] = _.clone(allRecords);
    residentsGroupedByProgram['all'] = _.filter(filteredResidentList, (d) => d != 'UNDERGRADUATE');


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

        // For every resident get the last feedback provided, then group that 
        let feedbackGroup = _.groupBy(residentsGroupedByProgram[program], (resident) => {
            const latestFeedback = resident.ccFeedbackList ? resident.ccFeedbackList.length > 1 ?
                resident.ccFeedbackList : [{ 'rating': 'No Data' }] : [{ 'rating': 'No Data' }];
            return latestFeedback.slice(-1)[0].rating;
        });

        const sourceMap = program != 'all' ? PROGRAM_INFO[program].epaSourceMap : null,
            epaCompletionRate = sourceMap ? calculateEPACompletion(sourceMap, records) : [];

        return {
            programName,
            resident_count,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            current_phase_group: _.map(STAGES_LIST, (d) => (currentPhaseGroup[d] ? currentPhaseGroup[d].length : 0)),
            feedback_group: _.map(POSSIBLE_FEEDBACK, (d) => (feedbackGroup[d] ? feedbackGroup[d].length : 0)),
            epa_completion_rate: [...epaCompletionRate],
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


function calculateEPACompletion(epaSourceMap, records) {

    const epaObservationMap = {};
    // process base source map
    const nonSAEPAs = Object.values(epaSourceMap)
        .map(d => Object.entries(d.maxObservation).map(dd => ({ epa: dd[0], maxObservation: dd[1] })))
        .flat()
        .filter(d => epaSourceMap[d.epa.split('.')[0]].subRoot[d.epa].substring(0, 4) !== '(SA)');
    nonSAEPAs
        .forEach(d => epaObservationMap[d.epa] = { max: d.maxObservation, total: 0 });

    // process records 
    // for some programs such as anesthesia there are records with EPA numbers 
    // which dont exist in the original source map
    // these are selectively checked and filtered out by using the original source map in program info
    const filteredRecords = records
        .filter(d => (_.findIndex(nonSAEPAs, (inner_d) => inner_d.epa == d.epa) > -1));

    filteredRecords
        .forEach(d => epaObservationMap[d.epa].total++);

    const epaGroupObservationMap = Object.entries(epaObservationMap)
        .reduce((map, currentEntry) => {
            const epaGroup = currentEntry[0].split('.')[0];
            if (!map[epaGroup]) {
                map[epaGroup] = { max: 0, total: 0 };
            }
            map[epaGroup].max += currentEntry[1].max;
            map[epaGroup].total += currentEntry[1].total;
            return map;
        }, {})

    let epaCompletionList = Object.entries(epaObservationMap).map(d => {
        const result = {
            epa: d[0],
            percentageMax: roundTo2Decimal(d[1].max / epaGroupObservationMap[d[0].split('.')[0]].max),
            percentageTotal: roundTo2Decimal(d[1].total / epaGroupObservationMap[d[0].split('.')[0]].total),
        };

        // sometimes some EPAs might not even have started and so their percentage remains at 0
        // for them to avoid NaN problem due to zero in denominator, use or case with 1.
        result.percentageOffset = roundTo2Decimal((result.percentageTotal || 0) / (result.percentageMax || 1));

        return result;
    });

    // group by the training state 
    let groupedByTrainingStage = _.groupBy(epaCompletionList, (d) => d.epa[0]);

    return _.map([1, 2, 3, 4], (stageID) => {
        let allDivergencesInStage = _.map(groupedByTrainingStage[stageID], (e) => {
            // if the percentage offset is 1, divergence is zero
            if (e.percentageOffset == 1) {
                return 0;
            }
            else if (e.percentageOffset > 1) {
                return (e.percentageOffset - 1) * 100
            }
            // if offset is less than 1 , get by how much it diverges from 1
            return (1 - e.percentageOffset) * 100
        });
        // Take an average of all the divergences in a training stage
        return _.mean(allDivergencesInStage);
    });
}

let roundTo2Decimal = (d) => (Math.round(d * 100) / 100);
