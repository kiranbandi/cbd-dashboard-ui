import moment from 'moment';
import * as d3 from 'd3';
const phaseList = ['TTD', 'F', 'CORE', 'TP'];

export default function(allResidentRecords = [], currentRotation, startDate, endDate, dateFilterActive, minimumRequired, programInfo) {

    // create a epa list to map epa distribution
    let epaList = getEPAList(programInfo.epaSourceMap);

    // if the current rotation is ALL or not selected then use all resident records as in,
    // if not filter out all records that were marked in that rotation
    if (currentRotation != 'ALL' && currentRotation != '') {
        allResidentRecords = _.filter(allResidentRecords, (d) => d.rotationTag == currentRotation);
    }
    // filter the records by dates if date filter is active
    let allResidentRecordsInPeriod = [];
    if (dateFilterActive) {
        allResidentRecordsInPeriod = _.filter(allResidentRecords, (d) => {
            return moment(d.observation_date, 'YYYY-MM-DD').isAfter(moment(startDate, 'MM/DD/YYYY')) && moment(d.observation_date, 'YYYY-MM-DD').isBefore(moment(endDate, 'MM/DD/YYYY'));
        });
    }

    // now group the records by the faculty name
    let recordsGroupedByFaculty = _.groupBy(allResidentRecords, (d) => d.observer_name);

    // remove faculties that dont meet the required minimum
    _.map(recordsGroupedByFaculty, (records, key) => {
        if (records.length < minimumRequired) {
            delete recordsGroupedByFaculty[key];
        }
    });

    // similary group the records in the date period by faculty name
    let recordsGroupedByFacultyInPeriod = _.groupBy(allResidentRecordsInPeriod, (d) => d.observer_name);

    // convert the grouped records into lists such that every group has 
    // a faculty name and then a list of the all required parameters
    return _.map(recordsGroupedByFaculty, (records, faculty_name) => {

        // find the correponding entry for the faculty in the group containing filtered records
        // if there isnt one simply sub in an empty list
        const recordsInPeriod = recordsGroupedByFacultyInPeriod[faculty_name] || [];

        // for some calculations we can ignore the expired records as for them the metrics dont
        // exist so we filter them out from the list
        const nonExpiredRecords = records.filter(dd => !dd.isExpired),
            nonExpiredRecordsInPeriod = recordsInPeriod.filter(dd => !dd.isExpired);

        // group records by training phase
        const trainingPhaseGroup = _.groupBy(dateFilterActive ? nonExpiredRecordsInPeriod : nonExpiredRecords, (d) => d.phaseTag);
        // group records by rating
        const ratingGroup = _.groupBy(dateFilterActive ? nonExpiredRecordsInPeriod : nonExpiredRecords, (d) => d.rating),
            // group records by EPA
            epaGroup = _.groupBy(records, (d) => d.epa);

        return {
            faculty_name,
            records,
            // for some faculties all there records are expired and so we can completely ignore
            all_expired: nonExpiredRecords.length == 0,
            all_expired_period: nonExpiredRecordsInPeriod.length == 0,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            epaGroup: _.map([...epaList], (d) => epaGroup[d.label] ? epaGroup[d.label].length : 0),
            phase_group: _.map(phaseList, (d) => (trainingPhaseGroup[d] ? trainingPhaseGroup[d].length : 0)),
            epa_count: records.length,
            epa_count_period: recordsInPeriod.length,
            expired_epa_percentage: Math.round(records.filter(dd => dd.isExpired).length / records.length * 100),
            expired_epa_percentage_period: recordsInPeriod.length > 0 ? Math.round(recordsInPeriod.filter(dd => dd.isExpired).length / recordsInPeriod.length * 100) : 0,
            entrustment_score: Math.round((d3.mean(nonExpiredRecords.map(dd => +dd.rating || 0)) || 0) * 100) / 100,
            entrustment_score_period: recordsInPeriod.length > 0 ? Math.round((d3.mean(nonExpiredRecordsInPeriod.map(dd => +dd.rating || 0)) || 0) * 100) / 100 : 0,
            words_per_comment: Math.round(d3.mean(nonExpiredRecords.map(dd => dd.feedback.split(" ").length)) || 0),
            words_per_comment_period: recordsInPeriod.length > 0 ? Math.round(d3.mean(nonExpiredRecordsInPeriod.map(dd => dd.feedback.split(" ").length)) || 0) : 0
        }
    })
}


function getEPAList(epaSourceMap) {
    // create a epa list to map epa distribution
    let templateEpaSourceMap = _.cloneDeep(epaSourceMap),
        EPAList = [];
    // remove special assessment EPAs if any
    _.map(templateEpaSourceMap, (epaSource, key) => {
        _.map(epaSource.subRoot, (epa, epaKey) => {
            if (epa.indexOf('(SA)') == -1) {
                EPAList.push({ 'label': epaKey, 'max': epaSource['maxObservation'][epaKey] });
            }
        })
    });
    return EPAList;
}