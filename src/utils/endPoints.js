var endPointRoot;

endPointRoot = 'https://cbd.usask.ca:8081/';
// When testing a local server uncomment below but for most
// cases we will be working with the prod server , I know this is not the
// the most efficient solution to do this !!!
endPointRoot = 'http://localhost:8081/'

var endPoints = {

    setRecords: endPointRoot + "records/store",
    login: endPointRoot + "users/authenticate",
    register: endPointRoot + "users/register",
    allUsers: endPointRoot + "users/all",
    updateUser: endPointRoot + "users/update",
    residents: endPointRoot + "users/residents",
    residentRecords: endPointRoot + "records/all",
    observerList: endPointRoot + "records/all-observers",
    recordsByObserver: endPointRoot + "records/observer",
    dataDump: endPointRoot + "records/data-dump",
    getUser: endPointRoot + "users"
        // same end point for two use cases with the difference being the API method , get vs delete
        // should I change the name (O_O) ?  
}

module.exports = endPoints;