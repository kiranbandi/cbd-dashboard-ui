import React, { Component } from 'react';
import { FileUpload } from '../components';
import getFile from '../utils/getFile';
import processRCMFile from '../utils/processRCMFile';
import toastr from '../utils/toastr';
import Loading from 'react-loading';
import { getResidentList, setRecords } from '../utils/requestServer';

export default class AddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: true,
            processing: false,
            userList: [],
            username: '',
            fullname: '',
            selectedIndex: 0,
            warningGiven: false
        }
        this.onProcessFile = this.onProcessFile.bind(this);
        this.onSelectUsername = this.onSelectUsername.bind(this);
    }

    componentDidMount() {
        getResidentList()
            .then((users) => { this.setState({ userList: [...users] }) })
            .finally(() => { this.setState({ loaderState: false }) });
    }

    onSelectUsername(event) {
        if (event.target.value != 'user-0') {
            let { userList } = this.state,
                selectedIndex = event.target.value.split("-")[1],
                user = userList[selectedIndex - 1];
            this.setState({ selectedIndex, username: user.username, fullname: user.fullname, warningGiven: false });
        }
    }

    onProcessFile(event) {
        event.preventDefault();
        const { username, fullname, warningGiven } = this.state;
        if (username.length > 0) {
            // turn on file processing loader
            this.setState({ processing: true });
            // fetch the file from the system and then process it 
            getFile('add-data-rcm-file')
                .then((response) => { return processRCMFile(response) })
                .then((data) => {
                    // List of records that have a Resident_Name different than 
                    // the selected full name , which means there could have been a mistake 
                    // while the files were uploaded so cross check with the user
                    var mismatchedRecords = data.filter((record) => record.Resident_Name != fullname);
                    if (mismatchedRecords.length > 0 && !warningGiven) {
                        toastr["warning"]("There are " + mismatchedRecords.length + " records which dont have a resident name that matches with the selected resident name.If you are okay with this select upload again", "ERROR");
                        this.setState({ warningGiven: true });
                        return Promise.reject();
                    }
                    else {
                        return setRecords(data, username);
                    }
                })
                .then((data) => {
                    const { insertedCount } = data;
                    toastr["success"](insertedCount + " records were added for user " + username);
                    // reset form params
                    this.setState({ selectedIndex: 0, username: '', fullname: '' });
                })
                .catch(() => {
                    toastr["error"]("Failed to process files , Please try again.", "ERROR");
                })
                // turn off file processing loader
                .finally(() => { this.setState({ processing: false }) });
        }
        else {
            toastr["error"]("Select a username before you upload the data ", "ERROR");
        }

    }

    render() {
        const { loaderState, processing, selectedIndex, userList } = this.state;
        return (
            <div className='add-data-root m-t' >
                {
                    loaderState ?
                        <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :

                        <form className="add-data-form">
                            <div className="input-group m-a">
                                <h4 className='inner-span'>RESIDENT USERNAME</h4>
                                <select name="username" className='custom-select' value={'user-' + selectedIndex} onChange={this.onSelectUsername}>
                                    <option key={'user-default'} value={'user-0'} >{'Select Username'}</option>
                                    {userList.map((user, index) => <option key={'user-' + (index + 1)} value={'user-' + (index + 1)} >{user.username}</option>)}
                                </select>
                            </div>
                            <FileUpload className={'m-a'} id='add-data-rcm-file' label='File from Royal College Portal' />
                            <button className={"btn btn-success create-btn m-a m-t-md "} type="submit" onClick={this.onProcessFile}>
                                <span className='create-span'>{"UPLOAD"} </span>
                                {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                            </button>
                        </form>
                }
            </div>
        );
    }
}
