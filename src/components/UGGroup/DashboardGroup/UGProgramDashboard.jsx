import React, { Component } from 'react';
import { getAllData } from '../../../utils/requestServer';
import Loading from 'react-loading';
import { getResidentList } from '../../../utils/requestServer';
import ReactSelect from 'react-select';
import { UG_ROTATION_MAP } from '../../../utils/programInfo';
import moment from 'moment';
import EPAMonthlyRotation from '../../ProgramEvaluationGroup/UGEPAMonthlyRotation';
import UGEPAspecificRotation from '../../ProgramEvaluationGroup/UGEPAspecificRotation';
import UGRotationSpecificEPA from '../../ProgramEvaluationGroup/UGRotationSpecificEPA';
import EPAOverallbyRotation from '../../ProgramEvaluationGroup/UGEPAOverallbyRotation';

const possibleAcademicYears = _.map(_.keys(UG_ROTATION_MAP),
    (d) => ({ 'label': d + "-" + (Number(d) + 1), 'value': d }));

const possibleCohorts = _.map(["2020", "2021", "2022", "2023", "2024", "2025"], (d) => (
    { 'label': d, 'value': d }
));


export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            academicYear: { 'label': '2019-2020', 'value': '2019' },
            cohort: { 'label': '2020', 'value': '2020' },
            allRecords: [],
            residentList: [],
            selected: 'all'
        };
        this._isMounted = false;
    }

    componentDidMount() {
        // initialize empty map
        let { residentList = [] } = this.state;

        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents to get rotation count from schedule , no filtering of graduated residents
        getResidentList(false)
            .then((response) => {
                residentList = _.clone(response);
                // now get all the records in DB for the given program
                return getAllData();
            })
            .then((data) => {
                // filter out records that dont have rotation and phase tag on them or are expired
                this._isMounted && this.setState({
                    residentList,
                    allRecords: _.clone(data)
                });
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const { allRecords, academicYear, cohort } = this.state,
            { epaSourceMap, rotationList } = this.props.programInfo,
            // Filter out records which fall in a given academic year 
            recordsInAcademicYear = _.filter(allRecords, (d) => matchAcademicYear(d.observation_date, academicYear.value));

        let width = document.body.getBoundingClientRect().width - 250, filteredRecords = [];
        // for small screens use all available width
        width = width < 800 ? width : width / 2;

        // then Filter out records which belong to the selected cohort
        filteredRecords = _.filter(recordsInAcademicYear, (d) => d.year_tag.split('_')[1] == cohort.value);

        return (
            <div className='m-a dashboard-root-program' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t text-center'>
                        <div className='row'>
                            <div className='year-selection-box'>
                                <h2 className='header'>ACADEMIC YEAR: </h2>
                                <div className='react-select-root'>
                                    <ReactSelect
                                        value={academicYear}
                                        options={possibleAcademicYears}
                                        styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                        onChange={(academicYear) => { this.setState({ academicYear }) }} />
                                </div>
                            </div>
                            <div className='year-selection-box'>
                                <h2 className='header'> COHORT: </h2>
                                <div className='react-select-root'>
                                    <ReactSelect
                                        value={cohort}
                                        options={possibleCohorts}
                                        styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                        onChange={(cohort) => { this.setState({ cohort }) }} />
                                </div>
                            </div>
                        </div>
                        {filteredRecords.length > 0 ?
                            <div className='row'>
                                {/* List all vis boxes */}
                                <UGEPAspecificRotation
                                    width={width}
                                    epaSourceMap={epaSourceMap}
                                    filteredRecords={filteredRecords} />
                                <UGRotationSpecificEPA
                                    width={width}
                                    epaSourceMap={epaSourceMap}
                                    rotationList={rotationList}
                                    filteredRecords={filteredRecords} />
                                <EPAOverallbyRotation
                                    width={width}
                                    normalizeByCount={false}
                                    rotationList={rotationList}
                                    filteredRecords={filteredRecords} />
                                <EPAMonthlyRotation
                                    width={width}
                                    filteredRecords={filteredRecords} />
                            </div> :
                            <h2 className='text-center text-danger m-t-lg'>No program information available for selected year and cohort</h2>}
                    </div>}
            </div >
        );
    }
}

function matchAcademicYear(recordDate, academicYear) {
    var timeObj = moment(recordDate, 'YYYY-MM-DD');
    return (timeObj.isBetween(moment('08/12/' + Number(academicYear), 'MM/DD/YYYY'), moment('08/11/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]'))
}
