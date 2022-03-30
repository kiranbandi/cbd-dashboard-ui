import React, { Component } from 'react';
import _ from 'lodash';
import { getAllData } from '../../utils/requestServer';
import processFacultyMap from '../../utils/processors/processFacultyMap';
import {
    FacultyFilterPanel, FacultyInfoGroup,
    FacultyRecordTable, FacultyGraphGroup, FacultyExpiredRecordTable
} from '../';

export default class FacultyDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFaculty: 'ALL',
            currentAcademicYear: 'ALL',
            currentDepartment: 'ALL',
            facultyList: [],
            academicYearList: [],
            departmentList: [],
            epa_list: [],
            // list of all resident records
            allResidentRecords: [],
            isLoaderVisible: false,
        };
        this._isMounted = false;
    }

    onFacultyClick = (event) => { this.setState({ 'currentFaculty': event.target.id.slice(12).split('--').join(' ') }) }
    onFacultySelect = (option) => { this.setState({ currentFaculty: option.value }) }
    onCurrentAcademicYearSelect = (option) => { this.setState({ currentAcademicYear: option.value }) }
    onCurrentDepartmentSelect = (option) => { this.setState({ currentDepartment: option.value }) }

    componentDidMount() {
        this._isMounted = true;
        // turn loader on
        this.setState({ isLoaderVisible: true });

        getAllData('faculty')
            .then(({ allResidentRecords, dashboard_epas, facultyList, departmentList, academicYearList }) => {
                // set the values on the state 
                this._isMounted && this.setState({ allResidentRecords, facultyList, academicYearList, departmentList, 'epa_list': [...dashboard_epas], isLoaderVisible: false });
            })
            // toggle loader again once the request completes
            .catch(() => {
                console.log("error in fetching all resident records");
                this._isMounted && this.setState({ allResidentRecords: [], isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const { facultyList = [], departmentList = [], academicYearList = [], allResidentRecords = [],
            currentFaculty, currentAcademicYear, currentDepartment, epa_list = [] } = this.state;

        const processedRecords = processFacultyMap(allResidentRecords, epa_list, currentAcademicYear, currentDepartment),
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
                {this.state.isLoaderVisible ?
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div>
                    :
                    <div>
                        <FacultyFilterPanel
                            facultyList={filteredFacultyList}
                            academicYearList={academicYearList}
                            departmentList={departmentList}
                            currentFaculty={currentFaculty}
                            currentDepartment={currentDepartment}
                            currentAcademicYear={currentAcademicYear}
                            onCurrentAcademicYearSelect={this.onCurrentAcademicYearSelect}
                            onCurrentDepartmentSelect={this.onCurrentDepartmentSelect}
                            onFacultySelect={this.onFacultySelect} />

                        <div className='m-a'>
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
            </div>);
    }

}

const capitalizeStr = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());