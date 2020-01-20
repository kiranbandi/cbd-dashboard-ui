/*global $*/
import React, { Component } from 'react';
import { registerUser } from '../../../utils/requestServer';
import { UG_ROTATION_MAP } from '../../../utils/programInfo';
import Loading from 'react-loading';
import moment from 'moment';

const possibleAcademicYears = _.keys(UG_ROTATION_MAP);
const possibleCohorts = ["2020", "2021", "2022", "2023", "2024", "2025"];

export default class UGCreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: false,
            username: '',
            fullname: '',
            email: '',
            accessType: 'resident',
            accessList: '',
            currentPhase: '2020',
            academicYear: '2019',
            // array of dates
            promotedDate: [],
            // JSON Object with arrays of schedules for each year
            rotationSchedule: {},
            // JSON Object with arrays of schedules for each year
            longitudinalSchedule: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onPhaseChange = this.onPhaseChange.bind(this);
        this.onYearlyInputChange = this.onYearlyInputChange.bind(this);
        this.onRotationalScheduleChange = this.onRotationalScheduleChange.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]:
                ['fullname', 'accessList'].indexOf(event.target.name) > -1 ?
                    event.target.value : event.target.value.trim()
        });
    }


    onRotationalScheduleChange(event) {
        const { academicYear, rotationSchedule } = this.state,
            { rotationList } = this.props.programInfo,
            rotationID = event.target.id.split("-")[1],
            rotationValue = event.target.value;
        // if there is no array then create an empty array and set all the values to the first possible rotation
        if (!rotationSchedule.hasOwnProperty(academicYear)) {
            rotationSchedule[academicYear] = _.times(UG_ROTATION_MAP[academicYear].length - 1, () => rotationList[0]);
        }
        rotationSchedule[academicYear][rotationID] = rotationValue;
        this.setState({ rotationSchedule });
    }

    onYearlyInputChange(event) {
        let { academicYear, longitudinalSchedule } = this.state;
        longitudinalSchedule[academicYear] = event.target.value;
        this.setState({ longitudinalSchedule });
    }

    onPhaseChange(event) {
        this.setState({ currentPhase: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const { username, fullname,
            email, accessType, accessList, currentPhase,
            rotationSchedule, longitudinalSchedule, promotedDate } = this.state;

        // toggle loader on before request 
        this.setState({ loaderState: true });
        registerUser({
            username, fullname, email, accessType,
            accessList, currentPhase,
            rotationSchedule, longitudinalSchedule,
            programStartDate: '', promotedDate: ''
        })
            .then(() => {
                // reset form values
                this.setState(
                    {
                        username: '',
                        fullname: '',
                        email: '',
                        accessType: 'resident',
                        accessList: '',
                        academicYear: '2019',
                        // array of dates
                        promotedDate: [],
                        currentPhase: '2020',
                        // JSON Object with arrays of schedules for each year
                        rotationSchedule: {},
                        // JSON Object with arrays of schedules for each year
                        longitudinalSchedule: {}
                    })
            })
            // toggle loader once request is completed
            .finally(() => {
                this.setState({ loaderState: false });
            });
    }

    render() {

        let { loaderState, username, fullname,
            email, accessType, accessList,
            currentPhase, academicYear, rotationSchedule } = this.state,
            { rotationList } = this.props.programInfo;

        // if there is no array then create an empty array and set all the values to the first possible rotation
        if (!rotationSchedule.hasOwnProperty(academicYear)) {
            rotationSchedule[academicYear] = _.times(UG_ROTATION_MAP[academicYear].length - 1, () => rotationList[0]);
        }


        return (
            <div>
                <form className="col-lg-8 col-lg-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
                    <div className="input-group m-a">
                        <span className='inner-span'>NSID</span>
                        <input type="text" value={username} className="form-control" name="username" placeholder="UNIVERSITY NSID, NO SPACES" onChange={this.onChange} />
                    </div>
                    <div className="input-group m-a">
                        <span className='inner-span'>FULL NAME</span>
                        <input type="text" className="form-control" value={fullname} name="fullname" placeholder="FIRSTNAME LASTNAME" onChange={this.onChange} />
                    </div>
                    <div className="input-group m-a">
                        <span className='inner-span'>EMAIL</span>
                        <input type="email" className="form-control" value={email} name="email" placeholder="EMAIL" onChange={this.onChange} />
                    </div>
                    <div className="input-group m-a">
                        <span className='inner-span'>ACCESS TYPE</span>
                        <select id='select-access-type' name="accessType" className='custom-select' value={accessType} onChange={this.onChange}>
                            <option value='resident' >RESIDENT</option>
                            <option value='supervisor' >ACADEMIC ADVISOR</option>
                            <option value='reviewer' >COMMITEE REVIEWER</option>
                            <option value='director' >PROGRAM DIRECTOR</option>
                            <option value='admin' >ADMIN</option>
                        </select>
                    </div>

                    {accessType == 'supervisor' &&
                        <div className="input-group m-a">
                            <span className='inner-span'>ACCESS LIST</span>
                            <input type="text" className="form-control" name="accessList" value={accessList} placeholder="COMMA SEPARATED NSIDs" onChange={this.onChange} />
                        </div>}


                    {accessType == 'resident' &&
                        <div className="input-group m-a">
                            <span className='inner-span'>COHORT</span>
                            <select id='select-current-phase' name="currentPhase" className='custom-select' value={currentPhase} onChange={this.onPhaseChange}>
                                {possibleCohorts.map((cohort, index) =>
                                    <option key={'cohort-' + (index + 1)} value={cohort}>
                                        {cohort}
                                    </option>)}
                            </select>
                        </div>}

                    {accessType == 'resident' &&
                        <div className='academic-box'>
                            <h3 className='text-info m-a banner'>Set the following information for each academic year individually </h3>
                            <div className="input-group m-a">
                                <span className='inner-span text-info'>ACADEMIC YEAR</span>
                                <select id='select-academic-year' name="academicYear" className='custom-select' value={academicYear} onChange={this.onChange}>
                                    {_.map(possibleAcademicYears, (year => { return <option key={'year-' + year} value={year}>{year}-{+year + 1}</option> }))}
                                </select>
                            </div>
                            <div className='academic-inner'>
                                <div className="input-group">
                                    <span className='inner-span rotation-span text-info'>ROTATION SCHEDULE</span>
                                    <div className='rotation-root'>
                                        {/* ignore the last slot as its a placeholder for end time slot */}
                                        {_.map(UG_ROTATION_MAP[academicYear].slice(0, UG_ROTATION_MAP[academicYear].length - 1), (slot, slotID) => {
                                            return <span className='slot-set' key={'rotation-' + "-" + slotID}>
                                                <span className='slot-label'>{slot}</span>
                                                <select
                                                    id={'rotation' + "-" + slotID}
                                                    name="rotationSelect" className='custom-select rotation-select'
                                                    value={rotationSchedule[academicYear][slotID]} onChange={this.onRotationalScheduleChange}>
                                                    {_.map(rotationList, (rotation, rId) => { return <option key={'rot-' + rId} value={rotation}>{rotation}</option> })}
                                                </select>
                                            </span>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>}

                    <button className={"btn btn-success create-btn m-a m-t-md " + ((username.length > 0) ? "" : 'disabled')} type="submit" onClick={this.onSubmit}>
                        <span className='create-span'>{"CREATE USER"} </span>
                        {loaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                    </button>
                </form>
            </div >
        );
    }
}

