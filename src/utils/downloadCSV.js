import _ from 'lodash';

export default function() {
    var { rcmData = [] } = window.emCBD;
    // Escaping strings in quotes to evade fuckery because of
    // commas within the strings that can cause the csv file 
    // format to be changed
    var convertedData = _.map(rcmData, (dataPoint) => {
        return _.map(dataPoint, (value) => {
            if (typeof(value) == 'string') {
                //  quick fix hashes seem to be breaking the code so we will replace them with enclosed text of hash
                if (value.indexOf("#") > -1) {
                    value = value.split("#").join("-hash-");
                }
                return '"' + value.split('"').join('""') + '"';
            } else return '"' + value + '"';
        }).join(',');
    });

    debugger;

    // Add file headers to top of the file
    convertedData.unshift(['Date', 'Resident Name', 'EPA', 'Observer Name', 'Observer Type', 'Rating', 'Type', 'Situation Context', 'Feedback', 'Professionalism Safety', 'EPA Expired']);
    var csvContent = "data:text/csv;charset=utf-8," + convertedData.join("\n"),
        encodedUri = encodeURI(csvContent),
        link = document.createElement("a"),
        timeStamp = (new Date()).toString().split("GMT")[0];
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", 'rcm-data' + "-" + timeStamp + ".csv");
    link.click();
}