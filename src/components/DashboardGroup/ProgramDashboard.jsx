import React, { Component } from 'react';
import { getAllData, getRotationSchedules } from '../../utils/requestServer';
import _ from 'lodash';
import ReactSelect from 'react-select';
import ProgramAllYearsSummary from '../ProgramEvaluationGroup/ProgramAllYearsSummary';
import ProgramBasePanel from '../ProgramEvaluationGroup/ProgramBasePanel';
import moment from 'moment';
import downloadCSV from '../../utils/downloadCSV';
import { NumberToEPAText } from "../../utils/convertEPA";
import { possibleAcademicYears } from '../../utils/getAcademicYears';

export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            // list of all resident records
            allResidentRecords: [],
            academicYears: possibleAcademicYears.slice(1)
        };
        this._isMounted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSelectAcademicYear = (academicYears) => {
        const sortedYears = _.sortBy(academicYears, d => d.label);
        this.setState({ 'academicYears': sortedYears, allResidentRecords: [] })
    };

    async onSubmit() {
        const { academicYears } = this.state;
        const yearList = _.map(academicYears, d => d.value);

        if (yearList.length > 0) {
            // turn loader on
            this.setState({ isLoaderVisible: true });

            Promise.all(yearList.map((y) => getAllData('program', y)))
                .then((year_data_list) => {

                    // merge data from different years into a single list 
                    const allRecords = _.flatMap(year_data_list, d => d.allResidentRecords),
                        residentList = _.uniq(_.flatMap(year_data_list, d => d.residentList)),
                        courseName = year_data_list.length > 0 ? year_data_list[0].courseName : '';

                    return getRotationSchedules(residentList, allRecords, courseName);
                })
                .then((allResidentRecords) => {
                    // set the values on the state 
                    this._isMounted && this.setState({ allResidentRecords, isLoaderVisible: false });
                })
                .catch(() => {
                    this._isMounted && this.setState({ isLoaderVisible: false, allResidentRecords: [] });
                    console.log("error in fetching all resident records");
                });
        }
    }


    componentDidMount() { this._isMounted = true }
    componentWillUnmount() { this._isMounted = false }

    downloadReport = () => {

        const { allResidentRecords = [] } = this.state;

        if (allResidentRecords.length > 0) {
            downloadCSV([
                'Academic Year',
                'Encounter Date',
                'Expiry Date',
                'Resident',
                'Assessor',
                'Assessor Role',
                'EPA',
                'Rating',
                'Feedback',
                'Type',
                'Progress']
                , _.map(allResidentRecords, e =>
                ([e['Academic_Year'] || '',
                e['Date'] || '',
                moment(e.Expiry_Date, 'MMM DD, YYYY').format('YYYY-MM-DD'),
                e['Resident_Name'] || '',
                e['Assessor_Name'] || '',
                e['Assessor_Role'] || '',
                NumberToEPAText(String(e['EPA'])),
                e['Rating'] || '',
                e['Feedback'] || '',
                e['Type'] || '',
                e['isExpired'] ? 'expired' : e['progress']
                ])),
                'program-data-report');
        }

    }


    render() {

        const { academicYears, allResidentRecords = [], academicYearList = [] } = this.state,
            fullWidth = document.body.getBoundingClientRect().width - 300;

        return (
            <div className='dashboard-root-program m-b-lg' >
                <div className='custom-select-wrapper'>
                    <div className='multi-selection-box m-r'>
                        <h2 className='header'>Academic Year</h2>
                        <div className='react-select-root'>
                            <ReactSelect
                                isMulti={true}
                                value={academicYears}
                                options={possibleAcademicYears}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectAcademicYear} />
                        </div>
                    </div>
                    <button type="submit" className="filter-button btn btn-primary-outline m-r" onClick={this.onSubmit}>
                        GET RECORDS
                    </button>
                </div>
                {this.state.isLoaderVisible ?
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div> :
                    <div className='container-fluid'>
                        {allResidentRecords.length > 0 &&
                            <div>
                                <div className='text-right m-r-md m-t-md'>
                                    <button onClick={this.downloadReport} className='btn btn btn-primary-outline'> <i className="fa fa-download"></i> Export Program Data</button>
                                </div>
                                <ProgramAllYearsSummary
                                    width={fullWidth}
                                    allRecords={allResidentRecords}
                                    possibleAcademicYears={_.reverse(academicYears)} />
                                <ProgramBasePanel
                                    width={fullWidth}
                                    allRecords={allResidentRecords}
                                    possibleAcademicYears={_.reverse(academicYears)} />
                            </div>}
                    </div>}
            </div >
        );
    }
}


