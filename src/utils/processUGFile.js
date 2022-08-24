import _ from 'lodash';
import moment from 'moment';

export default function (rawData, residentList) {

    return new Promise((resolve, reject) => {
        try {
            // parse the csv file and remove empty entries
            let records = _.filter(CSVToArray(rawData, ','), (d) => d.length == '12');
            let studentRecords = [],
                unmappedList = [];
            // remove the 1st head row ,as it contains column names, 
            // from the records list and then start processing it
            // remove spaces and convert to lowercase for uniformity
            _.filter(records.slice(1), (d) => d[3].indexOf('usask.ca') > -1)
                .map((row) => {
                    let rating = row[7].toLowerCase().trim(),
                        resident_name = (row[1].trim() + " " + row[2].trim()).toLowerCase().trim(),
                        username = '',
                        year_tag = '';
                    // if a resident has an email that doesnt match the @mail.usask.ca format
                    // then search them from the resident list by their full and
                    // assign a username
                    // if the student doesnt exist then skip them and add their name 
                    // to the unmapped list 
                    if (row[3].includes('mail')) {
                        username = row[3].trim().slice(0, 6).toLowerCase().trim();
                    } else if (row[3].includes('.')) {
                        let residentNameFromMailEntry = row[3]
                            // removes trailing @mail.usask.ca
                            .slice(0, -9)
                            // remove '.' and makes everything lower case 
                            .toLowerCase().trim().split('.').join(' '),
                            matchedStudent = _.find(residentList, (d) => d.fullname.toLowerCase().trim() == residentNameFromMailEntry);
                        if (matchedStudent && matchedStudent.username) {
                            username = matchedStudent.username;
                        }
                    }
                    // if we have a residents username
                    // we look for their corresponding cohort and tag it
                    // if a resident doesnt have a profile then we add them to the unmapped list 
                    if (username.length > 0) {
                        const matchedStudentByUsername = _.find(residentList, (d) => d.username == username);
                        year_tag = matchedStudentByUsername ? matchedStudentByUsername.currentPhase : '';
                    }
                    if (username && year_tag) {
                        studentRecords.push({
                            'epa': Number(row[0].slice(3)),
                            'resident_name': resident_name,
                            username,
                            'observer_name': row[4].trim(),
                            'observation_date': moment(row[5].trim()).format('YYYY-MM-DD'),
                            'observer_type': '',
                            year_tag,
                            'rating': rating == 'low' ? 1 : rating == 'high' ? 3 : 2,
                            'rotationTag': row[8].toLowerCase().trim(),
                            'feedback': row[9].trim(),
                            // patient type is rewritten under situation_context
                            'situation_context': row[10].toLowerCase().trim(),
                            // admission type is rewritten under professionalism_safety
                            'professionalism_safety': row[11].toLowerCase().trim(),
                            // using type to distinguish app,one45 and paper records
                            'type': 'app'
                        })
                    } else {
                        unmappedList.push(resident_name);
                    }
                });
            resolve({ studentRecords, 'unmapped': _.uniq(unmappedList) });
        } catch (e) {
            reject();
        };
    })
}



// https: //stackoverflow.com/questions/36288375/how-to-parse-csv-data-that-contains-newlines-in-field-using-javascript

function CSVToArray(CSV_string, delimiter) {
    delimiter = (delimiter || ","); // user-supplied delimeter or default comma

    var pattern = new RegExp( // regular expression to parse the CSV values.
        ( // Delimiters:
            "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + delimiter + "\\r\\n]*))"
        ), "gi"
    );

    var rows = [
        []
    ]; // array to hold our data. First row is column headers.
    // array to hold our individual pattern matching groups:
    var matches = false; // false if we don't find any matches
    // Loop until we no longer find a regular expression match
    while (matches = pattern.exec(CSV_string)) {
        var matched_delimiter = matches[1]; // Get the matched delimiter
        // Check if the delimiter has a length (and is not the start of string)
        // and if it matches field delimiter. If not, it is a row delimiter.
        if (matched_delimiter.length && matched_delimiter !== delimiter) {
            // Since this is a new row of data, add an empty row to the array.
            rows.push([]);
        }
        var matched_value;
        // Once we have eliminated the delimiter, check to see
        // what kind of value was captured (quoted or unquoted):
        if (matches[2]) { // found quoted value. unescape any double quotes.
            matched_value = matches[2].replace(
                new RegExp("\"\"", "g"), "\""
            );
        } else { // found a non-quoted value
            matched_value = matches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        rows[rows.length - 1].push(matched_value);
    }
    return rows; // Return the parsed data Array
}