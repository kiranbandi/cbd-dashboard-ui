import React, { Component } from 'react';
import { getAllData } from '../../utils/requestServer';
import ReactSelect from 'react-select';
import _ from 'lodash';
import ProgramsSummary from '../ProgramOversightGroup/ProgramsSummary';

const possibleAcademicYears = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'].map(e => ({ 'label': e + '-' + (+e + 1), 'value': e }));
export default class OversightDashboard extends Component {

    constructor(props) {
        super(props);
        window.global_summary = {};
        this.state = {
            isLoaderVisible: false,
            programList: [],
            activePrograms: [],
            moddedProgramList: [],
            academicYear: { 'label': '2020-2021', 'value': '2020' }
        };
        this._isMounted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSelectProgram = (activePrograms) => { this.setState({ activePrograms }) };
    onSelectAcademicYear = (academicYear) => { this.setState({ academicYear }) };

    async onSubmit() {
        let courses = _.map(this.state.activePrograms, e => e.value);

        if (courses.length > 0) {
            // turn loader on
            this.setState({ isLoaderVisible: true, moddedProgramList: [] });
            Promise.all(courses.map((c) => getAllData(c)))
                .then((course_data_list) => {
                    // create a list of acad emic years 
                    let moddedProgramList = _.map(_.sortBy(course_data_list, d => d.allResidentRecords.length || 0), (e, index) => {
                        let courseName = e.courseName.indexOf(':') > -1 ? e.courseName.split(':')[1].trim() : e.courseName.trim();
                        window.global_summary[courseName] = e.allResidentRecords;
                        return { 'label': courseName, 'value': courseName };
                    });
                    // set the values on the state 
                    this._isMounted && this.setState({ moddedProgramList, isLoaderVisible: false });
                })
                .catch(() => {
                    this._isMounted && this.setState({ isLoaderVisible: false });
                    console.log("error in fetching all resident records");
                });
        }
    }

    componentDidMount() {
        this._isMounted = true;

        let programList = [];

        const course_picker = document.getElementById('cbme-course-picker');
        if (course_picker && course_picker.options.length > 0) {
            programList = [...course_picker.options].map(e => ({ 'value': e.value, 'label': e.innerText }));
        }

        this.setState({ programList });

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const { programList = [], moddedProgramList = [], activePrograms = [], academicYear } = this.state,
            fullWidth = document.body.getBoundingClientRect().width - 300;


        return (
            <div className='m-a dashboard-root-program m-b-lg' >
                <div className='m-t text-center'>
                    <div className='multi-selection-box'>
                        <h2 className='header'>Academic Year</h2>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={academicYear}
                                options={possibleAcademicYears}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectAcademicYear} />
                        </div>
                    </div>
                    <div className='multi-selection-box'>
                        <h2 className='header'>Program</h2>
                        <div className='react-select-root'>
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

                    <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>
                        GET RECORDS
                    </button>
                </div>
                {this.state.isLoaderVisible ?
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div> :
                    <div className='container-fluid'>
                        {moddedProgramList.length > 0 ?
                            <div>
                                <ProgramsSummary
                                    width={fullWidth}
                                    academicYear={academicYear}
                                    programList={_.reverse(moddedProgramList)} />
                            </div>
                            : <h3 className='text-primary text-center m-t-lg'>No program data available currently</h3>}
                    </div>}
            </div >
        );
    }
}


