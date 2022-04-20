// xlsx parsing library is globally loaded as variable XLSX in the php code - to reduce bundle size.
import _ from 'lodash';
import moment from 'moment';

export default function (rawData, academic_year) {

    return new Promise((resolve, reject) => {
        try {

            var workbook = XLSX.read((new Uint8Array(rawData)), {
                type: 'array'
            }),
                dataInRows = XLSX.utils.sheet_to_json(workbook.Sheets['Rot List']);

            let iteratorIndex = 0,
                maxLength = dataInRows.length,
                store = [];
            // Loop through each row one by one
            while (iteratorIndex < maxLength) {
                let dataPoint = dataInRows[iteratorIndex];
                try {
                    // consider only non empty rows , rows which have rotation name
                    //  and also ignore the row with the names of the columns 
                    if (_.keys(dataPoint).indexOf('__EMPTY_8') > -1 && dataPoint['__EMPTY_8'] != 'rotation_name') {
                        store.push({
                            'student_number': dataPoint['__EMPTY_2'],
                            'schedule_group': dataPoint['__EMPTY_6'] || '',
                            'rotation_abbrev': dataPoint['__EMPTY_7'] || '',
                            'rotation_name': dataPoint['__EMPTY_8'] || '',
                            'start_date': dataPoint['__EMPTY_12'] || '',
                            'end_date': dataPoint['__EMPTY_13'] || '',
                            'site': dataPoint['__EMPTY_24'] || '',
                            'service': dataPoint['__EMPTY_25'] || '',
                            academic_year
                        });
                    }
                } catch (error) {
                    alert('error processing one45 File');
                }
                // increase the index count by one
                iteratorIndex += 1;
            }
            // Filter out records that dont fall in the given academic year
            let rotationData = _.filter(store, (d) => +d.academic_year == findYearTag(d.start_date));
            resolve({ rotationData });
        } catch (e) { reject() };
    })
}


function findYearTag(timeStamp) {
    let year = moment(timeStamp, 'YYYY-MM-DD').year();
    // Jan 1st of the given year
    var startDate = moment('01/01/' + year, 'MM/DD/YYYY');
    // Jun 30th of the same year
    var endDate = moment('06/30/' + year, 'MM/DD/YYYY');
    if (moment(timeStamp, 'YYYY-MM-DD').isBetween(startDate, endDate, 'days', '[]')) {
        return year - 1;
    }
    return year;
}



