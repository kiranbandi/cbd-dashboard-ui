import _ from 'lodash';
import moment from 'moment';
import { EPATextToNumber } from '../convertEPA';


export default function (learnersDataDump) {

    let { dashboard_epas = [], rating_scale_map = [], assessments = [], course_name = '' } = learnersDataDump;

    let assessments_fixed = _.map(assessments, (e) => ({ ...e, }));

    // process the rating scale map
    // records come tagged with descriptor ID, we need to group the ratings by scale ID and then rate them by order.
    let scale_map = _.groupBy(rating_scale_map, (d) => d.scale_id);
    // Order the ratings in a single scale so that they are in order based on the order tag
    _.map(scale_map, (scale, scale_id) => {
        scale_map[scale_id] = _.map(_.sortBy(scale, d => d.order), (e) => e.text);
    });

    var processedData = _.map(assessments_fixed, (record) => {

        // Map the rating for the record based on the descriptor ID
        const rating = _.find(rating_scale_map, d => d.descriptor_id == record.selected_descriptor_id) || { 'order': 1 };

        return {
            username: record.proxy_id,
            Date: moment(record.encounter_date, 'MMM DD, YYYY').format('YYYY-MM-DD'),
            EPA: recordEPAtoNumber(record),
            phaseTag: getRecordPhaseCode(record).toUpperCase(),
            Assessor_Name: record.assessor,
            Feedback: processComments(record),
            Assessor_Group: sanitise(record['assessor_group'], 'No Group'),
            Assessor_Role: sanitise(record['assessor_role'], 'No Role'),
            Assessor_Type: sanitise(record['assessor_type'], 'No Type'),
            Assessor_Department: sanitise(record['assessor_department'], 'No Department'),
            Professionalism_Safety: '',
            Rating: rating.order,
            Rating_Text: '(' + rating.order + ') ' + rating.text,
            Resident_Name: record['resident'] || '',
            Type: record.form_type,
            formID: record.form_id,
            Academic_Year: getAcademicYear(moment(record.encounter_date, 'MMM DD, YYYY').format('YYYY-MM-DD')),
            scale: scale_map[rating.scale_id] || ['Resident Entrustment'],
            progress: record.progress,
            Expiry_Date: record.expiry_date,
            isExpired: ((record.progress == 'inprogress') && (moment().isAfter(moment(record.expiry_date, 'MMM DD, YYYY'))))
        }
    });

    let allResidentRecords = processedData.filter((d) => d.EPA != 'unmapped');

    // If the course name has course code in it, remove 

    return { allResidentRecords, dashboard_epas, 'courseName': course_name };
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
function recordEPAtoNumber(record) {
    if (record.mapped_epas.length > 0) {
        return EPATextToNumber(record.mapped_epas[0].objective_code || '');
    }
    else if (record.form_type == 'Supervisor Form') {
        return EPATextToNumber(record.title.split('-')[1].trim());
    }
    else { return 'unmapped' };
}

function getRecordPhaseCode(record) {
    if (record.mapped_epas.length > 0) {
        return (record.mapped_epas[0].stage_code || '0');
    }
    else { return '0' };
}

function processComments(record) {
    // if comments exists parse them
    if (record.comments && record.comments.length > 0) {
        // The comments can be of multiple types
        // the comment of the type label: "Based on this..."
        // are the regular feedback so add them in first
        // sometimes there are multiple entries of this type, which can happen
        // if they enter a comment first and then edit it and save it
        // so get the longest comment 
        let groupedComments = _.partition(record.comments, (d) => d.label.indexOf('Based on this') > -1);
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


