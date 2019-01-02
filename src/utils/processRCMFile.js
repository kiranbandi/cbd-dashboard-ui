import toastr from './toastr';
import XLSX from 'xlsx';
import _ from 'lodash';

export default function(rawData) {
    return new Promise((resolve, reject) => {
        try {

            var workbook = XLSX.read((new Uint8Array(rawData)), { type: 'array' });
            var dataInRows = XLSX.utils.sheet_to_json(workbook.Sheets.Report);
            // Empty store that will be populated with the data
            // the first row contains the column names
            var dataStore = [
                ['Date', 'Resident_Name', 'EPA', 'Observer_Name', 'Observer_Type', 'Rating', 'Type', 'Situation', 'Feedback', 'Professionalism_Safety']
            ];
            var residentName = '';
            var tempEPA = '';

            var a = 0;


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
                    }
                    // if the row has snapshot in column one 
                    //  then look for the column that has the count of the total
                    // observations if the number is non zero then start adding the 
                    //  rows into the datastore  
                    else if (dataInColumnOne.indexOf('Snapshot') > -1) {

                        // The second column has the count , parse it 
                        var observationCount = +row['__EMPTY'].split('(')[1].slice(0, -1);
                        a = a + observationCount;



                    }

                }

                // increase the index count by one
                iteratorIndex += 1;
            }


            console.log(a);

        } catch (e) {
            reject();
        };
    })
}