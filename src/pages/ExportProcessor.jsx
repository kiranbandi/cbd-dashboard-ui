import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getFileByPath from '../utils/getFileByPath';
import { setResidentData, setProgramInfo, setResidentFilter, setNarrativeData, setResidentList } from '../redux/actions/actions';
import toastr from '../utils/toastr';
import Loading from 'react-loading';
import moment from 'moment';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import FileSaver from 'file-saver';
import residentList from '../utils/randomData/residentList';
class ExportProcessor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            dataReady: false,
            epaSourceMap: false,
            program: '',
            fileList: [],
            dataStore: {}
        }
        this.onProcessFile = this.onProcessFile.bind(this);
    }


    async onProcessFile() {

        event.preventDefault();


        const { fileList = [] } = this.state;

        let store = [];

        if (fileList.length > 0) {
            // turn on file processing loader
            this.setState({ processing: true, dataReady: false });
            // Process each uploaded file seperately
            for (const [fileIndex, file] of fileList.entries()) {
                try {

                    // First get the file by its file path
                    const fileContents = await getFileByPath(file, true),
                        allLines = CSVToArray(fileContents.trim()),
                        dataMap = allLines.slice(1).map((d) => {
                            return {
                                'Date': d[0],
                                'Resident Name': 'resident-' + d[1],
                                'EPA': d[2],
                                'Observer Name': 'observer-' + d[3],
                                'Observer Type': d[4],
                                'Rating': d[5],
                                'Type': d[6],
                                'Situation Context': d[7],
                                'Feedback': d[8],
                                'Professionalism Safety': d[9],
                                'EPA Expired': d[10]
                            }
                        });


                    console.log(residentList);

                    let p = dataMap.map(d => {

                        return {
                            "username": d['Resident Name'].toLowerCase().split('-').join('-dummy-'),
                            "observation_date": d['Date'],
                            "year_tag": findYearTag(d['Date']),
                            "epa": d['EPA'],
                            "feedback": d['Feedback'],
                            "observer_name": d['Observer Name'],
                            "observer_type": d['Observer Type'],
                            "professionalism_safety": d['Professionalism Safety'],
                            "rating": d['Rating'],
                            "resident_name": d['Resident Name'],
                            "situation_context": d['Situation Context'],
                            "type": d['Type'],
                            "isExpired": d['EPA Expired'] == 'TRUE',
                            "phaseTag": "F",
                            "rotationTag": "EM",
                            "program": "EM"
                        };
                    });
                    window.p = p;

                } catch (error) {
                    console.log(error);
                    toastr["error"]("There was an error in processing file - " + file.name, "ERROR");
                }
            }


            // var blob = new Blob([JSON.stringify(p)], { type: 'application/json' });
            // var timeStamp = (new Date()).toString().split("GMT")[0];
            // FileSaver.saveAs(blob, "residentData" + "-" + timeStamp + ".json");

            // turn the loader off and set the process status 
            this.setState({ processing: false });
        }
    }

    render() {
        const { processing, fileList = [] } = this.state;

        return (
            <div className='tools-root m-t text-xs-left text-sm-left m-b-lg' >
                <div className='container'>
                    <Dropzone onDrop={fileList => this.setState({ fileList })}>
                        {({ getRootProps, getInputProps }) => (
                            <section className='dropzone-container'>
                                <div className='dropzone' {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop files here</p>
                                    {fileList.length > 0 && <h4 className='text-info'>{fileList.length} {fileList.length == 1 ? 'file' : 'files'} added</h4>}
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <button className="btn btn-primary-outline m-t process-btn" onClick={this.onProcessFile}>
                        <span className='process-span'>{"PROCESS FILES"} </span>
                        {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        programInfo: state.oracle.programInfo,
        residentFilter: state.oracle.residentFilter,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setResidentData,
            setProgramInfo,
            setResidentFilter,
            setResidentList,
            setNarrativeData
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportProcessor);


function mapRating(r = '') {

    const rating = r.split("\n\nComments")[0];

    if (rating.indexOf('I had to do') > -1) {
        return 1;
    }
    else if (rating.indexOf('I had to talk them through') > -1) {
        return 2;
    }
    else if (rating.indexOf('I needed to prompt') > -1) {
        return 3;
    }
    else if (rating.indexOf('I needed to be there just') > -1) {
        return 4;
    }
    else if (rating.indexOf("I didn't need to be") > -1) {
        return 5;
    }
    else if (rating.indexOf("I did not need to be") > -1) {
        return 5;
    }
    else {
        return rating;
    }
}

function constructFeedback(rating = '', nextSteps = '') {
    const comments = rating.split("\n\nComments: \n")[1];

    return (comments || '') + nextSteps;
}


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

function findYearTag(timeStamp) {
    var year = moment(timeStamp, 'YYYY-MM-DD').year();
    // Jan 1st of the given year
    var startDate = moment('01/01/' + year, 'MM/DD/YYYY');
    // Jun 30th of the same year
    var endDate = moment('06/30/' + year, 'MM/DD/YYYY');
    if (moment(timeStamp, 'YYYY-MM-DD').isBetween(startDate, endDate, 'days', '[]')) {
        return year + '-1';
    }
    return year + '-2';
}