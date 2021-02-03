import _ from 'lodash';
import axios from 'axios';
import sampleName from './sampleData/residentListSample';
import sampleDump from './sampleData/residentSampleDump';
import sampleData from './sampleData/residentSampleData';
import sampleLearnerList from './sampleData/elentraSampleLearnerList';
import sampleLearnerData from './sampleData/elentraSampleLearnerData';
import processLearnerList from './processors/processLearnerList';
import processLearnerData from './processors/processLearnerData';

import endPoints from './endPoints';

var requestServer = {};

requestServer.getLearnerList = function (params) {
    return new Promise((resolve, reject) => {

        resolve(processLearnerList(sampleLearnerList));

        // axios.get(endPoints.learners, {
        //     'params': {
        //         'proxy_id':3001878,
        //         'section': 'api-learner-progress-dashboard',
        //         'method': 'get-learner-assessments'
        //     }
        // })
        //     .then((response) => {
        //        debugger;
        //     })
        //     .catch((err) => errorCallback(err, reject));

    });
}

requestServer.getLearnerData = function (username, residentName) {
    return new Promise((resolve, reject) => {

        console.log(username,residentName);

        resolve(processLearnerData(username, residentName, sampleLearnerData));

        // axios.get(endPoints.learners, {
        //     'params': {
        //         'proxy_id':username,
        //         'section': 'api-learner-progress-dashboard',
        //         'method': 'get-learner-assessments'
        //     }
        // })
        //     .then((response) => {
        //        debugger;
        //     })
        //     .catch((err) => errorCallback(err, reject));
    });
}


requestServer.getResidentList = function () {
    return new Promise((resolve) => { resolve(sampleName) });
}

requestServer.getResidentData = function (username) {
    return new Promise((resolve) => {
        var recordsList = sampleData.map((record) => {
            return {
                username,
                Date: record.observation_date,
                EPA: record.epa,
                Feedback: record.feedback,
                Observer_Name: record.observer_name,
                Observer_Type: record.observer_type,
                Professionalism_Safety: record.professionalism_safety,
                Rating: record.rating,
                Resident_Name: record.resident_name,
                Situation_Context: record.situation_context + ', ' + record.type.substring(0, 6),
                Type: record.type,
                isExpired: record.isExpired || false
            }
        })
        resolve(recordsList);
    });
}

requestServer.getAllData = function () {
    return new Promise((resolve) => { resolve(sampleDump) });
}

module.exports = requestServer;

