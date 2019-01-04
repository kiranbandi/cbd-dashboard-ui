import toastr from './toastr';
import axios from 'axios';
import endPoints from './endPoints';

var requestServer = {};

requestServer.requestLogin = function(credentials) {
    return new Promise((resolve, reject) => {
        if (credentials.username.length > 0 && credentials.password.length > 0) {
            // Call the login API , if successfull store token and resolve else reject promise
            axios.get(endPoints.login, { params: {...credentials } })
                .then((response) => {
                    localStorage.setItem('jwt', response.data.token);
                    toastr["success"]("Login Successful");
                    resolve(credentials.username);
                })
                .catch((error) => {
                    if (error.response.data && !error.response.data.auth) {
                        toastr["error"]("username or password dont match, Please try again", "LOGIN ERROR");
                    } else {
                        toastr["error"]("Error connecting to the server", "LOGIN ERROR");
                    }
                    reject();
                })

        } else {
            toastr["error"]("username or password is empty", "LOGIN ERROR");
            reject();
        }
    });
}

requestServer.getResidentList = function() {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.residentList, { headers: { 'x-access-token': localStorage.jwt } })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    toastr["error"]("Authorization Failed , Your token might have expired.Please Login again", "ERROR FETCHING RESIDENT NAMES");
                } else {
                    toastr["error"]("Failed to connect to server , Please try again", "ERROR FETCHING RESIDENT NAMES");
                }
                reject();
            })
    });
}

requestServer.getResidentData = function(residentName) {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.residentData, { headers: { 'x-access-token': localStorage.jwt }, params: { residentName } })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    toastr["error"]("Authorization Failed , Your token might have expired.Please Login again", "ERROR FETCHING RESIDENT DATA");
                } else {
                    toastr["error"]("Failed to connect to server , Please try again", "ERROR FETCHING RESIDENT DATA");
                }
                reject();
            })
    });
}


module.exports = requestServer;