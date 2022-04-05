import _ from 'lodash';
import moment from 'moment';
import { EPATextToNumber } from '../convertEPA';


export default function (dashboard = '', learnersDataDump) {

    let { rating_scale_map = [], assessments = [], course_name = '' } = learnersDataDump;

    // process the rating scale map
    // records come tagged with descriptor ID, we need to group the ratings by scale ID and then rate them by order.
    let scale_map = _.groupBy(rating_scale_map, (d) => d.scale_id);
    // Order the ratings in a single scale so that they are in order based on the order tag
    _.map(scale_map, (scale, scale_id) => {
        scale_map[scale_id] = _.map(_.sortBy(scale, d => d.order), (e) => e.text);
    });

    let allResidentRecords = [];

    let facultyStore = [],
        facultyGroupStore = [],
        departmentStore = [],
        residentStore = [];

    _.map(assessments, (record) => {
        // Map the rating for the record based on the descriptor ID
        const rating = _.find(rating_scale_map, d => d.descriptor_id == record.selected_descriptor_id) || { 'order': 1 };

        const record_mapped_epas = JSON.parse(record.mapped_epas),
            username = record.proxy_id,
            Resident_Name = record['resident'] || '',
            Assessor_Group = sanitise(record['assessor_group'], 'No Group'),
            Assessor_Name = record['assessor'],
            Assessor_Department = sanitise(record['assessor_department'], 'No Department').split(';');

        let assessment_record = {
            username,
            Date: moment(record.encounter_date, 'MMM DD, YYYY').format('YYYY-MM-DD'),
            EPA: recordEPAtoNumber(record, record_mapped_epas),
            phaseTag: getRecordPhaseCode(record_mapped_epas).toUpperCase(),
            Assessor_Name,
            Feedback: processComments(JSON.parse(record.comments)),
            Assessor_Group,
            Assessor_Role: sanitise(record['assessor_role'], 'No Role'),
            Assessor_Type: sanitise(record['assessor_type'], 'No Type'),
            Assessor_Department,
            Professionalism_Safety: '',
            Rating: rating.order,
            Rating_Text: '(' + rating.order + ') ' + rating.text,
            Resident_Name,
            Type: record.form_type,
            formID: record.form_id,
            Academic_Year: record['academic_year'],
            scale: scale_map[rating.scale_id] || ['Resident Entrustment'],
            progress: record.progress,
            Expiry_Date: record.expiry_date,
            isExpired: ((record.progress == 'inprogress') && (moment().isAfter(moment(record.expiry_date, 'MMM DD, YYYY'))))
        };

        if (assessment_record.EPA != 'unmapped') {
            allResidentRecords.push(assessment_record);
            facultyStore.push(Assessor_Name);
            facultyGroupStore.push(Assessor_Group);
            departmentStore.push(Assessor_Department);
            residentStore.push(username);
        }

    });

    if (dashboard == 'faculty') {
        // create a list of all faculty 
        let facultyList = _.map(_.uniq(facultyStore), value => ({ 'label': value, value }))
            .sort((previous, current) => previous.label.localeCompare(current.label));
        // create a list of all academic years 
        let facultyGroupList = _.map(_.uniq(facultyGroupStore), value => ({ 'label': value, value }))
            .sort((previous, current) => previous.label.localeCompare(current.label));
        let departmentList = _.map(_.uniq(_.flatten(departmentStore)), value => ({ 'label': value, value }))
            .sort((previous, current) => previous.label.localeCompare(current.label));

        // sub in a value at the front of the list for 'ALL'
        facultyList.unshift({ 'label': 'All', 'value': 'ALL' });
        // sub in a value at the front of the list for 'ALL'
        facultyGroupList.unshift({ 'label': 'All', 'value': 'ALL' });
        // sub in a value at the front of the list for 'ALL'
        departmentList.unshift({ 'label': 'All', 'value': 'ALL' });

        return { allResidentRecords, facultyList, facultyGroupList, departmentList, 'courseName': course_name };
    }

    else if (dashboard == 'program') {
        // create a list of all faculty 
        let residentList = _.map(_.uniq(residentStore), value => value);
        return { allResidentRecords, residentList, 'courseName': course_name };
    }

    return { allResidentRecords, 'courseName': course_name };
}


function sanitise(value, placeholder) {
    if (value) {
        if (value == 'null' || value == 'undefined') {
            return placeholder;
        }
        return value;
    }
    return placeholder;
}
function recordEPAtoNumber(record, record_mapped_epa_list) {
    if (record_mapped_epa_list.length > 0) {
        return EPATextToNumber(record_mapped_epa_list[0].objective_code || '');
    }
    else if (record.form_type == 'Supervisor Form' && record.title.indexOf('-') > -1) {
        return EPATextToNumber(record.title.split('-')[1].trim());
    }
    else { return 'unmapped' };
}

function getRecordPhaseCode(mapped_epas) {
    if (mapped_epas.length > 0) {
        return (mapped_epas[0].stage_code || '0');
    }
    else { return '0' };
}

function processComments(record_comments) {
    // if comments exists parse them
    if (record_comments && record_comments.length > 0) {
        // The comments can be of multiple types
        // the comment of the type label: "Based on this..."
        // are the regular feedback so add them in first
        // sometimes there are multiple entries of this type, which can happen
        // if they enter a comment first and then edit it and save it
        // so get the longest comment 
        let groupedComments = _.partition(record_comments, (d) => d.label.indexOf('Based on this') > -1);
        // the grouped comments is an array the first index contains all comments which are the feedback type
        // usually this is just one comment but sometimes the same entry gets
        // written multiple times so in those cases reduce it to the longest one.
        let comment = _.reduce(groupedComments[0], (acc, d) => d.text.length > acc.length ? d.text : acc, '');

        // if the comment is non empty add an empty line after it.
        comment = comment.length > 0 ? comment + '\n\n' : comment;

        // loop over any other comments if they exist
        _.map(groupedComments[1] || [], (d) => {
            // for each , first add an empty line and then a gap line
            // Also capitalize the item title
            comment += d.label.toLocaleUpperCase() + ": " + d.text + '\n\n';
        });

        return comment;
    }
    return '';
}



