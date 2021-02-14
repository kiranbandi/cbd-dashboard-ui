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

requestServer.getLearnerData = function (username, residentName) {
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
                resolve(processLearnerData(username, residentName, response.data));
            })
            .catch((err) => errorCallback(err, reject));
    });
}


requestServer.getAllLearnersData = function () {
    return new Promise((resolve) => { resolve({}) });
}

module.exports = requestServer;

