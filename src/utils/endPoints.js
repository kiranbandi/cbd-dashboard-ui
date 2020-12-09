var devEndpoint = 'https://cbme.usask.ca/api/';
// When testing a local server uncomment the line below but for most
// cases we will be working with the prod server
// devEndpoint = 'http://localhost:8081/api/'
var endPointRoot = process.env.NODE_ENV == 'development' ? devEndpoint : './api/';

var endPoints = {
    // end points for users
    login: endPointRoot + "users/authenticate",
    reIssueToken: endPointRoot + "users/reissuetoken",
    register: endPointRoot + "users/register",
    allUsers: endPointRoot + "users/all",
    updateUser: endPointRoot + "users/update",
    updateCCFeedbackList: endPointRoot + "users/update-cc-feedback",
    updateExamscore: endPointRoot + "users/update-exam-score",
    residents: endPointRoot + "users/residents",
    residentsAll: endPointRoot + "users/residents-all",
    // end points for narratives
    residentNarratives: endPointRoot + "narratives/all",
    setNarratives: endPointRoot + "narratives/store",
    // end points for records
    residentRecords: endPointRoot + "records/all",
    observerList: endPointRoot + "records/all-observers",
    getRecordsByYear: endPointRoot + "records/records-by-year",
    setRecords: endPointRoot + "records/store",
    recordsByObserver: endPointRoot + "records/observer",
    dataDump: endPointRoot + "records/data-dump",
    getUser: endPointRoot + "users",
    // end points for task lists
    getTaskList: endPointRoot + "tasks/all",
    setTaskList: endPointRoot + "tasks/store",
}

module.exports = endPoints;