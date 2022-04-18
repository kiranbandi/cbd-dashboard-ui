import _ from 'lodash';
const phaseList = ['D', 'F', 'C', 'P'];

export default function (allResidentRecords = [], currentFacultyGroup, currentDepartment) {

    let allResidentRecordsClone = _.clone(allResidentRecords);

    // Filter by assessor group
    if (currentFacultyGroup != 'ALL' && currentFacultyGroup != '') {
        allResidentRecordsClone = _.filter(allResidentRecords, (d) => d.Assessor_Group == currentFacultyGroup);
    }

    // Filter by department
    if (currentDepartment != 'ALL' && currentDepartment != '') {
        allResidentRecordsClone = _.filter(allResidentRecordsClone, (d) => d.Assessor_Department.indexOf(currentDepartment) > -1);
    }

    // now group the records by the faculty name
    let recordsGroupedByFaculty = _.groupBy(allResidentRecordsClone, (d) => d.Assessor_Name);

    // convert the grouped records into lists such that every group has 
    // a faculty name and then a list of the all required parameters
    return _.map(recordsGroupedByFaculty, (records, faculty_name) => {

        // group records by completion status 
        const assessmentGroup = _.groupBy(records, d => d.progress),
            completedRecords = assessmentGroup['complete'] || [],
            expiredRecords = _.filter(assessmentGroup['inprogress'], d => d.isExpired),
            inProgressRecords = _.filter(assessmentGroup['inprogress'], d => !d.isExpired);

        // group records by training phase
        const trainingPhaseGroup = _.groupBy(completedRecords, (d) => d.phaseTag);
        // group records by rating
        // Also for rating group since we map the data to a 5 point scale
        // we only consider forms with a scale of size 5 and are Supervisor Forms
        let validScaleRecords = _.filter(completedRecords, (d) => ((d.Type == "Supervisor Form") && (d.scale.length >= 5)));
        const ratingGroup = _.groupBy(validScaleRecords, (d) => d.Rating);

        let expiry_rate = Math.round((expiredRecords.length / (completedRecords.length + expiredRecords.length)) * 100);
        if (isNaN(expiry_rate)) {
            expiry_rate = 0;
        }

        return {
            faculty_name,
            'records': completedRecords,
            expiredRecords,
            inProgressRecords,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            phase_group: _.map(phaseList, (d) => (trainingPhaseGroup[d] ? trainingPhaseGroup[d].length : 0)),
            epa_count: completedRecords.length,
            expiry_rate,
            entrustment_score: Math.round((_.mean(validScaleRecords.map(dd => +dd.Rating || 0)) || 0) * 100) / 100,
            words_per_comment: Math.round(_.mean(completedRecords.map(dd => dd.Feedback.split(" ").length)) || 0)
        }
    })
}
