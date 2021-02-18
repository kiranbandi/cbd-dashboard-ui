import _ from 'lodash';
import moment from 'moment';
import { EPATextToNumber } from '../convertEPA';
export default function (username, residentInfo, learnerDataDump) {

    let { advanced_search_epas = [],
        assessments = [], course_name = '',
        contextual_variables = [] } = learnerDataDump,
        { fullname, epaProgress } = residentInfo;

    // Fetch preset context variable map
    const { contextual_variable_map } = window.saskDashboard;

    // only consider assessments which are supervisor forms for now
    // field notes and narratives and rubric forms are ignored I guess 
    // Also filter out records which dont have a corresponding contextual variable map form ID
    // this probably means they have not been defined yet
    let valid_assessments = _.filter(assessments, (d) => d.form_shortname == 'cbme_supervisor' && contextual_variable_map[d.form_id]);

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

    var residentData = _.map(valid_assessments, (record) => {

        const situationContextCollection = subGroupedContextualVariables[record.form_id][record.dassessment_id] || [];

        return {
            username,
            Date: moment(record.encounter_date, 'MMM DD, YYYY').format('YYYY-MM-DD'),
            EPA: EPATextToNumber(record.title.split('-')[1].trim()),
            Observer_Name: record.assessor,
            Feedback: record.comment_response ? record.comment_response : '',
            Observer_Type: '',
            Professionalism_Safety: '',
            Rating: record.selected_iresponse_order == 0 ? 5 : record.selected_iresponse_order,
            Resident_Name: fullname,
            Situation_Context: _.map(situationContextCollection, (e) => e.item_text + " : " + e.text).join("\n"),
            Type: '',
            isExpired: false,
            situationContextCollection,
            formID: record.form_id
        }
    });

    return { programInfo, residentData };
}

function getProgramInfo(epa_list, epaProgress, course_name) {

    let rawEPAList = {};

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

        if (epa.target_title.indexOf('Special Assessment') == -1) {
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
        }
        else {
            // TODO also include special assessment EPAs 
        }
    });

    return {
        programName: course_name,
        rawEPAList,
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