import XLSX from 'xlsx';
import _ from 'lodash';
import moment from 'moment';


export default function (rawData, programInfo = {
    programName: ''
}) {
    return new Promise((resolve, reject) => {
        try {

            var workbook = XLSX.read((new Uint8Array(rawData)), {
                type: 'array'
            });
            var dataInRows = XLSX.utils.sheet_to_json(workbook.Sheets['EPA Observations']);
            var narrativeInRows = XLSX.utils.sheet_to_json(workbook.Sheets['Narratives']);
            var dataStore = [];
            var residentName = '';
            var tempEPA = '';

            // Dummy empty source map that is populated on the fly if and when used 
            var epaSourceMap = {
                1: {
                    'topic': 'Transition to Discipline (D)',
                    subRoot: {},
                    maxObservation: {},
                    filterValuesDict: {}
                },
                2: {
                    'topic': 'Foundations of Discipline (F)',
                    subRoot: {},
                    maxObservation: {},
                    filterValuesDict: {}
                },
                3: {
                    'topic': 'Core of Discipline (C)',
                    subRoot: {},
                    maxObservation: {},
                    filterValuesDict: {}
                },
                4: {
                    'topic': 'Transition to Practice (P)',
                    subRoot: {},
                    maxObservation: {},
                    filterValuesDict: {}
                }
            };


            var iteratorIndex = 0;
            var maxLength = dataInRows.length;

            try {
                // Loop through each row one by one
                while (iteratorIndex < maxLength) {

                    var row = dataInRows[iteratorIndex];

                    // consider only non empty rows
                    if (_.keys(row).indexOf('Observation Summary Report') > -1) {
                        var dataInColumnOne = row['Observation Summary Report'];


                        // if the row has the name of the resident store it and then move on
                        if (dataInColumnOne.indexOf('Learner') > -1) {
                            residentName = dataInColumnOne.split(" - ")[1];
                        }
                        // if the row is about the EPA then store the EPA number and move on
                        else if (dataInColumnOne.indexOf('EPA') > -1) {
                            tempEPA = dataInColumnOne.slice(4);
                            // The following piece of code creates a EPA map which can be used 
                            // if the data being uploaded isnt for a resident from the Emergency Medicine Department
                            // Get EPA root identifier
                            var epaRootIdentifier = +tempEPA.split(".")[0];
                            // Set the EPA title
                            epaSourceMap[epaRootIdentifier].subRoot[tempEPA] = row.__EMPTY;
                            // Set the MAX required number of observations
                            // This only works under the assumption that the number following the word Collect has the count
                            // and so might fail if that were not the case
                            var requiredObservations = 0;
                            if (dataInRows[iteratorIndex + 1].__EMPTY.indexOf('Collect') > -1) {
                                requiredObservations = +dataInRows[iteratorIndex + 1].__EMPTY.split('Collect ')[1].split(" ")[0];
                            } else if (dataInRows[iteratorIndex + 1].__EMPTY.indexOf('Collest') > -1) {
                                // special scenario because of typo that occurs when files are created by the portal
                                requiredObservations = +dataInRows[iteratorIndex + 1].__EMPTY.split('Collest ')[1].split(" ")[0];
                            } else {
                                requiredObservations = 1;
                            }
                            // if the value provided is textual instead of being a number 
                            // (again because of issues with the old portal) then simply store it as 10
                            requiredObservations = isNaN(requiredObservations) ? 10 : requiredObservations;
                            epaSourceMap[epaRootIdentifier].maxObservation[tempEPA] = requiredObservations;
                        }
                        // if the row has snapshot in column one 
                        //  then look for the column that has the count of the total
                        // observations if the number is non zero then start adding the 
                        //  rows into the datastore  
                        else if (dataInColumnOne.indexOf('Snapshot') > -1) {
                            // The second column has the count , parse it and  
                            // use it as the ending index for internal loop
                            var lastIndex = iteratorIndex + Number(row['__EMPTY_1'].split('(')[1].slice(0, -1));
                            // if there are no rows to be read in the EPA 
                            // then last index and iterator would be same in that case simply  skip over
                            if (lastIndex != iteratorIndex) {
                                // push iterator by 2 to skip immediately following row which is empty
                                iteratorIndex = iteratorIndex + 2;
                                // intenal loop that repeats observation count times
                                while (iteratorIndex < lastIndex + 2) {

                                    let dataPoint = dataInRows[iteratorIndex],
                                        epaRating,
                                        isDateSlashFormat;

                                    // Set the flag for records that have expired
                                    if (dataPoint.__EMPTY_2.length == 0 && dataPoint.__EMPTY_8 && dataPoint.__EMPTY_8.length > 0) {
                                        // store data of expired records differently , since they have values
                                        // on different columns/keys compared to regular records.

                                        isDateSlashFormat = dataPoint.__EMPTY_8.indexOf('/') > -1;

                                        dataStore.push({
                                            'Date': moment(dataPoint.__EMPTY_8, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD'),
                                            'yearTag': findYearTag(moment(dataPoint.__EMPTY_8, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD')),
                                            'academicYear': findAcademicYear(moment(dataPoint.__EMPTY_8, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD')),
                                            'Resident_Name': residentName,
                                            'EPA': tempEPA,
                                            'Observer_Name': dataPoint.__EMPTY,
                                            'Observer_Type': dataPoint.__EMPTY_1,
                                            'Rating': '',
                                            'Type': '',
                                            'Situation_Context': '',
                                            'Feedback': '',
                                            'Professionalism_Safety': '',
                                            'isExpired': true
                                        });


                                    } else {

                                        switch (dataPoint.__EMPTY_2) {
                                            case "I had to do":
                                                epaRating = 1;
                                                break;
                                            case "I had to talk them through":
                                                epaRating = 2;
                                                break;
                                            case "I needed to prompt":
                                                epaRating = 3;
                                                break;
                                            case "I needed to be there just in case":
                                                epaRating = 4;
                                                break;
                                            case "I didn't need to be there":
                                                epaRating = 5;
                                                break;
                                            default:
                                                epaRating = 1;
                                        }

                                        // Also if the rating is verbal like Achieved or Met then give a 5
                                        if (dataPoint.__EMPTY_2.indexOf('Achieved') > -1 || dataPoint.__EMPTY_2.indexOf('Met') > -1) {
                                            // internal loop increase iteratorIndex
                                            epaRating = 5;
                                        }

                                        // For special assessment EPAs sometimes the EPA rating is simply set as In Progress even
                                        // though its complete so for these , allow them through with a rating of 3.
                                        if (dataPoint.__EMPTY_2.indexOf('In Progress') > -1) {
                                            // internal loop increase iteratorIndex
                                            epaRating = 3;
                                        }

                                        isDateSlashFormat = dataPoint.__EMPTY_7.indexOf('/') > -1;

                                        dataStore.push({
                                            'Date': moment(dataPoint.__EMPTY_7, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD'),
                                            'yearTag': findYearTag(moment(dataPoint.__EMPTY_7, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD')),
                                            'academicYear': findAcademicYear(moment(dataPoint.__EMPTY_7, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD')),
                                            'Resident_Name': residentName,
                                            'EPA': tempEPA,
                                            'Observer_Name': dataPoint.__EMPTY,
                                            'Observer_Type': dataPoint.__EMPTY_1,
                                            'Rating': epaRating,
                                            'Type': dataPoint.__EMPTY_3,
                                            'Situation_Context': dataPoint.__EMPTY_4,
                                            'Feedback': dataPoint.__EMPTY_5,
                                            'Professionalism_Safety': dataPoint.__EMPTY_6,
                                            'isExpired': false
                                        });
                                    }

                                    // internal loop increase iteratorIndex
                                    iteratorIndex += 1;
                                }
                            }
                        }
                        // if the row has the entry "Archived Observations" stop processing the file 
                        // and break the loop by setting the iterator index to the maximum
                        // Except for Anesthesia keep counting the EPAs since for them
                        // correct EPAs have been mistakenly marked as Archived
                        else if (dataInColumnOne.indexOf('Archived Observations') > -1 && programInfo.programName != "ANESTHESIA") {
                            iteratorIndex = maxLength;
                        }
                    }
                    // increase the index count by one
                    iteratorIndex += 1;
                }
            } catch (error) {
                console.log(error);
            }

            resolve({
                'residentName': residentName,
                'data': dataStore,
                'narrativeData': processNarratives(narrativeInRows, residentName),
                epaSourceMap
            });
        } catch (e) {
            reject();
        };
    })
}


function findYearTag(timeStamp) {
    var year = moment(timeStamp, 'YYYY-MM-DD').year();
    // Jan 1st of the given year
    var startDate = moment('01/01/' + year, 'MM/DD/YYYY');
    // Jun 30th of the same year
    var endDate = moment('06/30/' + year, 'MM/DD/YYYY');
    if (moment(timeStamp, 'YYYY-MM-DD').isBetween(startDate, endDate, 'days', '[]')) {
        return year + '-1';
    }
    return year + '-2';
}


function findAcademicYear(timeStamp) {
    var timeObj = moment(timeStamp, 'YYYY-MM-DD');
    // very poor implementation written in under 60 secs 
    // need to replace when I have enough time
    if (timeObj.isBetween(moment('07/01/2018', 'MM/DD/YYYY'), moment('06/30/2019', 'MM/DD/YYYY'), 'days', '[]')) {
        return '2018';
    } else if (timeObj.isBetween(moment('07/01/2019', 'MM/DD/YYYY'), moment('06/30/2020', 'MM/DD/YYYY'), 'days', '[]')) {
        return '2019';
    } else if (timeObj.isBetween(moment('07/01/2020', 'MM/DD/YYYY'), moment('06/30/2021', 'MM/DD/YYYY'), 'days', '[]')) {
        return '2020';
    } else if (timeObj.isBetween(moment('07/01/2021', 'MM/DD/YYYY'), moment('06/30/2022', 'MM/DD/YYYY'), 'days', '[]')) {
        return '2021';
    } else if (timeObj.isBetween(moment('07/01/2022', 'MM/DD/YYYY'), moment('06/30/2023', 'MM/DD/YYYY'), 'days', '[]')) {
        return '2022';
    } else if (timeObj.isBetween(moment('07/01/2023', 'MM/DD/YYYY'), moment('06/30/2024', 'MM/DD/YYYY'), 'days', '[]')) {
        return '2023';
    }
    return '2024';
}


function processNarratives(narrativeInRows, residentName) {

    let iteratorIndex = 0,
        maxLength = narrativeInRows.length,
        narrativeStore = [];

    // Loop through each row one by one
    while (iteratorIndex < maxLength) {

        let dataPoint = narrativeInRows[iteratorIndex];

        try {
            // consider only non empty rows , rows which have date of completion 
            //  and also ignore the row with the names of the columns 
            if (_.keys(dataPoint).indexOf('__EMPTY_5') > -1 && dataPoint['__EMPTY_5'] != 'Date of Completion') {

                const isDateSlashFormat = dataPoint['__EMPTY_5'].indexOf('/') > -1;

                narrativeStore.push({
                    'resident_name': residentName,
                    'observer_name': dataPoint['__EMPTY'],
                    'observer_type': dataPoint['__EMPTY_1'],
                    'feedback': dataPoint['__EMPTY_2'],
                    'professionalism_safety': dataPoint['__EMPTY_3'],
                    'observation_date': moment(dataPoint.__EMPTY_4, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD'),
                    'completion_date': moment(dataPoint.__EMPTY_5, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD'),
                    'year_tag': findYearTag(moment(dataPoint.__EMPTY_4, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD'))
                });
            }

        } catch (error) {
            console.log('error processing naratives');
            return [];
        }
        // increase the index count by one
        iteratorIndex += 1;

    }
    return narrativeStore;
}