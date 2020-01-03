import React, { Component } from 'react';
import { FileUpload } from '../../';
import getFile from '../../../utils/getFile';
import processUGFile from '../../../utils/processUGFile';
import toastr from '../../../utils/toastr';
import Loading from 'react-loading';
import { setUGRecords, registerUser } from '../../../utils/requestServer';

export default class AddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false
        }
        this.onProcessFile = this.onProcessFile.bind(this);
    }

    onProcessFile(event) {

        event.preventDefault();

        // turn on file processing loader
        this.setState({ processing: true });
        // fetch the file from the system and then process it 
        getFile('add-data-rcm-file', true)
            .then((response) => { return processUGFile(response) })
            .then((processedOutput) => {

                let { studentRecords, studentList } = processedOutput;

                if (studentRecords.length > 0) {
                    return setUGRecords(studentRecords);
                }
                else {
                    toastr["warning"]("There were no valid EPA records in the file you have uploaded so skipping upload", "No Records");
                    return Promise.resolve(false);
                }
            })
            .then((data) => {
                if (!!data) {
                    const { insertedCount } = data;
                    toastr["success"](insertedCount + " records were updated", "SUCCESS");
                }
            })
            .catch(() => {
                toastr["error"]("Failed to process files , Please try again.", "ERROR");
            })
            // turn off file processing loader
            .finally(() => { this.setState({ processing: false }) });

    }

    render() {
        let { processing } = this.state;

        return (
            <div className='add-data-root m-t' >
                <form className="add-data-form col-lg-7 col-lg-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
                    <FileUpload className={'m-a'} id='add-data-rcm-file' label='Data Export CSV File' />
                    <button className={"btn btn-success create-btn m-a m-t-md "} type="submit" onClick={this.onProcessFile}>
                        <span className='create-span'>{"UPLOAD"} </span>
                        {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                    </button>
                </form>
            </div>
        );
    }
}