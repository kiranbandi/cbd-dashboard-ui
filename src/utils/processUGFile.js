import _ from 'lodash';
import moment from 'moment';

export default function(rawData) {

    return new Promise((resolve, reject) => {
        try {

            // parse the csv file and remove empty entries
            let records = _.filter(CSVToArray(rawData, ','), (d) => d.length == '12');
            // remove the 1st head row ,as it contains column names, 
            // from the records list and then start processing it
            // remove spaces and convert to lowercase for uniformity
            const studentRecords = _.filter(records.slice(1), (d) => d[3].indexOf('@mail.usask.ca') > -1)
                .map((row) => {

                    const rating = row[7].toLowerCase().trim();

                    return {
                        'epa': Number(row[0].slice(3)),
                        'resident_name': (row[1] + " " + row[2]).toLowerCase().trim(),
                        'username': row[3].slice(0, 6).toLowerCase().trim(),
                        'observer_name': row[4].toLowerCase().trim(),
                        'observation_date': row[6].slice(0, 10),
                        'observer_type': '',
                        'rating': rating == 'low' ? 1 : rating == 'high' ? 3 : 2,
                        'rotationTag': setRotation(row[8].toLowerCase().trim()),
                        'feedback': row[9].toLowerCase().trim(),
                        // patient type is rewritten under situation_context
                        'situation_context': row[10].toLowerCase().trim(),
                        // admission type is rewritten under professionalism_safety
                        'professionalism_safety': row[11].toLowerCase().trim()
                    };
                });

            const studentList = _.map(_.groupBy(studentRecords, (d) => d.username), (records, username) => {
                return { username, name: records[0].resident_name, records };
            }).sort((a, b) => a.username.localeCompare(b.username));

            resolve({ studentRecords, studentList });

        } catch (e) {
            reject();
        };
    })
}




function setRotation(rotation) {

    let tag = '';

    switch (rotation) {
        case "family medicine":
            tag = 'FAMILY';
            break;
        case "electives":
            tag = 'ELECTIVE';
            break;
        case "obstetrics and gynecology":
            tag = 'OBS/GYN';
            break;
        case "selectives":
            tag = "SELECTIVE";
            break;
        case "psychiatry":
            tag = 'PSYCH';
            break;
        case "pediatrics":
            tag = 'PED';
            break;
        case "surgery":
            tag = 'GSX';
            break;
        case "internal medicine":
            tag = 'IM/SURG';
            break;
        case "emergency medicine":
            tag = 'EM/ANES';
            break;
        case "anaesthesia":
            tag = 'EM/ANES';
            break;
        default:
            tag = 'EM/ANES';
    }

    return tag;


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