var endPointRoot = 'https://cbme.usask.ca/api/';
// When testing a local server uncomment the line below but for most
// cases we will be working with the prod server
// endPointRoot = 'http://localhost:8081/api/'

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
    UGdataDump: endPointRoot + "records/data-dump-ug",
    getUser: endPointRoot + "users"
}

module.exports = endPoints;