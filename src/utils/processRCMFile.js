import toastr from './toastr';
import XLSX from 'xlsx';
import _ from 'lodash';
import moment from 'moment';


export default function(rawData) {
    return new Promise((resolve, reject) => {
        try {

            var workbook = XLSX.read((new Uint8Array(rawData)), { type: 'array' });
            var dataInRows = XLSX.utils.sheet_to_json(workbook.Sheets.Report);
            var dataStore = [];
            var residentName = '';
            var tempEPA = '';

            // Dummy empty source map that is populated on the fly if and when used 
            var epaSourceMap = {
                1: {
                    'topic': 'Transition to Discipline (D)',
                    subRoot: {},
                    maxObservation: {}
                },
                2: {
                    'topic': 'Foundations of Discipline (F)',
                    subRoot: {},
                    maxObservation: {}
                },
                3: {
                    'topic': 'Core of Discipline (C)',
                    subRoot: {},
                    maxObservation: {}
                },
                4: {
                    'topic': 'Transition to Practice (P)',
                    subRoot: {},
                    maxObservation: {}
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
                            } else {
                                // special scenario because of typo that occurs when files are created by the portal
                                requiredObservations = +dataInRows[iteratorIndex + 1].__EMPTY.split('Collest ')[1].split(" ")[0];
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
                            // push iterator by 2 to skip immediately following row which is empty
                            iteratorIndex = iteratorIndex + 2;
                            // intenal loop that repeats observation count times
                            while (iteratorIndex < lastIndex + 2) {

                                let dataPoint = dataInRows[iteratorIndex];
                                let epaRating;

                                // Skip records that are in progress
                                if (dataPoint.__EMPTY_2 == 'In Progress') {
                                    // internal loop increase iteratorIndex
                                    iteratorIndex += 1;
                                    continue;
                                }

                                // Skip records that have expired - quick fix on 3.3.19
                                if (dataPoint.__EMPTY_2.length == 0 && dataPoint.__EMPTY_8 && dataPoint.__EMPTY_8.length > 0) {
                                    // internal loop increase iteratorIndex
                                    iteratorIndex += 1;
                                    continue;
                                }

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

                                var isDateSlashFormat = dataPoint.__EMPTY_7.indexOf('/') > -1;

                                dataStore.push({
                                    'Date': moment(dataPoint.__EMPTY_7, isDateSlashFormat ? 'MM/DD/YYYY' : 'MM-DD-YY').format('YYYY-MM-DD'),
                                    'Resident_Name': residentName,
                                    'EPA': tempEPA,
                                    'Observer_Name': dataPoint.__EMPTY,
                                    'Observer_Type': dataPoint.__EMPTY_1,
                                    'Rating': epaRating,
                                    'Type': dataPoint.__EMPTY_3,
                                    'Situation_Context': dataPoint.__EMPTY_4,
                                    'Feedback': dataPoint.__EMPTY_5,
                                    'Professionalism_Safety': dataPoint.__EMPTY_6
                                });
                                // internal loop increase iteratorIndex
                                iteratorIndex += 1;
                            }
                        }
                    }
                    // increase the index count by one
                    iteratorIndex += 1;
                }
            } catch (error) {
                console.log(error);
            }
            resolve({ 'data': dataStore, epaSourceMap });
        } catch (e) {
            reject();
        };
    })
}