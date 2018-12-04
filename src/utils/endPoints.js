var endPointRoot = 'https://cbd.usask.ca:8081/';

// var endPointRoot = 'http://localhost:8081/'

var endPoints = {
    login: endPointRoot + "login",
    residentList: endPointRoot + "get-all-residents",
    residentData: endPointRoot + "get-resident-data",
}

module.exports = endPoints;