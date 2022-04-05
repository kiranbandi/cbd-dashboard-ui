import React, { Component } from 'react';
import _ from 'lodash';
import { getAllData } from '../../utils/requestServer';
import ReactSelect from 'react-select';
import processFacultyMap from '../../utils/processors/processFacultyMap';
import {
    FacultyFilterPanel, FacultyInfoGroup,
    FacultyRecordTable, FacultyGraphGroup, FacultyExpiredRecordTable
} from '../';
import { currentAcademicYear, possibleAcademicYears } from '../../utils/getAcademicYears';

export default class FacultyDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFaculty: 'ALL',
            currentFacultyGroup: 'ALL',
            currentDepartment: 'ALL',
            facultyList: [],
            facultyGroupList: [],
            departmentList: [],
            courseName: '',
            // list of all resident records
            allResidentRecords: [],
            isLoaderVisible: false,
            academicYear: currentAcademicYear
        };
        this._isMounted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFacultyClick = (event) => { this.setState({ 'currentFaculty': event.target.id.slice(12).split('--').join(' ') }) }
    onFacultySelect = (option) => { this.setState({ currentFaculty: option.value }) }
    onCurrentFacultyGroupSelect = (option) => { this.setState({ currentFacultyGroup: option.value }) }
    onCurrentDepartmentSelect = (option) => { this.setState({ currentDepartment: option.value }) }

    onSelectAcademicYear = (academicYear) => { this.setState({ academicYear }) };

    async onSubmit() {
        const { academicYear } = this.state;
        // turn loader on
        this.setState({ isLoaderVisible: true });
        getAllData('faculty', academicYear.value)
            .then(({ allResidentRecords, facultyList, departmentList, facultyGroupList, courseName }) => {
                // set the values on the state 
                this._isMounted && this.setState({
                    allResidentRecords,
                    facultyList,
                    facultyGroupList,
                    departmentList,
                    courseName,
                    currentFaculty: 'ALL',
                    currentFacultyGroup: 'ALL',
                    currentDepartment: 'ALL',
                    isLoaderVisible: false
                });
            })
            // toggle loader again once the request completes
            .catch(() => {
                console.log("error in fetching all resident records");
                this._isMounted && this.setState({
                    allResidentRecords: [],
                    facultyList: [],
                    facultyGroupList: [],
                    departmentList: [],
                    currentFaculty: 'ALL',
                    currentFacultyGroup: 'ALL',
                    currentDepartment: 'ALL',
                    isLoaderVisible: false
                });
            });
    }

    componentDidMount() { this._isMounted = true }
    componentWillUnmount() { this._isMounted = false }


    downloadReport = () => {
        jQuery('.clearfix.inner-content').children('').each(function (i, r) {
            if (r.id !== 'cbme-dashboard') { jQuery(r).addClass('no-printing') }
        });
        jQuery('#cbme-dashboard').children('').each(function (i, r) {
            if (r.id !== 'visual-summary-content-mount') { jQuery(r).addClass('no-printing') }
        });

        alert('You will be prompted to print the page by your browser. You can also save the report by selecting "Save as PDF" instead.');
        window.print();
    }


    render() {

        const { facultyGroupList = [], facultyList = [], departmentList = [], allResidentRecords = [],
            courseName, isLoaderVisible, academicYear, currentFaculty, currentFacultyGroup, currentDepartment } = this.state;

        const processedRecords = processFacultyMap(allResidentRecords, currentFacultyGroup, currentDepartment),
            currentFacultyRecords = _.filter(processedRecords, (d) => d.faculty_name == currentFaculty),
            overallWidth = window.dynamicDashboard.mountWidth;

        // quick fix to legacy code 
        // if a faculty name doesnt appear in the processed records remove it also 
        // from the original faculty list
        let facultyWithEnoughRecords = _.map(processedRecords, (d) => d.faculty_name);
        let filteredFacultyList = _.filter(facultyList, (d) => {
            if (d.value == 'ALL') { return true }
            else { return facultyWithEnoughRecords.indexOf(d.value) > -1 }
        });

        return (
            <div className='supervisor-dashboard-container'>
                <div className='custom-select-wrapper no-printing m-b'>
                    <div className='multi-selection-box m-r'>
                        <h2 className='header'>Academic Year</h2>
                        <div className='react-select-root' style={{ 'width': 150 }}>
                            <ReactSelect
                                value={academicYear}
                                options={possibleAcademicYears}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectAcademicYear} />
                        </div>
                    </div>
                    <button type="submit" className="filter-button btn btn-primary-outline m-r" onClick={this.onSubmit}>
                        GET RECORDS
                    </button>
                </div>
                {isLoaderVisible ?
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div>
                    :
                    <div>
                        {facultyList.length > 0 &&
                            <div>
                                <FacultyFilterPanel
                                    facultyList={filteredFacultyList}
                                    facultyGroupList={facultyGroupList}
                                    departmentList={departmentList}
                                    currentFaculty={currentFaculty}
                                    currentDepartment={currentDepartment}
                                    currentFacultyGroup={currentFacultyGroup}
                                    onCurrentFacultyGroupSelect={this.onCurrentFacultyGroupSelect}
                                    onCurrentDepartmentSelect={this.onCurrentDepartmentSelect}
                                    onFacultySelect={this.onFacultySelect} />

                                <div className='m-a'>

                                    {currentFaculty != 'ALL' &&
                                        <div className='text-right m-r-md m-t-md no-printing'>
                                            <button onClick={this.downloadReport} className='btn btn btn-primary-outline'> <i className="fa fa-download"></i> Print Faculty Report</button>
                                        </div>}

                                    <h3 className='print-title text-center'> Faculty Dashboard Report : {courseName}</h3>
                                    <h3 className='print-title text-center'> Academic Year : {academicYear.label} </h3>
                                    <h3 className='print-title text-center m-b'> Faculty : {currentFaculty}</h3>

                                    <FacultyInfoGroup
                                        width={overallWidth}
                                        processedRecords={processedRecords}
                                        currentFacultyRecords={currentFacultyRecords}
                                        currentFaculty={currentFaculty} />

                                    <FacultyGraphGroup
                                        width={overallWidth}
                                        processedRecords={processedRecords}
                                        selectFaculty={this.onFacultyClick}
                                        currentFaculty={currentFaculty} />

                                    <FacultyRecordTable
                                        currentFaculty={currentFaculty}
                                        width={overallWidth}
                                        currentFacultyRecords={currentFacultyRecords} />

                                    <FacultyExpiredRecordTable
                                        currentFaculty={currentFaculty}
                                        width={overallWidth}
                                        currentFacultyRecords={currentFacultyRecords} />
                                </div>
                            </div>}
                    </div>}
            </div>);
    }

}
