import _ from 'lodash';
import axios from 'axios';
import processCourseData from './processors/processCourseData';
import processLearnerData from './processors/processLearnerData';
import processAllLearnerData from './processors/processAllLearnerData';
import endPoints from './endPoints';

var requestServer = {};

requestServer.getLearnerList = function (params) {
    return new Promise((resolve, reject) => {

        axios.get(endPoints.learners, {
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
        axios.get(endPoints.learners, {
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
        axios.get(endPoints.learners, {
            'params': {
                'course_id': course_id,
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

