import _ from 'lodash';
import axios from 'axios';
import processLearnerList from './processors/processLearnerList';
import processLearnerData from './processors/processLearnerData';
import endPoints from './endPoints';

var requestServer = {};

requestServer.getLearnerList = function (params) {
    return new Promise((resolve, reject) => {

        axios.get(endPoints.learners, {
            'params': {
                ...params,
                'section': 'api-learner-progress-dashboard',
                'method': 'get-learners-list-with-epa'
            }
        })
            .then((response) => {
                resolve(processLearnerList(response.data));
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

function errorCallback(error, reject) {
    console.log(error);
    if (error.response && error.response.data) {
            alert("Error connecting to the server");
    } else {
        alert("Error connecting to the server");
    }
    reject();
}

module.exports = requestServer;

