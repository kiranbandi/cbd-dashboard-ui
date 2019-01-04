import React, { Component } from 'react';
import { FileUpload } from '../components';
import toastr from '../utils/toastr';
import Loading from 'react-loading';
import endPoints from '../utils/endPoints';
import axios from 'axios';

// component might be refacored out so not involving Redux at this point 
//  and relying on internal state 
export default class Tools extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false
        }
        this.onSendFile = this.onSendFile.bind(this);
    }

    onSendFile() {

        this.setState({ processing: true });

        var formData = new FormData();
        var csvFile = document.querySelector('#rcm-file');
        formData.append("rcmFile", csvFile.files[0]);

        axios.post(endPoints.sendFile, formData, { headers: { 'x-access-token': localStorage.jwt, 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
                this.setState({ processing: false });
                toastr["success"]("File Upload Successful ", "SUCCESS");
            })
            .catch((error) => {
                this.setState({ processing: false });
                toastr["error"]("Failed to connect to server , Please try again", "ERROR FETCHING RESIDENT NAMES");
            })

    }

    render() {
        const { processing } = this.state;
        return (
            <div className='tools-root m-t' >
                <div className='container'>
                    <h2 className='text-center text-primary'>  Push Data File to Remote Server </h2>
                    <FileUpload id='rcm-file' label='File to be moved' />
                    <button className="btn btn-primary-outline m-t process-btn" onClick={this.onSendFile}>
                        <span className='process-span'>{"SEND FILE"} </span>
                        {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                    </button>
                </div>
            </div>
        );
    }
}
