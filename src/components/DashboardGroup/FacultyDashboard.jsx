import React, { Component } from 'react';
import _ from 'lodash';
import { getAllData } from '../../utils/requestServer';
import savePagePDF from '../../utils/savePagePDF';
import { FacultyFilterPanel, FacultyInfoGroup, FacultyRecordTable, FacultyGraphGroup } from '../';
import Loading from 'react-loading';
import processFacultyRecords from '../../utils/processFacultyRecords';

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
    }

    onPrintClick() {

        this.setState({ printModeON: true });
        // give a gap of 2 seconds to ensure everything has changed
        // quick hack fix
        setTimeout(() => {
            // once printing is complete reset back to original state
            savePagePDF().finally(() => {
                this._isMounted && this.setState({ printModeON: false });
            });
        }, 10)
    }

    onSliderChange(sliderValue) {
        this.setState({ sliderValue });
    }

    onDateFilterToggle() {
        this.setState({ dateFilterActive: !this.state.dateFilterActive });
    }

    // when a rotation is selected we update the faculty list
    // so it only has the faculties who graded in that rotation
    onRotationSelect(option) {
        let currentRotation = option.value, { allResidentRecords } = this.state, recordsInRotation = [];

        if (currentRotation == 'ALL') {
            recordsInRotation = allResidentRecords;
        }
        else {
            recordsInRotation = _.filter(allResidentRecords, (d) => d.rotationTag == currentRotation);
        }
        // create a list of all faculties within the records in that rotation
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
                // create a list of all faculties 
                let facultyList = _.map(_.groupBy(allResidentRecords, (d) => d.observer_name),
                    (records, key) => ({ 'label': key })).sort((previous, current) => previous.label.localeCompare(current.label));
                // sub in a value at the front of the list for 'ALL'
                facultyList.unshift({ 'label': 'ALL' });
                // set the values on the state 
                this._isMounted && this.setState({ allResidentRecords, rotationList, facultyList, isLoaderVisible: false });
            })
            // toggle loader again once the request completes
            .catch(() => {
                console.log("error in fetching all resident records");
                this._isMounted && this.setState({ allResidentRecords, isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const { rotationList = [], facultyList = [], allResidentRecords = [],
            startDate, endDate, dateFilterActive, sliderValue,
            printModeON, currentRotation, currentFaculty } = this.state;

        const processedRecords = processFacultyRecords(allResidentRecords, currentRotation, startDate, endDate, dateFilterActive, sliderValue),
            currentFacultyRecords = _.filter(processedRecords, (d) => d.faculty_name == currentFaculty);
        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let overallWidth = document.body.getBoundingClientRect().width - 125;

        // quick fix to legacy code 
        // if a faculty name doesnt appear in the processed records remove it also 
        // from the original faculty list
        let facultiesWithEnoughRecords = _.map(processedRecords, (d) => d.faculty_name);
        let filteredFacultyList = _.filter(facultyList, (d) => {
            if (d.label == 'ALL') {
                return true;
            }
            else {
                return facultiesWithEnoughRecords.indexOf(d.label) > -1;
            }
        });

        // if print mode is on we reset the width to a standard width of 1000px
        if (printModeON) {
            overallWidth = 1450;
        }


        return (
            <div className='supervisor-dashboard-container'>


                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div>
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
                        <div className={printModeON ? 'printable-content m-a' : 'printable-content'}
                            ref={el => (this.printRef = el)}>
                            <FacultyInfoGroup
                                printModeON={printModeON}
                                width={overallWidth}
                                processedRecords={processedRecords}
                                currentFacultyRecords={currentFacultyRecords}
                                dateFilterActive={dateFilterActive}
                                currentFaculty={currentFaculty}
                                currentRotation={currentRotation} />

                            <FacultyGraphGroup
                                printModeON={printModeON}
                                width={overallWidth}
                                processedRecords={processedRecords}
                                dateFilterActive={dateFilterActive}
                                startDate={startDate}
                                endDate={endDate}
                                currentFaculty={currentFaculty} />

                            <FacultyRecordTable
                                currentFaculty={currentFaculty}
                                width={printModeON ? '725' : overallWidth}
                                currentFacultyRecords={currentFacultyRecords} />
                        </div>
                        {currentFaculty != 'ALL' &&
                            <div className='text-xs-left button-box'>
                                <button className="btn btn-primary print-button" onClick={this.onPrintClick}>
                                    <span className="icon icon-download"></span>
                                </button>
                            </div>}
                    </div>}
            </div>);
    }

}
