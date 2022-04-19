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

class ElentraProcessor extends Component {

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

    componentDidMount() {
        // On this tab make residentData null so that it doesnt interfere with data from the other tabs
        this.props.actions.setResidentData(null);
    }

    componentWillUnmount() {
        //When moving out of the tab force reload the page to avoid side effects from this page to main dashboard
        location.reload();
    }


    async onProcessFile() {

        event.preventDefault();
        // clear data in the dashboard 
        this.props.actions.setResidentList([]);
        this.props.actions.setNarrativeData([]);
        this.props.actions.setResidentData(null);

        const { fileList = [] } = this.state;

        let store = [];

        if (fileList.length > 0) {
            // turn on file processing loader
            this.setState({ processing: true, dataReady: false });
            // Process each uploaded file seperately
            for (const [fileIndex, file] of fileList.entries()) {
                try {
                    // First get the file by its file path
                    const fileContents = await getFileByPath(file, true);

                    const allLines = CSVToArray(fileContents),
                        epaCode = allLines[2][1].slice(0, 3).trim(),
                        columnHeadersIndex = allLines[3].length > 4 ? 3 : 4,
                        indices = allLines[columnHeadersIndex],
                        dataLines = allLines.slice(columnHeadersIndex, allLines.length),
                        dateIndex = _.findIndex(indices, (d) => d.indexOf('Date Completed') > -1),
                        lastUpdatedBy = _.findIndex(indices, (d) => d.indexOf('Last Updated By') > -1),
                        rating = _.findIndex(indices, (d) => d.indexOf('Based on this') > -1),
                        safety = _.findIndex(indices, (d) => d.indexOf('patient safety concerns') > -1),
                        professionalism = _.findIndex(indices, (d) => d.indexOf('professionalism concerns') > -1),
                        nextSteps = _.findIndex(indices, (d) => d.indexOf('Next Steps') > -1);


                    let data = _.map(_.filter(dataLines, e => e[7] == 'complete'), (d) => {

                        const date = moment(d[dateIndex], 'YY-MM-DD').format('YYYY-MM-DD'),
                            residentName = _.reverse(d[1].split(',')).join(" "),
                            epa_code = epaCode,
                            observerName = d[2],
                            observerType = 'faculty',
                            ratings = mapRating(d[rating]),
                            type = '',
                            situationContext = d.slice(lastUpdatedBy + 1, rating).join(', '),
                            feedback = constructFeedback(d[rating], d[nextSteps]),
                            safetyConcerns = (d[safety] || '') + ' ' + (d[professionalism] || ''),
                            expired = false;

                        return [date, residentName, epa_code, observerName, observerType, ratings, type, situationContext, feedback, safetyConcerns, expired];
                    });

                    store = store.concat(data);


                } catch (error) {
                    console.log(error);
                    toastr["error"]("There was an error in processing file - " + file.name, "ERROR");
                }
            }

            const columnNames = ['Date', 'Resident Name', 'EPA', 'Observer Name', 'Observer Type', 'Rating', 'Type', 'Situation Context', 'Feedback', 'Professionalism Safety', 'EPA Expired'];
            // Escaping strings in quotes to evade fuckery because of
            // commas within the strings that can cause the csv file 
            // format to be changed
            var convertedData = _.map(store, (dataPoint) => {
                return _.map(dataPoint, (value) => {
                    if (typeof (value) == 'string') {
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
            var blob = new Blob([convertedData.join("\n")], { type: "text/csv;charset=utf-8" });
            var timeStamp = (new Date()).toString().split("GMT")[0];
            FileSaver.saveAs(blob, "rcm-data" + "-" + timeStamp + ".csv");



            // turn the loader off and set the process status 
            this.setState({ processing: false });
        }
    }

    render() {
        const { processing, fileList = [] } = this.state;

        return (
            <div className='tools-root m-t text-xs-left text-sm-left m-b-lg' >
                <div className='container'>
                    <h2 className='text-left text-primary text-center'>Elentra Export Processor</h2>
                    <p className='upload-text-box'> This is a online toolkit designed to merge and process Elentra export files (Assessment Tool Data Extract Tool) into a more manageable format.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ElentraProcessor);


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