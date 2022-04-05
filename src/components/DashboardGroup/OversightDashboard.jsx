import React, { Component } from 'react';
import { getAllData, getAssessmentCountByProgram } from '../../utils/requestServer';
import ReactSelect from 'react-select';
import _ from 'lodash';
import ProgramsSummary from '../ProgramOversightGroup/ProgramsSummary';
import { possibleAcademicYears } from '../../utils/getAcademicYears';
export default class OversightDashboard extends Component {

    constructor(props) {
        super(props);
        window.global_summary = {};

        this.state = {
            isLoaderVisible: false,
            isProgramCountLoaderVisible: false,
            programList: [],
            activePrograms: [],
            moddedProgramList: [],
            academicYear: possibleAcademicYears.slice(-1)[0]
        };
        this._isMounted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSelectProgram = (activePrograms) => { this.setState({ activePrograms }) };
    onSelectAcademicYear = (academicYear) => {
        // when the academic year is changed trigger assessment counts again
        this.getProgramCounts(academicYear);
    };

    async onSubmit() {

        const { activePrograms, academicYear } = this.state;

        let courses = _.map(activePrograms, e => e.value);

        if (courses.length > 0) {
            // turn loader on
            this.setState({ isLoaderVisible: true, moddedProgramList: [] });
            Promise.all(courses.map((c) => getAllData('oversight', academicYear.value, c)))
                .then((course_data_list) => {
                    // create a list of acad emic years 
                    let moddedProgramList = _.map(_.sortBy(course_data_list, d => d.allResidentRecords.length || 0), (e) => {
                        let courseName = e.courseName.indexOf(':') > -1 ? e.courseName.split(':')[1].trim() : e.courseName.trim();
                        window.global_summary[courseName] = e.allResidentRecords;
                        return { 'label': courseName, 'value': courseName };
                    });
                    // set the values on the state 
                    this._isMounted && this.setState({ moddedProgramList, isLoaderVisible: false });
                })
                .catch(() => {
                    this._isMounted && this.setState({ moddedProgramList: [], isLoaderVisible: false });
                    console.log("error in fetching all resident records");
                });
        }
    }


    getProgramCounts = (academicYear) => {
        let programList = [];
        const course_picker = document.getElementById('cbme-course-picker');
        if (course_picker && course_picker.options.length > 0) {
            programList = [...course_picker.options].map(e => ({ 'value': e.value, 'label': e.innerText }));
        }

        // turn on year program loader and reset the dashboard 
        this.setState({ 'isProgramCountLoaderVisible': true, academicYear, programList: [], activePrograms: [], moddedProgramList: [] });

        getAssessmentCountByProgram({ 'academic_year': academicYear.value, 'course_ids': _.map(programList, e => e.value).join(',') })
            .then((assessment_counts) => {
                // match the programs with their assessment counts and sort the list by count
                let programListWithCounts = _.reverse(_.sortBy(_.map(programList, p => {
                    let matchingProgram = _.find(assessment_counts, d => d.course_id == p.value) || { 'assessment_count': 0 },
                        matchingCount = +matchingProgram.assessment_count;
                    return {
                        'value': p.value,
                        'label': p.label + " (" + (matchingCount == 0 ? 'No Data' : matchingCount) + ")",
                        'count': matchingCount,
                        'disabled': matchingCount == 0
                    };
                }), e => e.count));
                // Then filter out the first ten programs with non zero values and get the first 10 programs or whichever is smaller 
                let activePrograms = _.filter(programListWithCounts, d => !d.disabled).slice(0, 10);
                this._isMounted && this.setState({ 'programList': programListWithCounts, activePrograms, 'isProgramCountLoaderVisible': false });
            })
            .catch(() => {
                this._isMounted && this.setState({ programList: [], activePrograms: [], isProgramCountLoaderVisible: false });
                console.log("error in fetching all resident records");
            });

    }

    componentDidMount() {
        this._isMounted = true;
        this.getProgramCounts(this.state.academicYear);
    }

    componentWillUnmount() { this._isMounted = false }

    render() {

        const { programList = [], moddedProgramList = [], activePrograms = [],
            academicYear, isLoaderVisible, isProgramCountLoaderVisible } = this.state,
            fullWidth = document.body.getBoundingClientRect().width - 300;


        return (
            <div className='m-a dashboard-root-program m-b-lg' >
                <div className='custom-select-wrapper'>
                    <div className='multi-selection-box'>
                        <h2 className='header'>Academic Year</h2>
                        <div className='react-select-root' style={{ 'width': 150 }}>
                            <ReactSelect
                                value={academicYear}
                                options={possibleAcademicYears}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectAcademicYear} />
                        </div>
                    </div>
                    <div className='multi-selection-box p-l p-r'>
                        <h2 className='header'>Program</h2>
                        <div className='react-select-root' style={{ 'width': 325 }}>
                            <ReactSelect
                                isSearchable={true}
                                isClearable={true}
                                isMulti={true}
                                value={activePrograms}
                                options={programList}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectProgram} />
                        </div>
                    </div>

                    <button type="submit" className="filter-button btn btn-primary-outline m-r" onClick={this.onSubmit}>
                        GET RECORDS
                    </button>
                </div>
                {(isLoaderVisible || isProgramCountLoaderVisible) ?
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div> :
                    <div className='container-fluid'>
                        {moddedProgramList.length > 0 &&
                            <div>
                                <ProgramsSummary
                                    width={fullWidth}
                                    academicYear={academicYear}
                                    programList={_.reverse(moddedProgramList)} />
                            </div>}
                    </div>}
            </div >
        );
    }
}


