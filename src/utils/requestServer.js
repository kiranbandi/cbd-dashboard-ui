import _ from 'lodash';
import residentData from './randomData/residentData';
import residentList from './randomData/residentList';

var requestServer = {};

requestServer.requestLogin = function (ticket) {
    return new Promise((resolve, reject) => {
        const userData = { "username": "vkb698", "accessType": "super-admin", "accessList": "", "program": "EM", "token": "test_token", "programList": ["EM"] };
        resolve(userData);
    });
}

requestServer.getResidentList = function (filterGraduated = false) {
    return new Promise((resolve, reject) => {
        resolve(residentList);
    });
}


requestServer.getResidentData = function (username) {
    return new Promise((resolve, reject) => {
        var recordsList = _.filter(residentData, e => e.username == username).map((record) => {
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
    return new Promise((resolve, reject) => {
        resolve([...residentData]);
    });
}

// APIs for narratives
requestServer.getNarratives = function (username) {
    return new Promise((resolve, reject) => {

        var narrativeList = _.filter(residentData, e => e.username == username).map((record) => {
            return {
                username,
                "resident_name": record.resident_name,
                "observer_name": record.observer_name,
                "observer_type": record.observer_type,
                "feedback": record.feedback,
                "professionalism_safety": record.professionalism_safety,
                "observation_date": record.observation_date,
                "completion_date": record.observation_date,
            }
        })
        resolve(narrativeList);
    });
}

module.exports = requestServer;