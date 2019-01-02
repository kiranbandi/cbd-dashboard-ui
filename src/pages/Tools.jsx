import React, { Component } from 'react';
import { FileUpload } from '../components';
import getFile from '../utils/getFile';
import processRCMFile from '../utils/processRCMFile';
import toastr from '../utils/toastr';
import Loading from 'react-loading';

// component might be refacored out so not involving Redux at this point 
//  and relying on internal state

export default class Tools extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false
        }
        this.onProcessFile = this.onProcessFile.bind(this);
    }

    onProcessFile() {

        // turn on file processing loader
        this.setState({ processing: true });

        getFile('rcm-file')
            .then((response) => { return processRCMFile(response) })
            .then((data) => {

                debugger;
            })
            .catch(() => {
                toastr["error"]("Failed to process files , Please try again.", "ERROR");
            })
            // turn off file processing loader
            .finally(() => { this.setState({ processing: false }) });
    }


    render() {
        const { processing } = this.state;
        return (
            <div className='tools-root container m-t' >
                <h2 className='text-center text-primary'>Royal College of Medicine Export File Processor</h2>
                <p className='m-t m-b'>
                    The files exported from the royal college of medicine website can be quite difficult to analyze.This tool lets you process those files into a more manageble format.
                     You also have an option to visualize the records on the file for a quick overview if you want.The processing is done completely on your machine inside your browser so your data is safe.
                 </p>
                <FileUpload id='rcm-file' label='File Exported from Royal College Portal' />
                <button className="btn btn-primary-outline m-t process-btn" onClick={this.onProcessFile}>
                    <span className='process-span'>{"PROCESS FILE"} </span>
                    {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                </button>
            </div>
        );
    }
}


