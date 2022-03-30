import React, { Component } from 'react';
import { getAllData, getRotationSchedules } from '../../utils/requestServer';
import _ from 'lodash';
import ProgramAllYearsSummary from '../ProgramEvaluationGroup/ProgramAllYearsSummary';
import ProgramBasePanel from '../ProgramEvaluationGroup/ProgramBasePanel';
import moment from 'moment';
import downloadCSV from '../../utils/downloadCSV';
import { NumberToEPAText } from "../../utils/convertEPA";


export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            // list of all resident records
            allResidentRecords: [],
            academicYearList: []
        };
        this._isMounted = false;
    }


    componentDidMount() {
        this._isMounted = true;
        // turn loader on
        this.setState({ isLoaderVisible: true });

        getAllData('program')
            .then(({ allResidentRecords, dashboard_epas, academicYearList, residentList, courseName }) => {
                // set the values on the state 
                this._isMounted && this.setState({ academicYearList, 'epa_list': [...dashboard_epas] });
                return getRotationSchedules(residentList, allResidentRecords, courseName);
            })
            .then((allResidentRecords) => {
                // set the values on the state 
                this._isMounted && this.setState({ allResidentRecords, isLoaderVisible: false });
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

        const { allResidentRecords = [], academicYearList = [], epa_list } = this.state,
            fullWidth = document.body.getBoundingClientRect().width - 300;


        return (
            <div className='m-a dashboard-root-program m-b-lg' >
                {this.state.isLoaderVisible ?
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div> :
                    <div className='container-fluid'>
                        {allResidentRecords.length > 0 ?
                            <div>
                                <div className='text-right m-r-md m-t-md'>
                                    <button onClick={this.downloadReport} className='btn btn btn-primary-outline'> <i className="fa fa-download"></i> Export Program Data</button>
                                </div>
                                <ProgramAllYearsSummary
                                    width={fullWidth}
                                    allRecords={allResidentRecords}
                                    possibleAcademicYears={_.reverse(academicYearList)} />
                                <ProgramBasePanel
                                    width={fullWidth}
                                    epa_list={epa_list}
                                    allRecords={allResidentRecords}
                                    possibleAcademicYears={_.reverse(academicYearList)} />
                            </div>
                            : <h2 className='text-primary text-center m-t-lg'>No program data available currently</h2>}
                    </div>}
            </div >
        );
    }
}


