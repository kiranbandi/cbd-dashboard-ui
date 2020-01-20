import React, { Component } from 'react';
import { FileUpload } from '../../';
import getFile from '../../../utils/getFile';
import processUGFile from '../../../utils/processUGFile';
import toastr from '../../../utils/toastr';
import Loading from 'react-loading';
import { setUGRecords, getResidentList, registerUser } from '../../../utils/requestServer';

const possibleYearTags = [{ label: 'Mobile App Export', value: 'app' }, { label: '145 System Export', value: '145' }, { label: 'Paper Files', value: 'paper' }];
const possibleCohorts = ["2020", "2021", "2022", "2023", "2024", "2025"];
export default class AddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            yearTag: 'app',
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

        const { residentList, yearTag = 'app', cohort = '2020' } = this.state,
            residentNSIDlist = _.map(residentList, (d) => d.username);

        // turn on file processing loader
        this.setState({ processing: true });
        // fetch the file from the system and then process it 
        getFile('add-data-rcm-file', true)
            .then((response) => { return processUGFile(response) })
            .then((processedOutput) => {

                let { studentRecords, studentList } = processedOutput;
                if (studentRecords.length > 0) {
                    // Get the list of students who dont have profiles in the system
                    const nonMappedStudents = _.filter(studentList, (d) => residentNSIDlist.indexOf(d.username) == -1);

                    if (nonMappedStudents.length > 0) {
                        toastr["warning"](_.map(nonMappedStudents, (d) => d.name.toUpperCase()).join(", "), "Unmapped Students");
                        toastr["warning"]("The following students dont have a corresponding user profile or a record with a wrong entry so their data will be ignored, Please create a profile for them and try again", "New Students Found on File");
                        const nonMappedNSIDList = _.map(nonMappedStudents, (d) => d.username);
                        studentRecords = _.filter(studentRecords, (d) => nonMappedNSIDList.indexOf(d.username) > -1);
                        return setUGRecords(studentRecords, yearTag + '_' + cohort);
                    }
                    else {
                        return setUGRecords(studentRecords, yearTag + '_' + cohort);
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
            .catch(() => {
                toastr["error"]("Failed to process files , Please try again.", "ERROR");
            })
            // turn off file processing loader
            .finally(() => { this.setState({ processing: false }) });

    }

    render() {
        let { processing, loaderState, yearTag, cohort } = this.state;

        return (
            <div className='add-data-root m-t' >

                {loaderState ?
                    <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :

                    <form className="add-data-form col-lg-7 col-lg-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">

                        <div className="input-group m-a">
                            <span className='inner-span' style={{ width: '165px' }}>DATA TYPE</span>
                            <select name="yearTag" className='custom-select' value={yearTag} onChange={this.onSelectYearTag}>
                                {possibleYearTags.map((yearSlot, index) =>
                                    <option key={'tag-' + (index + 1)} value={yearSlot.value}>
                                        {yearSlot.label}
                                    </option>)}
                            </select>
                        </div>

                        <div className="input-group m-a">
                            <span className='inner-span' style={{ width: '165px' }}>COHORT</span>
                            <select name="yearTag" className='custom-select' value={cohort} onChange={this.onSelectCohort}>
                                {possibleCohorts.map((cohort, index) =>
                                    <option key={'cohort-' + (index + 1)} value={cohort}>
                                        {cohort}
                                    </option>)}
                            </select>
                        </div>

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