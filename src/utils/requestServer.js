import _ from 'lodash';
import axios from 'axios';
import processCourseData from './processors/processCourseData';
import processLearnerData from './processors/processLearnerData';
import tagRecordsWithRotation from './processors/tagRecordsWithRotation';
import processAllLearnerData from './processors/processAllLearnerData';
import endPoints from './endPoints';

var requestServer = {};

var localCache = { 'dataStore': [], 'rotationSchedules': [] };

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

requestServer.getAllData = function () {
    return new Promise((resolve, reject) => {
        if (localCache.dataStore.length == 0) {
            axios.get(endPoints.assessments, {
                'params': {
                    'course_id': course_id,
                    'section': 'api-learner-progress-dashboard',
                    'method': 'get-all-learner-assessments'
                }
            })
                .then((response) => {
                    // store in local cache
                    localCache.dataStore = response.data;
                    resolve(processAllLearnerData(response.data));
                })
                .catch((err) => errorCallback(err, reject));
        }
        else {
            // stub in delay
            setTimeout(() => { resolve(processAllLearnerData(localCache.dataStore)); }, 100);
        }

    });
}

requestServer.getRotationSchedules = function (residentList = [], allRecords) {
    return new Promise((resolve, reject) => {
        if (localCache.rotationSchedules.length == 0) {
            axios.get(endPoints.assessments, {
                'params': {
                    'proxy_ids': residentList.join(','),
                    'section': 'api-learner-progress-dashboard',
                    'method': 'get-learners-schedules'
                }
            })
                .then((response) => {
                    // store in local cache
                    localCache.rotationSchedules = response.data;
                    resolve(tagRecordsWithRotation(response.data, allRecords));
                })
                .catch((err) => errorCallback(err, reject));
        }
        else {
            // stub in delay
            setTimeout(() => { resolve(tagRecordsWithRotation(localCache.rotationSchedules, allRecords)); }, 100);
        }

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

