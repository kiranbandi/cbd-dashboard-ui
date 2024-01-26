import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { getAllData } from '../../utils/requestServer';
import toastr from '../../utils/toastr';
import savePagePDF from '../../utils/savePagePDF';
import {
    FacultyFilterPanel, FacultyInfoGroup,
    FacultyRecordTable, FacultyGraphGroup
} from '../';
import Loading from 'react-loading';
import processFacultyRecords from '../../utils/processFacultyRecords';
import infoTooltipReference from '../../utils/infoTooltipReference';

export default class FacultyDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // selected values of the two dropdowns in the filterpanel
            currentRotation: 'ALL',
            currentFaculty: 'ALL',
            sliderValue: 5,
            // lists containing the values in the dropdown
            rotationList: [],
            facultyList: [],
            // list of all resident records
            allResidentRecords: [],
            qualScores: [],
            qualScoreEnabled: false,
            // values of the date period selection
            startDate: '',
            endDate: '',
            dateFilterActive: false,
            isLoaderVisible: false,
            printModeON: false
        };
        this._isMounted = false;
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDateFilterToggle = this.onDateFilterToggle.bind(this);
        this.onRotationSelect = this.onRotationSelect.bind(this);
        this.onFacultySelect = this.onFacultySelect.bind(this);
        this.onPrintClick = this.onPrintClick.bind(this);
        this.selectFaculty = this.selectFaculty.bind(this);
    }

    selectFaculty(event) {
        const currentFaculty = event.target.id.slice(12).split('--').join(' ');
        this.setState({ currentFaculty });
    }

    onPrintClick(event) {

        const { currentFaculty } = this.state,
            isCondensed = event.currentTarget.id.indexOf('condensed') > -1;

        if (currentFaculty != 'ALL') {
            this.setState({ printModeON: true });
            // give a gap of 2 seconds to ensure everything has changed
            // quick hack fix
            setTimeout(() => {
                // move to the top of the page
                window.scrollTo(0, 0);
                let filename = currentFaculty.split(' ').join('_') + '_' + moment().format('DD_MMM') + (isCondensed ? '_Condensed' : '') + '_Export.pdf';
                // once printing is complete reset back to original state
                savePagePDF(filename, isCondensed, false).finally(() => {
                    this._isMounted && this.setState({ printModeON: false });
                });
                // wait a couple of seconds quick hack
            }, 500)
        }

        else {
            toastr["error"]("Please Select a faculty first to export their report", "EXPORT ERROR");
        }
    }

    onSliderChange(sliderValue) {
        this.setState({ sliderValue });
    }

    onDateFilterToggle() {
        this.setState({ dateFilterActive: !this.state.dateFilterActive });
    }

    // when a rotation is selected we update the faculty list
    // so it only has the faculty who graded in that rotation
    onRotationSelect(option) {
        let currentRotation = option.value, { allResidentRecords } = this.state, recordsInRotation = [];

        if (currentRotation == 'ALL') {
            recordsInRotation = allResidentRecords;
        }
        else {
            recordsInRotation = _.filter(allResidentRecords, (d) => d.rotationTag == currentRotation);
        }
        // create a list of all faculty within the records in that rotation
        let facultyList = _.map(_.groupBy(recordsInRotation, (d) => d.observer_name),
            (records, key) => ({ 'label': key })).sort((previous, current) => previous.label.localeCompare(current.label));
        // sub in a value at the front of the list for 'ALL'
        facultyList.unshift({ 'label': 'ALL' });
        this.setState({ currentRotation: option.value, facultyList, currentFaculty: 'ALL' });
    }

    onFacultySelect(option) {
        this.setState({ currentFaculty: option.value });
    }

    onSubmit() {
        const startDate = document.getElementById('faculty-filter-startDate') && document.getElementById('faculty-filter-startDate').value;
        const endDate = document.getElementById('faculty-filter-endDate') && document.getElementById('faculty-filter-endDate').value;
        this.setState({ startDate, endDate });
    }

    componentDidMount() {
        this._isMounted = true;
        // turn loader on
        this.setState({ isLoaderVisible: true });

        const { programInfo } = this.props, { programName = 'Program' } = programInfo;

        let qualScores = [];

        fetch(`/assets/files/sample_${programName}_scores.csv`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }
                else {
                    return response.text();
                }
            })
            .then((response) => {
                qualScores = CSVToArray(response);
            })
            .finally(() => {
                // irrespective of whether qual scores are available or not, proceed with processing the resident records
                getAllData()
                    .then((allResidentRecords) => {
                        let recordsGroupedByRotation = _.groupBy(allResidentRecords, (d) => d.rotationTag);
                        // sub in another category called "ALL" which is essentially all the records 
                        recordsGroupedByRotation['ALL'] = allResidentRecords;
                        // create a list with the name and count of each rotation
                        let rotationList = _.map(recordsGroupedByRotation, (records, key) => ({
                            'label': key,
                            'count': records.length,
                        })).sort((a, b) => b.count - a.count);
                        // create a list of all faculty 
                        let facultyList = _.map(_.groupBy(allResidentRecords, (d) => d.observer_name),
                            (records, key) => ({ 'label': key })).sort((previous, current) => previous.label.localeCompare(current.label));
                        // sub in a value at the front of the list for 'ALL'
                        facultyList.unshift({ 'label': 'ALL' });

                        const qualScoreEnabled = qualScores.length > 0;

                        // set the values on the state 
                        this._isMounted && this.setState({ allResidentRecords, qualScores, qualScoreEnabled, rotationList, facultyList, isLoaderVisible: false });
                    })
                    // toggle loader again once the request completes
                    .catch(() => {
                        console.log("error in fetching all resident records");
                        this._isMounted && this.setState({ allResidentRecords, isLoaderVisible: false });
                    });
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const { rotationList = [], qualScores = [], facultyList = [], allResidentRecords = [],
            startDate, endDate, dateFilterActive, sliderValue,
            printModeON, currentRotation, currentFaculty, qualScoreEnabled = false } = this.state,
            { programInfo } = this.props;

        const processedRecords = processFacultyRecords(allResidentRecords, currentRotation, startDate, endDate, dateFilterActive, sliderValue, programInfo, qualScores),
            currentFacultyRecords = _.filter(processedRecords, (d) => d.faculty_name == currentFaculty);
        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let overallWidth = document.body.getBoundingClientRect().width - 125;

        // quick fix to legacy code 
        // if a faculty name doesnt appear in the processed records remove it also 
        // from the original faculty list
        let facultyWithEnoughRecords = _.map(processedRecords, (d) => d.faculty_name);
        let filteredFacultyList = _.filter(facultyList, (d) => {
            if (d.label == 'ALL') {
                return true;
            }
            else {
                return facultyWithEnoughRecords.indexOf(d.label) > -1;
            }
        });


        return (
            <div className='supervisor-dashboard-container'>
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div>
                        {/* when the content is printing some of on screen elements are rearranged so we hide it by a screen loading banner */}
                        {printModeON &&
                            <div className='on-screen-cover-banner'>
                                <h2 className='text-center m-t-lg text-primary'>Generating PDF Export for {currentFaculty}, Please Wait...</h2>
                            </div>}

                        <FacultyFilterPanel
                            rotationList={rotationList}
                            facultyList={filteredFacultyList}
                            currentRotation={currentRotation}
                            currentFaculty={currentFaculty}
                            dateFilterActive={dateFilterActive}
                            sliderValue={sliderValue}
                            onCheckboxChange={this.onDateFilterToggle}
                            onRotationSelect={this.onRotationSelect}
                            onFacultySelect={this.onFacultySelect}
                            onSliderChange={this.onSliderChange}
                            onSubmit={this.onSubmit} />

                        {/* The contents of this react component will be triggered to the print window */}
                        <div className={printModeON ? 'printable-content m-a' : ''}
                            ref={el => (this.printRef = el)}>
                            <FacultyInfoGroup
                                qualScoreEnabled={qualScoreEnabled}
                                printModeON={printModeON}
                                programInfo={programInfo}
                                width={printModeON ? 1450 : overallWidth}
                                processedRecords={processedRecords}
                                currentFacultyRecords={currentFacultyRecords}
                                dateFilterActive={dateFilterActive}
                                currentFaculty={currentFaculty}
                                currentRotation={currentRotation} />

                            <FacultyGraphGroup
                                qualScoreEnabled={qualScoreEnabled}
                                printModeON={printModeON}
                                width={printModeON ? 1450 : overallWidth}
                                processedRecords={processedRecords}
                                dateFilterActive={dateFilterActive}
                                startDate={startDate}
                                endDate={endDate}
                                selectFaculty={this.selectFaculty}
                                currentFaculty={currentFaculty} />

                            <FacultyRecordTable
                                qualScoreEnabled={qualScoreEnabled}
                                currentFaculty={currentFaculty}
                                width={printModeON ? 1100 : overallWidth}
                                currentFacultyRecords={currentFacultyRecords} />

                        </div>
                        {/* TODO Hiding export buttons because they are broken */}
                        {/* <button
                            id='print-report' className="btn btn-primary print-button partaway"
                            onClick={this.onPrintClick}
                        >
                            <span className="icon icon-download"></span>
                            <span className="icon-label">Report</span>
                            <s-tooltip border-width="1px" orientation="left" max-width="800px" show-delay="1000" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.facultyDevlopment.reportAndCondensedReport}</s-tooltip>
                        </button>
                        <button
                            id='print-report-condensed'
                            className="btn btn-primary print-button"
                            onClick={this.onPrintClick}
                        >
                            <span className="icon icon-download"></span>
                            <span className="icon-label">Condensed Report</span>
                            <s-tooltip border-width="1px" orientation="left" max-width="800px" show-delay="1000" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.facultyDevlopment.reportAndCondensedReport}</s-tooltip>
                        </button> */}
                    </div>}
            </div>);
    }

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