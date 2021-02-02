import _ from 'lodash';
import sampleName from '../utils/residentListSample';
import sampleDump from '../utils/residentSampleDump';
import sampleData from '../utils/residentSampleData';
import endPoints from './endPoints';

var requestServer = {};

requestServer.getLearnerList = function (params) {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.learnerApi, {
            'params': {
                ...params,
                'section': 'api-learner-progress-dashboard',
                'method': 'get-visual-summary-data'
            },
            headers: {
                'authorization': 'Bearer ' + JWT
            }
        })
            .then((response) => {
                alert('received ' + response.data.length + ' learner profiles');
            })
            .catch((err) => errorCallback(err, reject));
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

