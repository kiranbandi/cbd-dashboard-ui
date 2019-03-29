import toastr from './toastr';
import axios from 'axios';
import endPoints from './endPoints';

var requestServer = {};

requestServer.requestLogin = function(credentials) {
    return new Promise((resolve, reject) => {
        if (credentials.username.length > 0 && credentials.password.length > 0) {
            // Call the login API , if successfull store token and resolve else reject promise
            axios.post(endPoints.login, {...credentials })
                .then((response) => {
                    toastr["success"]("Login Successful");
                    resolve(response.data);
                })
                .catch((err) => errorCallback(err, reject));
        } else {
            toastr["error"]("username or password is empty", "LOGIN ERROR");
            reject();
        }
    });
}


requestServer.registerUser = function(userData) {

    let { username, fullname, password, email, accessType, accessList, currentPhase, rotationSchedule, longitudinalSchedule, programStartDate } = userData;

    return new Promise((resolve, reject) => {
        if (username.length == 0 || password.length == 0) {
            toastr["error"]("username or password is empty", "CREATE USER ERROR");
            reject();
        } else if (fullname.length == 0 || email.length == 0) {
            toastr["error"]("fullname or email is empty", "CREATE USER ERROR");
            reject();
        } else {
            // convert accessList from string to array of values
            accessList = accessList.length > 0 ? accessList.split(',') : [];
            axios.post(endPoints.register, { username, fullname, password, email, accessList, accessType, currentPhase, rotationSchedule, longitudinalSchedule, programStartDate }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
                .then((response) => {
                    toastr["success"]("User " + username + " created successfully");
                    resolve();
                })
                .catch((err) => errorCallback(err, reject));
        }
    });
}

requestServer.updateUser = function(userData) {

    let { username, password, email, fullname, accessType, accessList, currentPhase, rotationSchedule, longitudinalSchedule, programStartDate } = userData;

    return new Promise((resolve, reject) => {
        if (username.length == 0 || email.length == 0 || fullname.length == 0) {
            toastr["error"]("username or email or fullname cannot be empty", "UPDATE USER ERROR");
            reject();
        } else {
            // convert accessList from string to array of values
            accessList = accessList.length > 0 ? accessList.split(',') : [];
            axios.post(endPoints.updateUser + "/" + username, { username, password, email, accessList, fullname, accessType, currentPhase, rotationSchedule, longitudinalSchedule, programStartDate }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
                .then((response) => {
                    toastr["success"]("User " + username + " updated successfully");
                    resolve();
                })
                .catch((err) => errorCallback(err, reject));
        }
    });
}


requestServer.getAllUsers = function() {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.allUsers, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => { resolve(response.data.map((user) => user.username)) })
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


requestServer.getResidentList = function() {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.residents, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
            .then((response) => { resolve(response.data) })
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
requestServer.setRecords = function(records, username) {

    var recordsList = records.map((record) => {
        return {
            username,
            observation_date: record.Date,
            epa: record.EPA,
            feedback: record.Feedback,
            observer_name: record.Observer_Name,
            observer_type: record.Observer_Type,
            professionalism_safety: record.Professionalism_Safety,
            rating: record.Rating,
            resident_name: record.Resident_Name,
            situation_context: record.Situation_Context,
            type: record.Type,
            isExpired: record.isExpired
        }
    })

    return new Promise((resolve, reject) => {
        axios.post(endPoints.setRecords, { username, recordsList }, { headers: { 'authorization': 'Bearer ' + sessionStorage.jwt } })
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