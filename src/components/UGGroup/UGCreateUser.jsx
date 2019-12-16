/*global $*/
import React, { Component } from 'react';
import { registerUser } from '../../utils/requestServer';
import Loading from 'react-loading';

export default class UGCreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: false,
            username: '',
            fullname: '',
            email: '',
            accessType: 'reviewer'
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]:
                ['fullname', 'accessList'].indexOf(event.target.name) > -1 ?
                    event.target.value : event.target.value.trim()
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const { username, fullname, email, accessType } = this.state;

        // toggle loader on before request 
        this.setState({ loaderState: true });
        registerUser({
            username, fullname, email, accessType,
            accessList: '', currentPhase: '',
            rotationSchedule: {}, longitudinalSchedule: {},
            programStartDate: '', promotedDate: ''
        })
            .then(() => {
                // reset form values
                this.setState(
                    {
                        username: '',
                        fullname: '',
                        email: '',
                        accessType: 'reviewer'
                    })
            })
            // toggle loader once request is completed
            .finally(() => {
                this.setState({ loaderState: false });
            });
    }

    render() {
        let { loaderState, username, fullname, email, accessType } = this.state;

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
                            <option value='reviewer' >COMMITEE REVIEWER</option>
                            <option value='admin' >ADMIN</option>
                        </select>
                    </div>

                    <button className={"btn btn-success create-btn m-a m-t-md " + ((username.length > 0) ? "" : 'disabled')} type="submit" onClick={this.onSubmit}>
                        <span className='create-span'>{"CREATE USER"} </span>
                        {loaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                    </button>
                </form>
            </div >
        );
    }
}

