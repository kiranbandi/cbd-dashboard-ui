/*global $*/
import React, { Component } from 'react';
import { getAllUsers, getUser, updateUser, deleteUser } from '../../utils/requestServer';
import { rotationList, phasesList } from '../../utils/programInfo';
import Loading from 'react-loading';
import moment from 'moment';
import ReactSelect from 'react-select';
import rotationScheduleMap from '../../utils/rotationScheduleMap';

const possibleAcademicYears = _.keys(rotationScheduleMap);

export default class ModifyUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: true,
            innerLoaderState: false,
            deleteLoaderState: false,
            username: '',
            email: '',
            fullname: '',
            accessType: 'resident',
            accessList: '',
            userList: [],
            programStartDate: moment().format('MM/DD/YYYY'),
            currentPhase: 'transition-to-discipline',
            earlierPhaseCount: 0,
            promotedDate: [],
            academicYear: '2018',
            rotationSchedule: {},
            longitudinalSchedule: {},
            citeExamScore: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectUsername = this.onSelectUsername.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onPhaseChange = this.onPhaseChange.bind(this);
        this.onYearlyInputChange = this.onYearlyInputChange.bind(this);
        this.onRotationalScheduleChange = this.onRotationalScheduleChange.bind(this);
    }

    componentDidMount() {
        getAllUsers()
            .then((users) => { this.setState({ userList: [...users] }) })
            .finally(() => { this.setState({ loaderState: false }) });
    }

    onDeleteClick(event) {
        event.preventDefault();
        let { username, userList } = this.state;
        if (username.length > 0) {
            this.setState({ deleteLoaderState: true });
            deleteUser(username)
                .then(() => {
                    const indexOfDeletedElement = userList.indexOf(username);
                    // splice deletes value in place 
                    userList.splice(indexOfDeletedElement, 1);
                    // reset form values and also remove the deleted username from the list 
                    this.setState({
                        userList,
                        username: '',
                        fullname: '',
                        email: '',
                        accessType: 'resident',
                        accessList: '',
                        programStartDate: moment().format('MM/DD/YYYY'),
                        currentPhase: 'transition-to-discipline',
                        earlierPhaseCount: 0,
                        promotedDate: [],
                        academicYear: '2018',
                        rotationSchedule: {},
                        longitudinalSchedule: {},
                        citeExamScore: {}
                    })
                })
                // toggle loader once request is completed
                .finally(() => {
                    this.setState({ deleteLoaderState: false });
                });
        }
    }

    onSelectUsername(user) {
        const username = user.value;
        if (username.length > 0) {
            this.setState({ loaderState: true });
            getUser(username)
                .then((userData) => {

                    // code snippet to ensure old format doesnt break
                    // and is migrated smoothly
                    if (typeof (userData.rotationSchedule) == 'string') {
                        userData.rotationSchedule = {}
                    }
                    if (typeof (userData.longitudinalSchedule) == 'string') {
                        userData.longitudinalSchedule = {}
                    }
                    if (typeof (userData.citeExamScore) == 'string') {
                        userData.citeExamScore = {}
                    }


                    this.setState({
                        username,
                        email: userData.email,
                        fullname: userData.fullname || '',
                        accessType: userData.accessType,
                        accessList: userData.accessList || '',
                        programStartDate: moment(userData.programStartDate).format('MM/DD/YYYY') || moment().format('MM/DD/YYYY'),
                        currentPhase: userData.currentPhase || 'transition-to-discipline',
                        earlierPhaseCount: phasesList.indexOf(userData.currentPhase || 'transition-to-discipline'),
                        promotedDate: userData.promotedDate || [],
                        rotationSchedule: userData.rotationSchedule || {},
                        longitudinalSchedule: userData.longitudinalSchedule || {},
                        citeExamScore: userData.citeExamScore || {},
                        academicYear: '2018'
                    });
                })
                .finally(() => { this.setState({ loaderState: false }) });
        }
    }

    onPhaseChange(event) {
        // if he is in a phase > 1 then we need promoted dates for all previous phases
        let currentPhase = event.target.value, earlierPhaseCount = 0;
        if (phasesList.indexOf(currentPhase) > 0) {
            earlierPhaseCount = phasesList.indexOf(currentPhase);
        }
        this.setState({ currentPhase, earlierPhaseCount });
    }


    onChange(event) {
        this.setState({
            [event.target.name]:
                ['fullname', 'rotationSchedule', 'accessList', 'longitudinalSchedule', 'citeExamScore'].indexOf(event.target.name) > -1 ? event.target.value : event.target.value.trim()
        });
    }

    onRotationalScheduleChange(event) {
        const { academicYear, rotationSchedule } = this.state,
            rotationID = event.target.id.split("-")[1],
            rotationValue = event.target.value;
        // if there is no array then create an empty array and set all the values to the first possible rotation
        if (!rotationSchedule.hasOwnProperty(academicYear)) {
            rotationSchedule[academicYear] = (rotationScheduleMap[academicYear].length-1, () => rotationList[0]);
        }
        rotationSchedule[academicYear][rotationID] = rotationValue;
        this.setState({ rotationSchedule });
    }

    onYearlyInputChange(event) {
        let { academicYear, longitudinalSchedule, citeExamScore } = this.state;
        if (event.target.name == 'longitudinalSchedule') {
            longitudinalSchedule[academicYear] = event.target.value;
        }
        else {
            citeExamScore[academicYear] = event.target.value;
        }
        this.setState({ longitudinalSchedule, citeExamScore });
    }

    onSubmit(event) {
        event.preventDefault();
        let { username, email, fullname,
            accessType, accessList, currentPhase, earlierPhaseCount, promotedDate,
            citeExamScore, rotationSchedule, longitudinalSchedule } = this.state,
            programStartDate = document.getElementById('modify-programStartDate') ? document.getElementById('modify-programStartDate').value : '';

        // reset promotedDate array
        promotedDate = []
        // then set the phase promoted dates one by one 
        _.map(Array(earlierPhaseCount), (d, index) => {
            promotedDate[index] = document.getElementById('promoted-' + index) ? document.getElementById('promoted-' + index).value : ''
        })

        // toggle loader on before request 
        this.setState({ innerLoaderState: true });
        updateUser({ username, email, fullname, accessType, accessList, currentPhase, rotationSchedule, longitudinalSchedule, programStartDate, citeExamScore, promotedDate })
            .then(() => {
                // reset form values
                this.setState({
                    username: '',
                    fullname: '',
                    email: '',
                    accessType: 'resident',
                    accessList: '',
                    programStartDate: moment().format('MM/DD/YYYY'),
                    currentPhase: 'transition-to-discipline',
                    earlierPhaseCount: 0,
                    promotedDate: [],
                    academicYear: '2018',
                    rotationSchedule: {},
                    longitudinalSchedule: {},
                    citeExamScore: {}
                })
            })
            // toggle loader once request is completed
            .finally(() => {
                this.setState({ innerLoaderState: false });
            });
    }

    render() {

        const { userList, loaderState, innerLoaderState,
            deleteLoaderState, username, fullname = '',
            email, accessType, accessList, academicYear,
            currentPhase, programStartDate, earlierPhaseCount, promotedDate,
            rotationSchedule, longitudinalSchedule, citeExamScore } = this.state;


        //  first convert the array into the format required by react-select 
        let modifiedUserList = _.map(userList, (d) => {
            return {
                label: d.username + " - " + d.fullname,
                value: d.username,
                accessType: d.accessType
            };
        })

        // then group the array based on access Type 
        let groupedUserList = _.groupBy(modifiedUserList, (d) => d.accessType);
        //  then remap the array without the access type in it 
        // and also internally sort the elements
        groupedUserList = _.map(groupedUserList, (options, label) => {
            return { label, options: options.sort((prev, cur) => prev.value.localeCompare(cur.value)) }
        })

        // if there is no array then create an empty array and set all the values to the first possible rotation
        if (!rotationSchedule.hasOwnProperty(academicYear)) {
            rotationSchedule[academicYear] = _.times(rotationScheduleMap[academicYear].length-1, () => rotationList[0]);
        };

        const currentSelectedValue = _.find(modifiedUserList, (d) => d.value == username) || null;

        return (
            <div className='modify-user-container'>
                {loaderState ?
                    <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :

                    <form className="col-lg-8 col-lg-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
                        <div className="username-select m-a">
                            <span className='inner-span'>NSID</span>
                            <div className='react-select-root'>
                                <ReactSelect
                                    value={currentSelectedValue}
                                    options={groupedUserList}
                                    styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                    onChange={this.onSelectUsername} />
                            </div>
                        </div>
                        <div className="input-group m-a">
                            <span className='inner-span'>EMAIL</span>
                            <input type="email" className="form-control" value={email} name="email" placeholder="EMAIL" onChange={this.onChange} />
                        </div>
                        <div className="input-group m-a">
                            <span className='inner-span'>FULL NAME</span>
                            <input type="email" className="form-control" value={fullname} name="fullname" placeholder="FIRSTNAME LASTNAME" onChange={this.onChange} />
                        </div>
                        <div className="input-group m-a">
                            <span className='inner-span'>ACCESS TYPE</span>
                            <select name="accessType" className='custom-select' value={accessType} onChange={this.onChange}>
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
                                <span className='inner-span'>PROGRAM START DATE</span>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <span className="icon icon-calendar"></span>
                                    </span>
                                    <input type="text" id='modify-programStartDate' defaultValue={programStartDate} className="form-control" data-provide="datepicker" />
                                </div>
                            </div>}

                        {accessType == 'resident' &&
                            <div className="input-group m-a">
                                <span className='inner-span'>CURRENT PHASE</span>
                                <select id='select-current-phase' name="currentPhase" className='custom-select' value={currentPhase} onChange={this.onPhaseChange}>
                                    <option value='transition-to-discipline' >TRANSITION TO DISCIPLINE</option>
                                    <option value='foundations-of-discipline' >FOUNDATIONS OF DISCIPLINE</option>
                                    <option value='core-of-discipline' >CORE OF DISCIPLINE</option>
                                    <option value='transition-to-practice' >TRANSITION TO PRACTICE</option>
                                </select>
                            </div>}


                        {accessType == 'resident' && earlierPhaseCount > 0 &&
                            <div className='promoted-container'>
                                {_.map(Array(earlierPhaseCount), (d, index) => {
                                    return <div className="input-group m-a" key={'date-promoted-' + index}>
                                        <span className='inner-span'>PROMOTED DATE - {phasesList[index].split("-").join(" ")}</span>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="icon icon-calendar"></span>
                                            </span>
                                            <input className='program-start-date form-control' type="text" id={'promoted-' + index} defaultValue={promotedDate[index] || moment().format('MM/DD/YYYY')} data-provide="datepicker" />
                                        </div>
                                    </div>
                                })}
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
                                            {_.map(rotationScheduleMap[academicYear].slice(0, rotationScheduleMap[academicYear].length - 1), (slot, slotID) => {
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
                                    <div className="input-group">
                                        <span className='inner-span text-info'>LOGITUDINAL SCHEDULE</span>
                                        <input type="text" className="form-control extra-wide" name="longitudinalSchedule" value={longitudinalSchedule[academicYear] || ''} placeholder="COMMA SEPARATED VALUES" onChange={this.onYearlyInputChange} />
                                    </div>
                                    <div className="input-group text-info">
                                        <span className='inner-span'>CITE SCORE</span>
                                        <input type="text" className="form-control extra-wide" name="citeExamScore" value={citeExamScore[academicYear] || ''} placeholder="COMMA SEPARATED VALUES" onChange={this.onYearlyInputChange} />
                                    </div>
                                </div>
                            </div>}

                        <button className={"btn btn-success create-btn m-a m-t-md " + ((username.length > 0) ? "" : 'disabled')} type="submit" onClick={this.onSubmit}>
                            <span className='create-span'>{"UPDATE USER"} </span>
                            {innerLoaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                        </button>

                        <button className={"btn btn-danger create-btn m-a m-t-md " + ((username.length > 0) ? "" : 'disabled')} type="submit" onClick={this.onDeleteClick}>
                            <span className='create-span'>{"DELETE USER"} </span>
                            {deleteLoaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                        </button>

                    </form>
                }
            </div>
        );
    }
}

