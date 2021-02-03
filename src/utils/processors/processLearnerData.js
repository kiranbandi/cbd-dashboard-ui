import _ from 'lodash';
import moment from 'moment';
import { EPATextToNumber } from '../convertEPA';
export default function (username, learnerName, learnerDataDump) {

    let { advanced_search_epas, assessments = [],
        course_name, rotation_schedule, course_assessment_tools } = learnerDataDump;

    // TODO get this value also through the same API if possible
    const epaMaxCountList = window.epaMaxCountList;
    // process and set the source map  
    const programInfo = getProgramInfo(advanced_search_epas, epaMaxCountList, course_name);

    var residentData = _.map(assessments, (record) => {
        return {
            username,
            Date: moment(record.encounter_date, 'MMM DD, YYYY').format('YYYY-MM-DD'),
            EPA: EPATextToNumber(record.title.split('-')[1].trim()),
            Observer_Name: record.assessor,
            Feedback: record.comments.join('\n'),
            Observer_Type: '',
            Professionalism_Safety: '',
            Rating: record.selected_iresponse_order == 0 ? 5 : record.selected_iresponse_order,
            Resident_Name: learnerName,
            Situation_Context: '',
            Type: '',
            isExpired: false
        }
    });

    return { programInfo, residentData };
}

function getProgramInfo(epa_list, epaMaxCountList, course_name) {

    let defaultSourceMap = {
        1: {
            'ID': 'TTD',
            'topic': 'Transition to Discipline (D)',
            subRoot: {},
            maxObservation: {},
            assessmentInfo: {},
            filterValuesDict: {}
        },
        2: {
            'ID': 'F',
            'topic': 'Foundations of Discipline (F)',
            subRoot: {},
            maxObservation: {},
            assessmentInfo: {},
            filterValuesDict: {}
        },
        3: {
            'ID': 'CORE',
            'topic': 'Core of Discipline (C)',
            subRoot: {},
            maxObservation: {},
            assessmentInfo: {},
            filterValuesDict: {}
        },
        4: {
            'ID': 'TP',
            'topic': 'Transition to Practice (P)',
            subRoot: {},
            maxObservation: {},
            assessmentInfo: {},
            filterValuesDict: {}
        },
    };

    // Map over each EPA and append it to its corresponding entry in the sourcemap 
    _.map(epa_list, (epa) => {
        // first get the epa from the target label
        // then convert it into its corresponding number format
        const EPAID = EPATextToNumber(epa.target_label.split(":")[0].trim());
        // set the EPA label
        defaultSourceMap[EPAID[0]].subRoot[EPAID] = getEPATitle(epa.target_title);
        // set the EPA required observation count 
        defaultSourceMap[EPAID[0]].maxObservation[EPAID] = getEPARequiredCount(epa, epa.target_id);
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


function getEPARequiredCount(epa, epaTargetID) {
    if (epaMaxCountList[epaTargetID]) {
        return Object.values(epaMaxCountList[epaTargetID])[0];
    }
    else {
        // if no entry its a special assessment so default to 1
        return 1;
    }
}

function getEPATitle(title) {
    return title.slice(2).trim();
}