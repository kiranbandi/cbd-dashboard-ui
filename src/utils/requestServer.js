import _ from 'lodash';
import axios from 'axios';
import processCourseData from './processors/processCourseData';
import processLearnerData from './processors/processLearnerData';
import tagRecordsWithRotation from './processors/tagRecordsWithRotation';
import processAllLearnerData from './processors/processAllLearnerData';
import endPoints from './endPoints';

var requestServer = {};


requestServer.getLearnerList = function (params) {
    return new Promise((resolve, reject) => {
        let get_learner_data = jQuery.ajax({
            url: endPoints.assessments + "?section=api-learner-progress-dashboard",
            type: "POST",
            data: {
                "method": "get-learners-list-with-progress",
                ...params
            }
        });

        jQuery.when(get_learner_data)
            .done(function (data = '{}') { resolve(processCourseData(JSON.parse(data))) })
            .fail(e => errorCallback(e, reject));
    });
}

requestServer.getLearnerData = function (username, residentInfo) {
    return new Promise((resolve, reject) => {

        let get_learner_data = jQuery.ajax({
            url: endPoints.assessments + "?section=api-learner-progress-dashboard",
            type: "POST",
            data: {
                "method": "get-learner-assessments",
                "course_id": course_id,
                'proxy_id': username
            }
        });

        jQuery.when(get_learner_data)
            .done(function (data = '{}') { resolve(processLearnerData(username, residentInfo, JSON.parse(data))) })
            .fail(e => errorCallback(e, reject));
    });
}

requestServer.getAllData = function (course = false) {
    return new Promise((resolve, reject) => {

        let get_all_learners_data = jQuery.ajax({
            url: endPoints.assessments + "?section=api-learner-progress-dashboard",
            type: "POST",
            data: { "method": "get-all-learner-assessments", "course_id": course ? course : course_id }
        });

        jQuery.when(get_all_learners_data)
            .done(function (data) { resolve(processAllLearnerData(JSON.parse(data))) })
            .fail(e => errorCallback(e, reject));
    });
}

requestServer.getRotationSchedules = function (residentList = [], allRecords, courseName) {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.assessments, {
            'params': {
                'proxy_ids': residentList.join(','),
                'section': 'api-learner-progress-dashboard',
                'method': 'get-learners-schedules'
            }
        })
            .then((response) => {
                resolve(tagRecordsWithRotation(response.data, allRecords, courseName));
            })
            .catch((err) => errorCallback(err, reject));
    });
}

requestServer.setRotationSchedules = function (rotation_data) {
    return new Promise((resolve, reject) => {
        let set_rotation_request = jQuery.ajax({
            url: endPoints.assessments + "?section=api-learner-progress-dashboard",
            type: "POST",
            data: { "method": "set-learners-schedules", "rotation_data": JSON.stringify(rotation_data) }
        });
        jQuery.when(set_rotation_request).done(function (data) { resolve(data) });
    });
}


function errorCallback(error, reject) {
    console.log(error);
    alert("Sorry there was an error in connecting to the server, Please try reloading the page");
    reject();
}

module.exports = requestServer;

