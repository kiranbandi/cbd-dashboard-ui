/*global $*/
import React, { Component } from 'react';
import { registerUser } from '../utils/requestServer';
import Loading from 'react-loading';

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
            accessList: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: (event.target.name == 'fullname' || event.target.name == 'accessList') ? event.target.value : event.target.value.trim() });
    }

    onSubmit(event) {
        event.preventDefault();
        const { username, password, fullname, email, accessType, accessList } = this.state;
        // toggle loader on before request 
        this.setState({ loaderState: true });
        registerUser({ username, password, fullname, email, accessType, accessList })
            .then(() => {
                // reset form values
                this.setState({ username: '', fullname: '', password: '', email: '', accessType: 'resident', accessList: '' })
            })
            // toggle loader once request is completed
            .finally(() => {
                this.setState({ loaderState: false });
            });
    }

    render() {
        const { loaderState, username, fullname, password, email, accessType, accessList } = this.state;
        return (
            <div>
                <form className="col-lg-5 col-lg-offset-1 col-xs-10 col-xs-offset-1">
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
                            <option value='supervisor' >SUPERVISOR</option>
                            <option value='admin' >ADMIN</option>
                        </select>
                    </div>
                    {this.state.accessType == 'supervisor' &&
                        <div className="input-group m-a">
                            <span className='inner-span'>ACCESS LIST</span>
                            <input type="text" className="form-control" name="accessList" value={accessList} placeholder="COMMA SEPARATED USERNAMES" onChange={this.onChange} />
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

