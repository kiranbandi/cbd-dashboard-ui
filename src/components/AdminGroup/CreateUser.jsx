/*global $*/
import React, { Component } from 'react';
import { registerUser } from '../../utils/requestServer';
import Loading from 'react-loading';
import moment from 'moment';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: false,
            username: '',
            fullname: '',
            password: '',
            email: '',
            accessType: 'resident',
            accessList: '',
            programStartDate: moment().format('MM/DD/YYYY'),
            currentPhase: 'transition-to-discipline',
            rotationSchedule: '',
            longitudinalSchedule: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: ['fullname', 'rotationSchedule', 'accessList', 'longitudinalSchedule'].indexOf(event.target.name) > -1 ? event.target.value : event.target.value.trim() });
    }

    onSubmit(event) {
        event.preventDefault();
        const { username, password, fullname, email, accessType, accessList, currentPhase, rotationSchedule, longitudinalSchedule } = this.state;
        const programStartDate = document.getElementById('programStartDate') ? document.getElementById('programStartDate').value : '';

        // toggle loader on before request 
        this.setState({ loaderState: true });
        registerUser({ username, password, fullname, email, accessType, accessList, currentPhase, rotationSchedule, longitudinalSchedule, programStartDate })
            .then(() => {
                // reset form values
                this.setState(
                    {
                        username: '',
                        fullname: '',
                        password: '',
                        email: '',
                        accessType: 'resident',
                        accessList: '',
                        programStartDate: moment().format('MM/DD/YYYY'),
                        currentPhase: 'transition-to-discipline',
                        rotationSchedule: '',
                        longitudinalSchedule: ''
                    })
            })
            // toggle loader once request is completed
            .finally(() => {
                this.setState({ loaderState: false });
            });
    }

    render() {
        const { loaderState, username, fullname,
            password, email, accessType, accessList,
            currentPhase, programStartDate, rotationSchedule, longitudinalSchedule } = this.state;

        return (
            <div>
                <form className="col-lg-5 col-lg-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
                    <div className="input-group m-a">
                        <span className='inner-span'>USERNAME</span>
                        <input type="text" value={username} className="form-control" name="username" placeholder="USERNAME , NO SPACES" onChange={this.onChange} />
                    </div>
                    <div className="input-group m-a">
                        <span className='inner-span'>PASSWORD</span>
                        <input type="password" value={password} className="form-control" name="password" placeholder="PASSWORD" onChange={this.onChange} />
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
                            <option value='supervisor' >ACADEMIC SUPERVISOR</option>
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
                                <input type="text" id='programStartDate' defaultValue={programStartDate} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>}

                    {this.state.accessType == 'resident' &&
                        <div className="input-group m-a">
                            <span className='inner-span'>ROTATION SCHEDULE</span>
                            <input type="text" className="form-control" name="rotationSchedule" value={rotationSchedule} placeholder="COMMA SEPARATED VALUES" onChange={this.onChange} />
                        </div>}

                    {this.state.accessType == 'resident' &&
                        <div className="input-group m-a">
                            <span className='inner-span'>LOGITUDINAL SCHEDULE</span>
                            <input type="text" className="form-control" name="longitudinalSchedule" value={longitudinalSchedule} placeholder="COMMA SEPARATED VALUES" onChange={this.onChange} />
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

