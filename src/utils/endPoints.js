var endPointRoot = process.env.NODE_ENV == 'development' ? process.env.DEV_ENDPOINT : process.env.PROD_ENDPOINT;

var endPoints = {
    // end points for users
    login: endPointRoot + "users/authenticate",
    reIssueToken: endPointRoot + "users/reissuetoken",
    register: endPointRoot + "users/register",
    allUsers: endPointRoot + "users/all",
    updateUser: endPointRoot + "users/update",
    updateCCFeedbackList: endPointRoot + "users/update-cc-feedback",
    updateExamscore: endPointRoot + "users/update-exam-score",
    updateCompletionStatus: endPointRoot + "users/update-completion-status",
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