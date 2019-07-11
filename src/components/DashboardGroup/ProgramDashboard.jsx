import React, { Component } from 'react';
import { getAllData } from '../../utils/requestServer';
import Loading from 'react-loading';
import { getResidentList } from '../../utils/requestServer';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import ReactSelect from 'react-select';
import rotationScheduleMap from '../../utils/rotationScheduleMap';
import moment from 'moment';
import EPAOverallbyRotation from '../ProgramEvaluationGroup/EPAOverallbyRotation';
import EPAMonthlyRotation from '../ProgramEvaluationGroup/EPAMonthlyRotation';
import EPAspecificRotation from '../ProgramEvaluationGroup/EPAspecificRotation';
import RotationSpecificEPA from '../ProgramEvaluationGroup/RotationSpecificEPA';
import EPACompletionRateUnder from '../ProgramEvaluationGroup/EPACompletionRateUnder';
import EPACompletionRateOver from '../ProgramEvaluationGroup/EPACompletionRateOver';

const possibleAcademicYears = _.map(_.keys(rotationScheduleMap), (d) => (
    {
        'label': d + "-" + (Number(d) + 1),
        'value': d
    }
));

export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            academicYear: { 'label': '2018-2019', 'value': '2018' },
            allRecords: [],
            residentList: [],
            selected: 'all',
            rotationCount: {}
        };
        this._isMounted = false;
        this.selectionChange = this.selectionChange.bind(this);
        this.onSelectAcademicYear = this.onSelectAcademicYear.bind(this);
    }

    selectionChange(event) {
        event.preventDefault();
        let selected = event.target.className.split(" ")[1].split("-")[2];
        this.setState({ selected });
    }

    onSelectAcademicYear(academicYear) {
        let { residentList } = this.state;
        this.setState({ rotationCount: calculateRotationCount(residentList, academicYear.value), academicYear });
    }

    componentDidMount() {
        // initialize empty map
        let { academicYear, residentList = [] } = this.state;

        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents to get rotation count from schedule
        getResidentList()
            .then((response) => {
                residentList = _.clone(response);
                // now get all the records in DB
                return getAllData();
            })
            .then((data) => {
                // filter out records that dont have rotation and phase tag on them or are expired
                this._isMounted && this.setState({
                    residentList,
                    rotationCount: calculateRotationCount(residentList, academicYear.value),
                    allRecords: _.filter(data, (d) => !d.isExpired && (!!d.rotationTag && !!d.phaseTag))
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

        const { allRecords, academicYear, selected, rotationCount } = this.state,
            // Filter out records which fall in a given academic year 
            recordsInAcademicYear = _.filter(allRecords, (d) => matchAcademicYear(d.observation_date, academicYear.value));

        let width = document.body.getBoundingClientRect().width - 250, filteredRecords = [];
        // for small screens use all available width
        width = width < 800 ? width : width / 2;
        // group records based on the phase the resident was in 
        const phaseGroupedRecords = _.groupBy(recordsInAcademicYear, (d) => d.phaseTag);

        if (selected == 'all') {
            filteredRecords = _.clone(recordsInAcademicYear);
        }
        else {
            filteredRecords = _.clone(phaseGroupedRecords[selected] || []);
        }

        return (
            <div className='m-a dashboard-root-program' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t text-center'>
                        <div className='row'>
                            <div className='year-selection-box'>
                                <h2 className='header'>Academic Year: </h2>
                                <div className='react-select-root'>
                                    <ReactSelect
                                        value={academicYear}
                                        options={possibleAcademicYears}
                                        styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                        onChange={this.onSelectAcademicYear} />
                                </div>
                            </div>
                            <div className='selection-box-container'>
                                <h2 className='header'>Resident Phase : </h2>
                                <div
                                    className={'selection-box box-id-all' + " " + (selected == 'all' ? 'selected-button' : '')}
                                    key={'select-all'}
                                    onClick={this.selectionChange}>
                                    All Phases
                                    </div>
                                {_.map(templateEpaSourceMap, (inner, i) => {
                                    return <div
                                        className={'selection-box box-id-' + (inner.ID) + " " + (selected == (inner.ID) ? 'selected-button' : '')}
                                        key={'select-' + inner.ID}
                                        onClick={this.selectionChange}>
                                        {inner.topic}
                                    </div>
                                })}
                            </div>
                        </div>
                        {filteredRecords.length > 0 ?
                            <div className='row'>
                                {/* List all vis boxes */}
                                <EPAspecificRotation
                                    width={width}
                                    filteredRecords={filteredRecords} />
                                <RotationSpecificEPA
                                    width={width}
                                    filteredRecords={filteredRecords} />
                                <EPAOverallbyRotation
                                    width={width}
                                    rotationCount={rotationCount}
                                    filteredRecords={recordsInAcademicYear} />
                                <EPAMonthlyRotation
                                    width={width}
                                    filteredRecords={filteredRecords} />
                                <EPACompletionRateUnder
                                    width={width}
                                    allRecords={recordsInAcademicYear} />
                                <EPACompletionRateOver
                                    width={width}
                                    allRecords={recordsInAcademicYear} />
                            </div> :
                            <h2 className='text-center text-danger m-t-lg'>No program information is available currently</h2>}
                    </div>}
            </div >
        );
    }
}


function matchAcademicYear(recordDate, academicYear) {
    var timeObj = moment(recordDate, 'YYYY-MM-DD');
    return (timeObj.isBetween(moment('07/01/' + Number(academicYear), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]'))
}

function calculateRotationCount(residentList, academicYear, phase) {

    let rotationCount = {};

    // we filter out residents who were active in that current year and only
    // get their rotations ,
    // so if we are looking at the year 2018-2019 then the academic year is 2018
    // so we only take residents who started before July 2019 , 
    //  ideally we will delete records of residents who leave the program or archive them so we dont
    // need to filter out those that fall before the starting year becase we started in 2018
    // and the list only goes up in size as more reisidents join the program.
    // If future we will also use GraduatedDate to remove residents who werent active in a given year
    var activeResidentList = _.filter(residentList, (d) => (moment(d.programStartDate).isBefore(moment('07/01/' + (Number(academicYear) + 1), 'MM/DD/YYYY'))))

    // count each rotation
    _.map(activeResidentList, (resident) => {
        _.map(resident.rotationSchedule[academicYear], (rotation) => {
            if (rotationCount.hasOwnProperty(rotation)) {
                rotationCount[rotation] += 1;
            }
            else {
                rotationCount[rotation] = 1;
            }
        });
    })

    return rotationCount;
}