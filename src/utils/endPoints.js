// var endPointRoot = 'https://cbd.usask.ca:8081/';

var endPointRoot = 'http://localhost:8081/'

var endPoints = {

    setRecords: endPointRoot + "records/store",
    login: endPointRoot + "users/authenticate",
    register: endPointRoot + "users/register",
    allUsers: endPointRoot + "users/all",
    updateUser: endPointRoot + "users/update",
    residents: endPointRoot + "users/residents",
    getUser: endPointRoot + "users",
    // same end point for two use cases with the difference being the API method , get vs delete
    // should I change the name (O_O) ? oh god this is getting too complex for me 
}

module.exports = endPoints;