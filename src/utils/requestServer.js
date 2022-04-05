import _ from 'lodash';
import processCourseData from './processors/processCourseData';
import processLearnerData from './processors/processLearnerData';
import tagRecordsWithRotation from './processors/tagRecordsWithRotation';
import processAllLearnerData from './processors/processAllLearnerData';

const ELENTRA_API = ENTRADA_URL + "/assessments" + "?section=api-learner-progress-dashboard";


var requestServer = {};

requestServer.getLearnerList = function (params) {
    return new Promise((resolve, reject) => {
        let get_learner_data = jQuery.ajax({
            url: ELENTRA_API,
            type: "POST",
            data: {
                "method": "get-learners-list-with-progress",
                ...params
            }
        });
        jQuery.when(get_learner_data)
            .done(function (data = '{}') { resolve(processCourseData(data)) })
            .fail(e => errorCallback(e, reject));
    });
}

requestServer.getLearnerData = function (username, residentInfo) {
    return new Promise((resolve, reject) => {
        let get_learner_data = jQuery.ajax({
            url: ELENTRA_API,
            type: "POST",
            data: {
                "method": "get-learner-assessments",
                "course_id": course_id,
                'proxy_id': username
            }
        });
        jQuery.when(get_learner_data)
            .done(function (data = '{}') { resolve(processLearnerData(username, residentInfo, data)) })
            .fail(e => errorCallback(e, reject));
    });
}

requestServer.getAllData = function (dashboard = '', academic_year = '', course = false) {
    return new Promise((resolve, reject) => {
        let get_all_learners_data = jQuery.ajax({
            url: ELENTRA_API,
            type: "POST",
            data: {
                "method": "get-all-learner-assessments",
                "course_id": course ? course : course_id,
                academic_year
            }
        });
        jQuery.when(get_all_learners_data)
            .done(function (data) { resolve(processAllLearnerData(dashboard, data)) })
            .fail(e => errorCallback(e, reject));
    });
}

requestServer.getRotationSchedules = function (residentList = [], allRecords, courseName) {
    return new Promise((resolve, reject) => {
        let get_all_learners_data = jQuery.ajax({
            url: ELENTRA_API,
            type: "POST",
            data: { "method": "get-learners-schedules", "proxy_ids": residentList.join(',') }
        });
        jQuery.when(get_all_learners_data)
            .done(function (data) { resolve(tagRecordsWithRotation(data, allRecords, courseName)) })
            .fail(e => errorCallback(e, reject));
    });
}

requestServer.setRotationSchedules = function (rotation_data) {
    return new Promise((resolve, reject) => {
        let set_rotation_request = jQuery.ajax({
            url: ELENTRA_API,
            type: "POST",
            data: { "method": "set-learners-schedules", "rotation_data": JSON.stringify(rotation_data) }
        });
        jQuery.when(set_rotation_request).done(function (data) { resolve(data) })
            .fail(e => errorCallback(e, reject));
    });
}


function errorCallback(error, reject) {
    console.log(error);
    alert("Sorry there was an error in connecting to the server, Please try reloading the page");
    reject();
}

module.exports = requestServer;

