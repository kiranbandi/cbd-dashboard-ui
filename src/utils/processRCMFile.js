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

            var iteratorIndex = 0;
            var maxLength = dataInRows.length;

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
                        debugger;
                    }
                    // if the row has snapshot in column one 
                    //  then look for the column that has the count of the total
                    // observations if the number is non zero then start adding the 
                    //  rows into the datastore  
                    else if (dataInColumnOne.indexOf('Snapshot') > -1) {
                        // The second column has the count , parse it and  
                        // use it as the ending index for internal loop
                        var lastIndex = iteratorIndex + Number(row['__EMPTY'].split('(')[1].slice(0, -1));
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
            resolve(dataStore);
        } catch (e) {
            reject();
        };
    })
}