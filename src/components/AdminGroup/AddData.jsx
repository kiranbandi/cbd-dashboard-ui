import React, { Component } from 'react';
import { FileUpload } from '../';
import getFile from '../../utils/getFile';
import processRCMFile from '../../utils/processRCMFile';
import toastr from '../../utils/toastr';
import Loading from 'react-loading';
import moment from 'moment';
import { getResidentList, setRecords } from '../../utils/requestServer';
import rotationScheduleMap from '../../utils/rotationScheduleMap';

const possibleYearTags = ['2018-1', '2018-2', '2019-1', '2019-2', '2020-1', '2020-2', 'all'];
const possibleSlots = {
    '1': 'Jan 1st - Jun 30th',
    '2': 'Jul 1st - Dec 31st',
}
const possiblePhases = ['transition-to-discipline', 'foundations-of-discipline', 'core-of-discipline', 'transition-to-practice'];

// Data is updated in two slots for each year
// Jan 1 to Jun 30 - Slot 1
// Jul 1 to Dec 31 - Slot 2

export default class AddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: true,
            processing: false,
            userList: [],
            username: '',
            yearTag: '',
            fullname: '',
            userData: {},
            selectedIndex: 0,
            warningGiven: false
        }
        this.onProcessFile = this.onProcessFile.bind(this);
        this.onSelectUsername = this.onSelectUsername.bind(this);
        this.onSelectYearTag = this.onSelectYearTag.bind(this);
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
            this.setState({ selectedIndex, yearTag: '', username: user.username, fullname: user.fullname, userData: { ...user }, warningGiven: false });
        }
    }

    onSelectYearTag(event) {
        if (event.target.value != 'default-tag') {
            const yearTag = event.target.value;
            this.setState({ yearTag });
        }
    }

    onProcessFile(event) {
        event.preventDefault();
        const { username, fullname, warningGiven, yearTag, userData } = this.state;
        if (username.length > 0 && yearTag.length > 0) {
            // turn on file processing loader
            this.setState({ processing: true });
            // fetch the file from the system and then process it 
            getFile('add-data-rcm-file')
                .then((response) => { return processRCMFile(response) })
                .then((processedOutput) => {
                    let { data } = processedOutput,
                        { rotationSchedule = {}, promotedDate = [], currentPhase } = userData;


                    //  append every record with two tags 
                    // first phase tag is to identify which phase resident was in when the epa was completed
                    // the second tag is the rotation tag to identify which rotation the resident was in

                    _.map(data, (record, recordID) => {

                        // get the rotation list for the academic year in which the record lies
                        let rotationScheduleList = rotationScheduleMap[record.academicYear];

                        //  find the rotation slot in which the record lies
                        let rotationIndex = _.findIndex(rotationScheduleList, (slotStart, slotIndex) => {
                            const periodStartDate = moment(slotStart, "DD-MMM-YYYY"),
                                endingDate = moment(rotationScheduleList[slotIndex + 1], "DD-MMM-YYYY");
                            return moment(record.Date, 'YYYY-MM-DD').isBetween(periodStartDate, endingDate, 'days', '(]');
                        })

                        // find the rotation in which the resident was during that slot
                        let rotationTag = rotationSchedule[record.academicYear] ?
                            (rotationSchedule[record.academicYear][rotationIndex] ?
                                rotationSchedule[record.academicYear][rotationIndex] : 'EM') : 'EM';


                        let phaseList = ['TTD', 'F', 'CORE', 'TP'], phaseIndex = 0;

                        // code block for assigning phase tag
                        if (promotedDate.length > 0) {
                            phaseIndex = _.reduce(promotedDate, (accu, dateStamp, dateStampIndex) => {
                                // datestamp is the date on which the user was promoted to the next phase
                                // if the record is after the datestamp it means record is in the next phase
                                if (moment(record.Date, 'YYYY-MM-DD').isAfter(moment(dateStamp, 'MM/DD/YYYY'))) {
                                    return dateStampIndex + 1;
                                }
                                // if not return the accumulator which has the index of the last matching phase
                                return accu;
                            }, 0);
                        }

                        // tag the record with the two tags
                        data[recordID]['PhaseTag'] = phaseList[phaseIndex];
                        data[recordID]['rotationTag'] = rotationTag;
                    });

                    // List of records that have a Resident_Name different than
                    // the selected full name, which means there could have been a mistake
                    // while the files were uploaded so cross check with the user
                    var mismatchedRecords = data.filter((record) => record.Resident_Name != fullname);

                    var recordsOutsideTimeperiod = data.filter((record) => {
                        //  no check if user is updating all records
                        if (yearTag == 'all') {
                            return false;
                        }
                        else {
                            return yearTag != record.yearTag;
                        }
                    })

                    // Dont let user set records if the file has records outside the selected timeperiod
                    if (recordsOutsideTimeperiod.length > 0) {
                        toastr["error"]("There are " + recordsOutsideTimeperiod.length + " records which were recorded outside the selected time period, Please check your export file again.", "TIME PERIOD ERROR");
                        return Promise.resolve(false);
                    }
                    else {
                        if (mismatchedRecords.length > 0 && !warningGiven) {
                            toastr["warning"]("There are " + mismatchedRecords.length + " records which dont have a resident name that matches with the selected resident name.If you are okay with this select upload again", "ERROR");
                            this.setState({ warningGiven: true });
                            // resolve the promise without an error but throw a false flag incase of warning
                            return Promise.resolve(false);
                        }
                        else {
                            return setRecords(data, username, yearTag);
                        }
                    }
                })
                .then((data) => {
                    // If there were no mismatched records or the warning was overidden
                    if (!!data) {
                        const { insertedCount } = data;
                        toastr["success"](insertedCount + " records were added for user " + username, "SUCCESS");
                        // reset form params
                        this.setState({ selectedIndex: 0, username: '', fullname: '', userData: {} });
                    }
                })
                .catch(() => {
                    toastr["error"]("Failed to process files , Please try again.", "ERROR");
                })
                // turn off file processing loader
                .finally(() => { this.setState({ processing: false }) });
        }
        else {
            toastr["error"]("Select an NSID and a Timeperiod before you upload the data ", "ERROR");
        }

    }

    render() {
        let { loaderState, processing, selectedIndex, userList, yearTag } = this.state;

        // Sort the residents alphabetically so that they are easier to look up
        userList.sort((previous, current) => previous.fullname.localeCompare(current.fullname));

        return (
            <div className='add-data-root m-t' >
                {
                    loaderState ?
                        <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :

                        <form className="add-data-form col-lg-7 col-lg-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">

                            <div className="input-group m-a">
                                <span className='inner-span'>RESIDENT NSID</span>
                                <select name="username" className='custom-select' value={'user-' + selectedIndex} onChange={this.onSelectUsername}>
                                    <option key={'user-default'} value={'user-0'} >{'Select NSID'}</option>
                                    {userList.map((user, index) => <option key={'user-' + (index + 1)} value={'user-' + (index + 1)} >{user.fullname} - {user.username}</option>)}
                                </select>
                            </div>

                            <div className="input-group m-a">
                                <span className='inner-span'>TIME PERIOD (Dates inclusive)</span>
                                <select name="yearTag" className='custom-select' value={yearTag} onChange={this.onSelectYearTag}>
                                    <option key={'yeartag-default'} value={'default-tag'} >{'Select Timeperiod'}</option>
                                    {possibleYearTags.map((yearSlot, index) => {
                                        if (yearSlot == 'all') {
                                            return <option
                                                key={'yeartag-all'}
                                                value={yearSlot} >
                                                {'update all records / No Timeperiod'}
                                            </option>
                                        }
                                        else {
                                            return <option
                                                key={'user-' + (index + 1)}
                                                value={yearSlot} >
                                                {yearSlot.split('-')[0] + " (" + possibleSlots[yearSlot.split('-')[1]] + ")"}
                                            </option>
                                        }
                                    })}
                                </select>
                            </div>

                            <FileUpload className={'m-a'} id='add-data-rcm-file' label='Royal College Data Export File' />
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



function getAcademicYear(timestamp) {



}