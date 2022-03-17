import _ from 'lodash';
import axios from 'axios';
import processCourseData from './processors/processCourseData';
import processLearnerData from './processors/processLearnerData';
import tagRecordsWithRotation from './processors/tagRecordsWithRotation';
import processAllLearnerData from './processors/processAllLearnerData';
import endPoints from './endPoints';

var requestServer = {};

var localCache = { 'dataStore': [] };

requestServer.getLearnerList = function (params) {
    return new Promise((resolve, reject) => {

        axios.get(endPoints.assessments, {
            'params': {
                ...params,
                'section': 'api-learner-progress-dashboard',
                'method': 'get-learners-list-with-progress'
            }
        })
            .then((response) => {
                resolve(processCourseData(response.data));
            })
            .catch((err) => errorCallback(err, reject));

    });
}

requestServer.getLearnerData = function (username, residentInfo) {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.assessments, {
            'params': {
                'proxy_id': username,
                'course_id': course_id,
                'section': 'api-learner-progress-dashboard',
                'method': 'get-learner-assessments'
            }
        })
            .then((response) => {
                resolve(processLearnerData(username, residentInfo, response.data));
            })
            .catch((err) => errorCallback(err, reject));
    });
}

requestServer.getAllData = function (course = false) {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.assessments, {
            'params': {
                'course_id': course ? course : course_id,
                'section': 'api-learner-progress-dashboard',
                'method': 'get-all-learner-assessments'
            }
        })
            .then((response) => {
                resolve(processAllLearnerData(response.data));
            })
            .catch((err) => errorCallback(err, reject));
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
        var course_preference_request = jQuery.ajax({
            url: endPoints.assessments + "?section=api-learner-progress-dashboard",
            type: "POST",
            data: { "method": "set-learners-schedules", "rotation_data": JSON.stringify(rotation_data) }
        });
        jQuery.when(course_preference_request).done(function (data) { resolve(data) });
    });
}


function errorCallback(error, reject) {
    console.log(error);
    if (error.response && error.response.data) {
        alert("Sorry there was an error in connecting to the server, Please try reloading the page");
    } else {
        alert("Sorry there was an error in connecting to the server, Please try reloading the page");
    }
    reject();
}

module.exports = requestServer;

