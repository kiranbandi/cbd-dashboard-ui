import React, { Component } from 'react';
import { FileUpload } from '../../';
import getFile from '../../../utils/getFile';
import processUGFile from '../../../utils/processUGFile';
import toastr from '../../../utils/toastr';
import Loading from 'react-loading';
import { setUGRecords, getResidentList } from '../../../utils/requestServer';

export default class AddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            cohort: '2020',
            residentList: [],
            loaderState: true
        }
        this.onProcessFile = this.onProcessFile.bind(this);
        this.onSelectYearTag = this.onSelectYearTag.bind(this);
        this.onSelectCohort = this.onSelectCohort.bind(this);
    }

    componentDidMount() {
        // get list of non graduated residents
        getResidentList(true)
            .then((users) => { this.setState({ residentList: [...users] }) })
            .finally(() => { this.setState({ loaderState: false }) });
    }


    onSelectYearTag(event) {
        this.setState({ yearTag: event.target.value });
    }

    onSelectCohort(event) {
        this.setState({ cohort: event.target.value });
    }


    onProcessFile(event) {

        event.preventDefault();

        const { residentList } = this.state,
            residentNSIDlist = _.map(residentList, (d) => d.username);

        // turn on file processing loader
        this.setState({ processing: true });
        // fetch the file from the system and then process it 
        getFile('add-data-rcm-file', true)
            .then((response) => { return processUGFile(response, residentList) })
            .then((processedOutput) => {
                let { studentRecords, unmapped = [] } = processedOutput;
                if (studentRecords.length > 0) {
                    // Get the list of students who dont have profiles in the system or have wrong entries in th file
                    if (unmapped.length > 0) {
                        toastr["warning"](_.map(unmapped, (d) => d.toUpperCase()).join(", "), "Unmapped Students");
                        toastr["warning"]("The following students dont have a corresponding user profile or have records with a wrong entry so their data will be ignored, Please create a profile for them and try again", "New Students Found on File");
                        return setUGRecords(studentRecords);
                    }
                    else {
                        return setUGRecords(studentRecords);
                    }
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
            .catch((e) => {
                toastr["error"]("Failed to process files , Please try again.", "ERROR");
            })
            // turn off file processing loader
            .finally(() => { this.setState({ processing: false }) });
    }

    render() {
        let { processing, loaderState } = this.state;

        return (
            <div className='add-data-root m-t' >
                {loaderState ?
                    <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :
                    <form className="add-data-form col-lg-7 col-lg-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
                        <FileUpload className={'m-a'} id='add-data-rcm-file' label='Data Export CSV File' />
                        <button className={"btn btn-success create-btn m-a m-t-md "} type="submit" onClick={this.onProcessFile}>
                            <span className='create-span'>{"UPLOAD"} </span>
                            {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                        </button>
                    </form>}
            </div>
        );
    }
}
