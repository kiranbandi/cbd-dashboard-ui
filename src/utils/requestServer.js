import toastr from './toastr';
import axios from 'axios';
import endPoints from './endPoints';
import _ from 'lodash';

var requestServer = {};

requestServer.requestLogin = function(ticket) {
    return new Promise((resolve, reject) => {
        axios.post(endPoints.login, { ticket, isDevSite: (process.env.NODE_ENV == 'development') })
            .then((response) => { resolve(response.data) })
            .catch((err) => errorCallback(err, reject));
    });
}

requestServer.reIssueToken = function(program) {
    return new Promise((resolve, reject) => {
        axios.post(endPoints.reIssueToken, { program }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => { resolve(response.data) })
            .catch((err) => errorCallback(err, reject));
    });
}


requestServer.registerUser = function(userData) {

    let { username, fullname, email, accessType, accessList, currentPhase, rotationSchedule, isGraduated = false, longitudinalSchedule, citeExamScore, oralExamScore, programStartDate, promotedDate } = userData;

    return new Promise((resolve, reject) => {
        if (username.length == 0) {
            toastr["error"]("NSID cannot be empty", "CREATE USER ERROR");
            reject();
        } else if (fullname.length == 0 || email.length == 0) {
            toastr["error"]("fullname or email is empty", "CREATE USER ERROR");
            reject();
        } else {
            // convert accessList from string to array of values
            accessList = accessList.length > 0 ? accessList.split(',') : [];
            axios.post(endPoints.register, { username, fullname, email, accessList, accessType, isGraduated, currentPhase, rotationSchedule, longitudinalSchedule, citeExamScore, oralExamScore, programStartDate, promotedDate }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
                .then((response) => {
                    toastr["success"]("User " + username + " created successfully");
                    resolve();
                })
                .catch((err) => errorCallback(err, reject));
        }
    });
}

requestServer.updateUser = function(userData) {

    let { username, email, fullname, accessType, accessList, currentPhase, rotationSchedule, longitudinalSchedule, citeExamScore, isGraduated, oralExamScore, programStartDate, promotedDate } = userData;

    return new Promise((resolve, reject) => {
        if (username.length == 0 || email.length == 0 || fullname.length == 0) {
            toastr["error"]("NSID or email or fullname cannot be empty", "UPDATE USER ERROR");
            reject();
        } else {
            // convert accessList from string to array of values
            accessList = accessList.length > 0 ? accessList.split(',') : [];
            axios.post(endPoints.updateUser + "/" + username, { username, email, accessList, fullname, accessType, currentPhase, isGraduated, rotationSchedule, citeExamScore, oralExamScore, longitudinalSchedule, programStartDate, promotedDate }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
                .then((response) => {
                    toastr["success"]("User " + username + " updated successfully");
                    resolve();
                })
                .catch((err) => errorCallback(err, reject));
        }
    });
}


requestServer.updateCCFeedbackList = function(username, ccFeedbackList) {

    return new Promise((resolve, reject) => {
        axios.post(endPoints.updateCCFeedbackList + "/" + username, { ccFeedbackList }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => {
                toastr["success"]("CC Feedback for " + username + " updated successfully");
                resolve(response.data.data.ccFeedbackList);
            })
            .catch((err) => errorCallback(err, reject));
    });
}


requestServer.getAllUsers = function() {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.allUsers, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => {
                resolve(response.data.map((user) => {
                    const { username, fullname, accessType } = user;
                    return { username, fullname, accessType }
                }))
            })
            .catch((err) => errorCallback(err, reject));
    });
}

requestServer.getUser = function(username) {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.getUser + "/" + username, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => { resolve(response.data) })
            .catch((err) => errorCallback(err, reject));
    });
}

//  only difference being the API method get vs delete , should I combine both 
//  would this be over engineering shit !
requestServer.deleteUser = function(username) {
    return new Promise((resolve, reject) => {
        axios.delete(endPoints.getUser + "/" + username, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => {
                toastr["success"]("User " + username + " deleted successfully");
                resolve(response.data)
            })
            .catch((err) => errorCallback(err, reject));
    });
}

requestServer.getObserverList = function() {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.observerList, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            // we take the zeroth index because mongo returns an object inside the array 
            .then((response) => { resolve(_.map(response.data[0], (d, k) => { return { 'name': k, 'count': d } })); })
            .catch((err) => errorCallback(err, reject));
    });
}

requestServer.getResidentList = function(filterGraduated = false) {

    return new Promise((resolve, reject) => {
        axios.get(endPoints.residents, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => {
                if (filterGraduated) {
                    resolve(_.filter(response.data, (d) => !d.isGraduated));
                } else {
                    resolve(response.data);
                }
            })
            .catch((err) => errorCallback(err, reject));
    });
}


requestServer.getObserverData = function(observername) {
    return new Promise((resolve, reject) => {
        axios.post(endPoints.recordsByObserver, { observername }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => {
                if (response.data.length == 0) {
                    toastr["error"]("No records found", "ERROR");
                    resolve([]);
                } else {
                    var recordsList = response.data.map((record) => {
                        return {
                            Date: record.observation_date,
                            EPA: record.epa,
                            Feedback: record.feedback,
                            Observer_Name: record.observer_name,
                            Observer_Type: record.observer_type,
                            Professionalism_Safety: record.professionalism_safety,
                            Rating: record.rating,
                            Resident_Name: record.resident_name,
                            Situation_Context: record.situation_context,
                            Type: record.type,
                            isExpired: record.isExpired || false
                        }
                    })
                    resolve(recordsList);
                }
            })
            .catch((err) => errorCallback(err, reject));
    });
}



requestServer.getResidentData = function(username) {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.residentRecords + "/" + username, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => {
                if (response.data.length == 0) {
                    toastr["error"]("No records found", "ERROR");
                    resolve([]);
                } else {
                    var recordsList = response.data.map((record) => {
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
                            Situation_Context: record.situation_context,
                            Type: record.type,
                            isExpired: record.isExpired || false
                        }
                    })
                    resolve(recordsList);
                }
            })
            .catch((err) => errorCallback(err, reject));
    });
}

requestServer.setRecords = function(records, username, yearTag) {

    var recordsList = records.map((record) => {
        return {
            username,
            observation_date: record.Date,
            year_tag: record.yearTag,
            epa: record.EPA,
            feedback: record.Feedback,
            observer_name: record.Observer_Name,
            observer_type: record.Observer_Type,
            professionalism_safety: record.Professionalism_Safety,
            rating: record.Rating,
            resident_name: record.Resident_Name,
            situation_context: record.Situation_Context,
            type: record.Type,
            isExpired: record.isExpired,
            phaseTag: record.phaseTag,
            rotationTag: record.rotationTag
        }
    })

    return new Promise((resolve, reject) => {
        axios.post(endPoints.setRecords, { username, recordsList, yearTag }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => { resolve(response.data) })
            .catch((err) => errorCallback(err, reject));
    });
}

requestServer.getAllData = function() {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.dataDump, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => { resolve(response.data) })
            .catch((err) => errorCallback(err, reject));
    });
}

// APIs for narratives
requestServer.getNarratives = function(username) {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.residentNarratives + "/" + username, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => {
                var narrativeList = response.data.map((record) => {
                    return {
                        username,
                        "resident_name": record.resident_name,
                        "observer_name": record.observer_name,
                        "observer_type": record.observer_type,
                        "feedback": record.feedback,
                        "professionalism_safety": record.professionalism_safety,
                        "observation_date": record.observation_date,
                        "completion_date": record.completion_date,
                    }
                })
                resolve(narrativeList);
            })
            .catch((err) => errorCallback(err, reject));
    });
}

requestServer.setNarratives = function(narratives, username, yearTag) {

    var narrativesList = narratives.map((narrative) => {
        return {
            username,
            ...narrative
        }
    })

    return new Promise((resolve, reject) => {
        axios.post(endPoints.setNarratives, { username, narrativesList, yearTag }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => { resolve(response.data) })
            .catch((err) => errorCallback(err, reject));
    });
}


function errorCallback(error, reject) {
    if (error.response && error.response.data) {
        toastr["error"](error.response.data.message, "ERROR");
    } else {
        toastr["error"]("Error connecting to the server", "ERROR");
    }
    reject();
}

module.exports = requestServer;