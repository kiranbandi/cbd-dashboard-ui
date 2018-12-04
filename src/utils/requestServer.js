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
                    if (!error.response.data.auth) {
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

module.exports = requestServer;