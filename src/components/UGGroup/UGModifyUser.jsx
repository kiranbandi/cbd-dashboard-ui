/*global $*/
import React, { Component } from 'react';
import { getAllUsers, getUser, updateUser, deleteUser } from '../../utils/requestServer';
import Loading from 'react-loading';
import ReactSelect from 'react-select';

export default class UGModifyUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: true,
            innerLoaderState: false,
            deleteLoaderState: false,
            username: '',
            email: '',
            fullname: '',
            accessType: 'reviewer',
            accessList: '',
            userList: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectUsername = this.onSelectUsername.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidMount() {
        getAllUsers()
            .then((users) => {
                this.setState({ userList: [...users] })
            })
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
                        accessType: 'reviewer'
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
                    this.setState({
                        username,
                        email: userData.email,
                        fullname: userData.fullname || '',
                        accessType: userData.accessType
                    });
                })
                .finally(() => { this.setState({ loaderState: false }) });
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]:
                ['fullname'].indexOf(event.target.name) > -1 ? event.target.value : event.target.value.trim()
        });
    }

    onSubmit(event) {
        event.preventDefault();
        let { username, email, fullname, accessType } = this.state;
        // toggle loader on before request 
        this.setState({ innerLoaderState: true });
        // make a call to backend to update that particular user
        updateUser({
            username, email, fullname, accessType,
            accessList: '', currentPhase: '',
            rotationSchedule: {}, longitudinalSchedule: {},
            programStartDate: '', promotedDate: '', isGraduated: false
        })
            .then(() => {
                // reset form values
                this.setState({
                    username: '',
                    fullname: '',
                    email: '',
                    accessType: 'reviewer'
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
            email, accessType } = this.state;

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
        // set the select value with the value in the resident filter 
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
                                <option value='reviewer' >COMMITEE REVIEWER</option>
                                <option value='admin' >ADMIN</option>
                            </select>
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

