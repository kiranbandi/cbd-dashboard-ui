import _ from 'lodash';
import FileSaver from 'file-saver'

export default function(columnNames = ['Date', 'Resident Name', 'EPA', 'Observer Name', 'Observer Type', 'Rating', 'Type', 'Situation Context', 'Feedback', 'Professionalism Safety', 'EPA Expired']) {
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

    // Add file headers to top of the file
    convertedData.unshift(columnNames);
    var blob = new Blob(["\ufeff"+convertedData.join("\n")], { type: "text/csv;charset=utf-8" });
    var timeStamp = (new Date()).toString().split("GMT")[0];
    FileSaver.saveAs(blob, "rcm-data" + "-" + timeStamp + ".csv");
}