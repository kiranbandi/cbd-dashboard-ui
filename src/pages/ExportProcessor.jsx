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
import { ROTATION_SCHEDULE_MAP } from '../utils/programInfo';
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


        const { fileList = [] } = this.state,
            { rotationList } = this.props.programInfo;

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


                    let p = dataMap.map(d => {
                        return {
                            "username": d['Resident Name'].toLowerCase().split('-').join('-dummy-'),
                            "observation_date": d['Date'],
                            "year_tag": findYearTag(d['Date']),
                            "academic_year": findYear(d['Date']),
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



                    let data_grouped_by_residents = _.groupBy(p, e => e.username);

                    let data_store = [];

                    _.map(_.keys(data_grouped_by_residents), r_username => {

                        let residentData = data_grouped_by_residents[r_username],
                            userInFile = _.find(residentList, (d) => d.username == r_username) || {},
                            { username = '', rotationSchedule = {}, promotedDate = [] } = userInFile;

                        if (username.length > 0) {
                            //  append every record with two tags 
                            // first phase tag is to identify which phase resident was in when the epa was completed
                            // the second tag is the rotation tag to identify which rotation the resident was in
                            _.map(residentData, (record, recordID) => {
                                // get the rotation list for the academic year in which the record lies
                                let rotationScheduleList = ROTATION_SCHEDULE_MAP[record.academic_year];
                                //  find the rotation slot in which the record lies
                                let rotationIndex = _.findIndex(rotationScheduleList, (slotStart, slotIndex) => {
                                    const periodStartDate = moment(slotStart, "DD-MMM-YYYY"),
                                        endingDate = moment(rotationScheduleList[slotIndex + 1], "DD-MMM-YYYY");
                                    return moment(record.observation_date, 'YYYY-MM-DD').isBetween(periodStartDate, endingDate, 'days', '(]');
                                })
                                // find the rotation in which the resident was during that slot
                                let rotationTag = rotationSchedule[record.academic_year] ?
                                    (rotationSchedule[record.academic_year][rotationIndex] ?
                                        rotationSchedule[record.academic_year][rotationIndex] : rotationList[0]) : rotationList[0];
                                let phaseList = ['TTD', 'F', 'CORE', 'TP'], phaseIndex = 0;
                                // code block for assigning phase tag
                                if (promotedDate.length > 0) {
                                    phaseIndex = _.reduce(promotedDate, (accu, dateStamp, dateStampIndex) => {
                                        // datestamp is the date on which the user was promoted to the next phase
                                        // if the record is after the datestamp it means record is in the next phase
                                        if (moment(record.observation_date, 'YYYY-MM-DD').isAfter(moment(dateStamp, 'MM/DD/YYYY'))) {
                                            return dateStampIndex + 1;
                                        }
                                        // if not return the accumulator which has the index of the last matching phase
                                        return accu;
                                    }, 0);
                                }
                                // tag the record with the two tags
                                residentData[recordID]['phaseTag'] = phaseList[phaseIndex];
                                residentData[recordID]['rotationTag'] = rotationTag;
                            });
                        }
                        data_store = data_store.concat(residentData);
                    });
                    window.p = data_store;
                } catch (error) {
                    console.log(error);
                    toastr["error"]("There was an error in processing file - " + file.name, "ERROR");
                }
            }

            var blob = new Blob([JSON.stringify(p)], { type: 'application/json' });
            var timeStamp = (new Date()).toString().split("GMT")[0];
            FileSaver.saveAs(blob, "residentData" + "-" + timeStamp + ".json");

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

function findYear(timeStamp) {
    var year = moment(timeStamp, 'YYYY-MM-DD').year();
    // Jan 1st of the given year
    var startDate = moment('01/01/' + year, 'MM/DD/YYYY');
    // Jun 30th of the same year
    var endDate = moment('06/30/' + year, 'MM/DD/YYYY');
    if (moment(timeStamp, 'YYYY-MM-DD').isBetween(startDate, endDate, 'days', '[]')) {
        return year - 1;
    }
    return year;
}

