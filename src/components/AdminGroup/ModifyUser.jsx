/*global $*/
import React, { Component } from 'react';
import { getAllUsers, getUser, updateUser, deleteUser } from '../../utils/requestServer';
import Loading from 'react-loading';
import moment from 'moment';

export default class ModifyUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: true,
            innerLoaderState: false,
            deleteLoaderState: false,
            username: '',
            password: '',
            email: '',
            fullname: '',
            accessType: 'resident',
            accessList: '',
            userList: [],
            programStartDate: moment().format('MM/DD/YYYY'),
            currentPhase: 'transition-to-discipline',
            rotationSchedule: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectUsername = this.onSelectUsername.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
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
                        password: '',
                        email: '',
                        accessType: 'resident',
                        accessList: '',
                        programStartDate: moment().format('MM/DD/YYYY'),
                        currentPhase: 'transition-to-discipline',
                        rotationSchedule: ''
                    })
                })
                // toggle loader once request is completed
                .finally(() => {
                    this.setState({ deleteLoaderState: false });
                });
        }
    }

    onSelectUsername(event) {
        const username = event.target.value;
        if (username.length > 0) {
            this.setState({ loaderState: true });
            getUser(username)
                .then((userData) => {
                    this.setState({
                        username,
                        password: '',
                        email: userData.email,
                        fullname: userData.fullname || '',
                        accessType: userData.accessType,
                        accessList: userData.accessList || '',
                        programStartDate: moment(userData.programStartDate).format('MM/DD/YYYY') || moment().format('MM/DD/YYYY'),
                        currentPhase: userData.currentPhase || 'transition-to-discipline',
                        rotationSchedule: userData.rotationSchedule || ''
                    });
                })
                .finally(() => { this.setState({ loaderState: false }) });
        }
    }

    onChange(event) {
        this.setState({ [event.target.name]: (event.target.name == 'fullname' || event.target.name == 'rotationSchedule' || event.target.name == 'accessList') ? event.target.value : event.target.value.trim() });
    }

    onSubmit(event) {
        event.preventDefault();
        const { username, password, email, fullname, accessType, accessList, currentPhase, rotationSchedule } = this.state;
        const programStartDate = document.getElementById('modify-programStartDate') ? document.getElementById('modify-programStartDate').value : '';

        // toggle loader on before request 
        this.setState({ innerLoaderState: true });
        updateUser({ username, password, email, fullname, accessType, accessList, currentPhase, rotationSchedule, programStartDate })
            .then(() => {
                // reset form values
                this.setState({
                    username: '',
                    fullname: '',
                    password: '',
                    email: '',
                    accessType: 'resident',
                    accessList: '',
                    programStartDate: moment().format('MM/DD/YYYY'),
                    currentPhase: 'transition-to-discipline',
                    rotationSchedule: ''
                })
            })
            // toggle loader once request is completed
            .finally(() => {
                this.setState({ innerLoaderState: false });
            });
    }

    render() {

        const { userList, loaderState, innerLoaderState,
            deleteLoaderState, username, fullname = '', password,
            email, accessType, accessList,
            currentPhase, programStartDate, rotationSchedule } = this.state;

        // Sort the residents alphabetically so that they are easier to look up
        userList.sort((previous, current) => previous.localeCompare(current));

        return (
            <div className='modify-user-container'>
                {loaderState ?
                    <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :

                    <form className="col-lg-5 col-lg-offset-1 col-xs-10 col-xs-offset-1">
                        <div className="input-group m-a">
                            <span className='inner-span'>USERNAME</span>
                            <select name="username" className='custom-select' value={username} onChange={this.onSelectUsername}>
                                <option key={'user-default'} value={''} >{'Select Username'}</option>
                                {userList.map((user, index) => <option key={'user-' + index} value={user} >{user}</option>)}
                            </select>
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
                                <option value='supervisor' >SUPERVISOR</option>
                                <option value='reviewer' >COMMITEE REVIEWER</option>
                                <option value='admin' >ADMIN</option>
                            </select>
                        </div>
                        {this.state.accessType == 'supervisor' &&
                            <div className="input-group m-a">
                                <span className='inner-span'>ACCESS LIST</span>
                                <input type="text" className="form-control" name="accessList" value={accessList} placeholder="COMMA SEPARATED USERNAMES" onChange={this.onChange} />
                            </div>}


                        {this.state.accessType == 'resident' &&
                            <div className="input-group m-a">
                                <span className='inner-span'>CURRENT PHASE</span>
                                <select id='select-current-phase' name="currentPhase" className='custom-select' value={currentPhase} onChange={this.onChange}>
                                    <option value='transition-to-discipline' >TRANSITION TO DISCIPLINE</option>
                                    <option value='foundations-of-discipline' >FOUNDATIONS OF DISCIPLINE</option>
                                    <option value='core-of-discipline' >CORE OF DISCIPLINE</option>
                                    <option value='transition-to-practice' >TRANSITION TO PRACTICE</option>
                                </select>
                            </div>}


                        {this.state.accessType == 'resident' &&
                            <div className="input-group m-a">
                                <span className='inner-span'>START DATE</span>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <span className="icon icon-calendar"></span>
                                    </span>
                                    <input type="text" id='modify-programStartDate' defaultValue={programStartDate} className="form-control" data-provide="datepicker" />
                                </div>
                            </div>}

                        {this.state.accessType == 'resident' &&
                            <div className="input-group m-a">
                                <span className='inner-span'>ROTATION SCHEDULE</span>
                                <input type="text" className="form-control" name="rotationSchedule" value={rotationSchedule} placeholder="COMMA SEPARATED VALUES" onChange={this.onChange} />
                            </div>}

                        <p className='m-a text-warning'> <span className="icon icon-key"></span> For the purpose of secrecy, passwords are not shared.If you dont want to change the password, leave this field blank.</p>
                        <div className="input-group m-a">
                            <span className='inner-span'>PASSWORD</span>
                            <input type="password" value={password} className="form-control" name="password" placeholder="PASSWORD" onChange={this.onChange} />
                        </div>
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

