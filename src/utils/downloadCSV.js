import _ from 'lodash';

export default function() {
    var { rcmData = [] } = window.emCBD;
    // Escaping strings in quotes to evade fuckery because of
    // commas within the strings that can cause the csv file 
    // format to be changed
    var convertedData = _.map(rcmData, (dataPoint) => {
        return _.map(dataPoint, (value) => {
            if (typeof(value) == 'string') {
                return '"' + value.split('"').join('""') + '"';
            } else return '"' + value + '"';
        }).join(',');
    });

    // Add file headers to top of the file
    convertedData.unshift(['Date', 'Resident_Name', 'EPA', 'Observer_Name', 'Observer_Type', 'Rating', 'Type', 'Situation Context', 'Feedback', 'Professionalism_Safety']);
    var csvContent = "data:text/csv;charset=utf-8," + convertedData.join("\n"),
        encodedUri = encodeURI(csvContent),
        link = document.createElement("a"),
        timeStamp = (new Date()).toString().split("GMT")[0];
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", 'rcm-data' + "-" + timeStamp + ".csv");
    link.click();
}