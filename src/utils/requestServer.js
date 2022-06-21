import toastr from './toastr';
import axios from 'axios';
import endPoints from './endPoints';
import _ from 'lodash';

var requestServer = {};

requestServer.requestLogin = function (ticket) {
    return new Promise((resolve, reject) => {
        const userData = { "username": "vkb698", "accessType": "super-admin", "accessList": "", "program": "EM", "token": "test_token", "programList": ["SURGFND"] };
        resolve(userData);
    });
}

requestServer.getResidentList = function (filterGraduated = false) {
    return new Promise((resolve, reject) => {
        resolve(residentList);
    });
}


requestServer.getResidentData = function (username) {
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
                            // TODO might need to modify server side
                            Situation_Context: record.situation_context + ', ' + record.type.substring(0, 6),
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

requestServer.getAllData = function () {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.dataDump, {
            headers: {
                'authorization': 'Bearer ' + sessionStorage.jwt
            }
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => errorCallback(err, reject));
    });
}

// APIs for narratives
requestServer.getNarratives = function (username) {
    return new Promise((resolve, reject) => {
        axios.get(endPoints.residentNarratives + "/" + username, {
            headers: {
                'authorization': 'Bearer ' + sessionStorage.jwt
            }
        })
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

function errorCallback(error, reject) {
    toastr["error"]("Error connecting to the server", "ERROR")
    reject();
}

module.exports = requestServer;



let residentList = [
    {
        "promotedDate": [
            "06/12/2018",
            "06/12/2018",
            "12/08/2020"
        ],
        "ccFeedbackList": [
            {
                "feedback": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dicta ratione aperiam incidunt ex aut ducimus consequatur sapiente praesentium quis?",
                "meetingDate": "06/18/2019",
                "rating": "As Expected"
            },
            {
                "feedback": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dicta ratione aperiam incidunt ex aut ducimus consequatur sapiente praesentium quis?",
                "meetingDate": "09/18/2018",
                "rating": "As Expected"
            }
        ],
        "_id": "5c36756045cf18296dc91b5f",
        "username": "qsp760",
        "fullname": "John Doe",
        "currentPhase": "transition-to-practice",
        "programStartDate": "2016-07-01T06:00:00.000Z",
        "rotationSchedule": {
            "2016": [
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM"
            ],
            "2017": [
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM"
            ],
            "2018": [
                "EM(PED)",
                "EM",
                "EM(RGNL)",
                "ICU",
                "EM",
                "ANESTHESIA",
                "EM",
                "SELECTIVE",
                "EM",
                "ORTHO",
                "EM(REGINA)",
                "ICU",
                "EM"
            ],
            "2019": [
                "EM",
                "EM",
                "EM",
                "EM",
                "ACE",
                "EM(RGNL)",
                "ACE",
                "TRANSPORT",
                "ACE",
                "ACE",
                "PICU",
                "TOXICOLOGY",
                "EM"
            ],
            "2020": [
                "EM",
                "TRAUMA",
                "ICU",
                "EM(PED)",
                "EM",
                "EM(REGINA)",
                "TRAUMA",
                "EM",
                "EM",
                "EM",
                "EM",
                "TRANSPORT",
                "EM(PED)"
            ]
        },
        "uploadedData": "2021-07-07T06:00:00.000Z",
        "longitudinalSchedule": {
            "2018": "ADMIN / REGIONAL EM / EMS",
            "2019": "MASTERS"
        },
        "citeExamScore": {
            "2016": "60",
            "2017": "52",
            "2018": "37, 2",
            "2019": "23,5",
            "2020": "27,20"
        },
        "isGraduated": false,
        "oralExamScore": {
            "2018": [
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "65"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "50"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "75"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "75"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "70"
                }
            ],
            "2019": [
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "80"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "70"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "70"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "80"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "75"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "50"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "85"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "90"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "60"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "80"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "60"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "70"
                }
            ]
        },
        "id": "5c36795345cf18296dc91ba9"
    },
    {
        "promotedDate": [
            "10/01/2017",
            "06/30/2018"
        ],
        "ccFeedbackList": [],
        "_id": "5c36798145cf18296dc91baa",
        "username": "grw749",
        "fullname": "Jane Doe",
        "currentPhase": "core-of-discipline",
        "programStartDate": "2017-07-01T06:00:00.000Z",
        "rotationSchedule": {
            "2017": [
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM"
            ],
            "2018": [
                "GIM",
                "EM",
                "SELECTIVE",
                "PLASTICS",
                "GEN SURG",
                "EM(REGINA)",
                "EM",
                "EM",
                "EM(PED)",
                "NEURO",
                "EM",
                "EM",
                "EM"
            ],
            "2019": [
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM"
            ],
            "2020": [
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM",
                "EM"
            ]
        },
        "uploadedData": "2019-07-08T06:00:00.000Z",
        "citeExamScore": {
            "2017": "56",
            "2018": "22, 13"
        },
        "longitudinalSchedule": "",
        "isGraduated": false,
        "oralExamScore": {
            "2018": ""
        },
        "id": "5c36798145cf18296dc91baa"
    },
    {
        "promotedDate": [
            "07/01/2018",
            "07/01/2018",
            "09/18/2018"
        ],
        "ccFeedbackList": [
            {
                "feedback": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                "meetingDate": "06/18/2019",
                "rating": "As Expected"
            },
            {
                "feedback": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                "meetingDate": "09/18/2018",
                "rating": "As Expected"
            },
            {
                "feedback": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                "meetingDate": "12/11/2018",
                "rating": "As Expected"
            },
            {
                "feedback": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                "meetingDate": "03/12/2019",
                "rating": "As Expected"
            }
        ],
        "_id": "5c3679b245cf18296dc91bab",
        "username": "hkc445",
        "fullname": "Ben Doe",
        "currentPhase": "transition-to-practice",
        "programStartDate": "2018-07-01T06:00:00.000Z",
        "rotationSchedule": {
            "2018": [
                "EM",
                "TRAUMA",
                "EM",
                "EM(PED)",
                "EM",
                "PLASTICS",
                "CARDIO",
                "ORTHO",
                "EM",
                "OTHER",
                "OTHER",
                "OTHER",
                "OTHER"
            ],
            "2019": [
                "SELECTIVE",
                "EM",
                "EM",
                "SELECTIVE",
                "OTHER",
                "OTHER",
                "OTHER",
                "OTHER",
                "OTHER",
                "OTHER",
                "OTHER",
                "OTHER",
                "OTHER"
            ]
        },
        "uploadedData": "2019-11-12T06:00:00.000Z",
        "citeExamScore": {
            "2018": "69, 53"
        },
        "longitudinalSchedule": "",
        "isGraduated": false,
        "oralExamScore": {
            "2018": [
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "80"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "90"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "100"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "95"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "100"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "95"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "85"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "80"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "80"
                },
                {
                    "narrative": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt laudantium excepturi aliquid voluptates aut nesciunt nulla dolor quisquam illo deleniti.",
                    "value": "85"
                }
            ]
        },
        "id": "5c3679b245cf18296dc91bab"
    }
];