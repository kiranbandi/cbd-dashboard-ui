import * as d3 from 'd3';
const phaseList = ['D', 'F', 'C', 'P'];
import { EPATextToNumber } from '../convertEPA';
import moment from 'moment';

export default function (allResidentRecords = [], epas = [], currentAcademicYear, currentDepartment) {

    let allResidentRecordsClone = _.clone(allResidentRecords);
    // if the  current Academic Year is ALL or not selected then use all resident records as in,
    // if not filter out all records that were marked in that rotation
    if (currentAcademicYear != 'ALL' && currentAcademicYear != '') {
        allResidentRecordsClone = _.filter(allResidentRecords, (d) => d.Academic_Year == currentAcademicYear);
    }

    // Filter by department
    if (currentDepartment != 'ALL' && currentDepartment != '') {
        allResidentRecordsClone = _.filter(allResidentRecordsClone, (d) => d.Assessor_Department.indexOf(currentDepartment) > -1);
    }

    // now group the records by the faculty name
    let recordsGroupedByFaculty = _.groupBy(allResidentRecordsClone, (d) => d.Assessor_Name),
        epaList = createEPAList(epas);

    // convert the grouped records into lists such that every group has 
    // a faculty name and then a list of the all required parameters
    return _.map(recordsGroupedByFaculty, (records, faculty_name) => {

        // group records by completion status 
        const assessmentGroup = _.groupBy(records, d => d.progress),
            completedRecords = assessmentGroup['complete'] || [],
            expiredRecords = _.filter(assessmentGroup['inprogress'], d => d.isExpired);

        // group records by training phase
        const trainingPhaseGroup = _.groupBy(completedRecords, (d) => d.phaseTag);
        // group records by rating
        const ratingGroup = _.groupBy(completedRecords, (d) => d.Rating),
            // group records by EPA
            epaGroup = _.groupBy(completedRecords, (d) => d.EPA);

        let expiry_rate = Math.round((expiredRecords.length / (completedRecords.length + expiredRecords.length)) * 100);
        if (isNaN(expiry_rate)) {
            expiry_rate = 0;
        }

        return {
            faculty_name,
            'records': completedRecords,
            expiredRecords,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            epaGroup: _.map([...epaList], (d) => epaGroup[d.key] ? epaGroup[d.key].length : 0),
            phase_group: _.map(phaseList, (d) => (trainingPhaseGroup[d] ? trainingPhaseGroup[d].length : 0)),
            epa_count: completedRecords.length,
            expiry_rate,
            entrustment_score: Math.round((d3.mean(completedRecords.map(dd => +dd.Rating || 0)) || 0) * 100) / 100,
            words_per_comment: Math.round(d3.mean(completedRecords.map(dd => dd.Feedback.split(" ").length)) || 0)
        }
    })
}

function createEPAList(epas = []) {
    return _.map(epas, (e) => {
        return { 'key': EPATextToNumber(e.target_label.split(':')[0].trim()), 'label': e.target_title };
    });
}
