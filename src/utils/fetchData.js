/*global $ */
import axios from 'axios';

var fetchData = {};

fetchData.getGenomicsData = function(sourceID) {

    return new Promise((resolve, reject) => {

        var datastore = {};

        // get the coordinate file
        axios.get('assets/files/' + sourceID + '_coordinate.gff')
            // process the coordinate file 
            .then((response) => { return {} })
            .catch(() => { resolve({...datastore, trackData: false }); })
    });
}

module.exports = fetchData;