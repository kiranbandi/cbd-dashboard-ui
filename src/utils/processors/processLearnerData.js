import _, { compact } from 'lodash';
import moment from 'moment';
import { EPATextToNumber } from '../convertEPA';
export default function (username, residentInfo, learnerDataDump) {

    let { advanced_search_epas = [],
        assessments = [], course_name = '',
        contextual_variables = [], rotation_schedule = [] } = learnerDataDump,
        { fullname, epaProgress } = residentInfo;

    // process and set the source map  
    const programInfo = getProgramInfo(advanced_search_epas, epaProgress, course_name);

    // Group the contextual variables by item code first 
    const groupedContextualVariables = _.groupBy(contextual_variables, (d) => d.item_code);
    // Get the contextual_variables alone for now 
    // TODO add patient and safety concerns 
    // Then group by form ID for easy access 
    const subGroupedContextualVariables = _.groupBy(groupedContextualVariables['CBME_contextual_variables'] || [], (d) => d.form_id);
    // For each form ID then further sub group by assessment ID
    _.map(subGroupedContextualVariables, (values, formID) => {
        subGroupedContextualVariables[formID] = _.groupBy(values, (d) => d.dassessment_id);
    });

    var processedData = _.map(assessments, (record) => {

        const contextual_variables_by_form = subGroupedContextualVariables[record.form_id] || {},
            situationContextCollection = contextual_variables_by_form[record.dassessment_id] || [];

        return {
            username,
            Date: moment(record.encounter_date, 'MMM DD, YYYY').format('YYYY-MM-DD'),
            EPA: recordEPAtoNumber(record),
            Observer_Name: record.assessor,
            Feedback: processComments(record),
            Observer_Type: '',
            Professionalism_Safety: '',
            Rating: record.selected_iresponse_order == 0 ? 5 : record.selected_iresponse_order,
            Resident_Name: fullname,
            Situation_Context: _.map(situationContextCollection, (e) => e.item_text + " : " + e.text).join("\n"),
            Type: record.form_type,
            situationContextCollection,
            formID: record.form_id,
            scaleSize: record.rating_scale_responses.length || 0
        }
    });

    var residentData = processedData.filter((d) => d.EPA != 'unmapped'),
        // use this unmapped data in future to deal with forms that have been updated
        // or archived and are no longer valid
        unmappedData = processedData.filter((d) => d.EPA == 'unmapped');

    // process the rotation schedule data 

    var rotationSchedule = processRotationSchedule(rotation_schedule);

    return { programInfo, residentData, rotationSchedule };
}

function getProgramInfo(epa_list, epaProgress, course_name) {

    let defaultSourceMap = {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {},
            maxObservation: {},
            observed: {},
            completed: {},
            achieved: {},
            assessmentInfo: {},
            filterValuesDict: {}
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {},
            maxObservation: {},
            observed: {},
            completed: {},
            achieved: {},
            assessmentInfo: {},
            filterValuesDict: {}
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {},
            maxObservation: {},
            observed: {},
            completed: {},
            achieved: {},
            assessmentInfo: {},
            filterValuesDict: {}
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {},
            maxObservation: {},
            observed: {},
            completed: {},
            achieved: {},
            assessmentInfo: {},
            filterValuesDict: {}
        },
    };

    // Map over each EPA and append it to its corresponding entry in the sourcemap 
    _.map(epa_list, (epa) => {
        // first find the corresponding EPA from the progess list 
        const matchingEPA = _.find(epaProgress, (d) => d.objective_id == epa.target_id);
        const EPAID = EPATextToNumber(matchingEPA.objective_code);

        // set the EPA label
        defaultSourceMap[EPAID[0]].subRoot[EPAID] = getEPATitle(epa.target_title);
        // set the EPA required observation count 
        defaultSourceMap[EPAID[0]].maxObservation[EPAID] = matchingEPA.total_assessments_required || 0;
        // set the EPA achieved count 
        defaultSourceMap[EPAID[0]].observed[EPAID] = matchingEPA.total_assessment_attempts || 0;
        // set the observed count 
        defaultSourceMap[EPAID[0]].achieved[EPAID] = matchingEPA.total_requirement_met_assessments || 0;
        // set the completed flag 
        defaultSourceMap[EPAID[0]].completed[EPAID] = matchingEPA.completed || false;

    });

    return {
        programName: course_name,
        rotationList: ["EM", "EM(PED)", "EM(RGNL)", "ACE", "ANESTHESIA", "CARDIO", "ICU", "GIM", "GEN SURG", "NEURO", "OBS/GYN", "OPTHO", "ORTHO", "OTHER", "PICU", "PLASTICS", "PSYCH", "SELECTIVE", "TOXICOLOGY", "TRAUMA", "TRANSPORT"],
        rotationRequired: {
            "ACE": 6,
            "EM": 13,
            "EM(REGINA)": 20,
            "EM(PED)": 12,
            "EM(RGNL)": 6,
            "ANESTHESIA": 9,
            "CARDIO": 8,
            "ICU": 6,
            "GIM": 8,
            "GEN SURG": 7,
            "NEURO": 4,
            "OPTHO": 8,
            "ORTHO": 4,
            "PLASTICS": 6,
            "SELECTIVE": 8,
            "TRAUMA": 7,
            "TOXICOLOGY": 4,
            "TRANSPORT": 6,
            "OBS/GYN": 4,
            "PICU": 4,
            "PSYCH": 4,
            "OTHER": 4
        },
        'epaSourceMap': { ...defaultSourceMap }
    }
}


function getEPATitle(title) {
    return title.slice(3).trim();
}

function recordEPAtoNumber(record) {
    if (record.form_type == 'Supervisor Form') {
        return EPATextToNumber(record.title.split('-')[1].trim());
    }
    else if (record.mapped_epas.length > 0) {
        return EPATextToNumber(record.mapped_epas[0].objective_code || '');
    }
    else { return 'unmapped' };
}

function processComments(record) {
    // if comments exists parse them
    if (record.comments && record.comments.length > 0) {
        // The comments can be of multiple types
        // the comment of the type item_text: "Based on this..."
        // are the regular feedback so add them in first
        // sometimes there are multiple entries of this type, which can happen
        // if they enter a comment first and then edit it and save it
        // so get the longest comment 
        let groupedComments = _.partition(record.comments, (d) => d.item_text.indexOf('Based on this') > -1);
        // the grouped comments is an array the first index contains all comments which are the feedback type
        // usually this is just one comment but sometimes the same entry gets
        // written multiple times so in those cases reduce it to the longest one.
        let comment = _.reduce(groupedComments[0], (acc, d) => d.comments.length > acc.length ? d.comments : acc, '');

        // if the comment is non empty add an empty line after it.
        comment = comment.length > 0 ? comment + '\n\n' : comment;

        // loop over any other comments if they exist
        _.map(groupedComments[1] || [], (d) => {
            // for each , first add an empty line and then a gap line
            // Also capitalize the item title
            comment += d.item_text.toLocaleUpperCase() + ": " + d.comments + '\n\n';
        });

        return comment;
    }
    return '';
}


function processRotationSchedule(rotationList) {
    return rotationList.map((r) => ({
        ...r,
        'start_date': moment(r.start_date, 'YYYY-MM-DD'),
        'end_date': moment(r.end_date, 'YYYY-MM-DD'),
        'academic_year': getAcademicYear(r.start_date),
        'unique_id': r.block_id + '-' + r.rotation_id
    }));
}


function getAcademicYear(startDate) {
    const dateObject = moment(startDate, 'YYYY-MM-DD'), year = dateObject.year();
    // The academic year is always the year number when the academic calendar starts
    // so to get the academic year, we first get the year entry of the datapoint
    // then if the datapoint is after July 1st then the academic year is that year number
    // if not then the academic year is the previous year number.
    if (dateObject.isSameOrAfter(moment('07/01/' + (+year), 'MM/DD/YYYY'))) {
        return year;
    }
    return year - 1;
}