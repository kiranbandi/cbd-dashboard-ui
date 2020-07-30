import React, { Component } from 'react';
import { FileUpload } from '../';
import getFile from '../../utils/getFile';
import getFileByPath from '../../utils/getFileByPath';
import processRCMFile from '../../utils/processRCMFile';
import toastr from '../../utils/toastr';
import Loading from 'react-loading';
import moment from 'moment';
import { RadioButton } from '../';
import { getResidentList, setRecords, setNarratives } from '../../utils/requestServer';
import { ROTATION_SCHEDULE_MAP } from '../../utils/programInfo';
import Dropzone from 'react-dropzone'

export default class AddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadType: 'single',
            loaderState: true,
            processing: false,
            userList: [],
            username: '',
            yearTag: 'all',
            fullname: '',
            userData: {},
            selectedIndex: 0,
            warningGiven: false,
            multiFileList: [],
            multiProcessStatus: []
        }
        this.onProcessFile = this.onProcessFile.bind(this);
        this.onSelectUsername = this.onSelectUsername.bind(this);
        this.onSelectYearTag = this.onSelectYearTag.bind(this);
        this.onProcessMultiFile = this.onProcessMultiFile.bind(this);
    }

    componentDidMount() {
        // get list of non graduated residents
        getResidentList(true)
            .then((users) => { this.setState({ userList: [...users] }) })
            .finally(() => { this.setState({ loaderState: false }) });
    }

    onMultiChange = (event) => {
        this.setState({ [event.target.id.split('-')[1]]: event.target.value });
    }

    onSelectUsername(event) {
        if (event.target.value != 'user-0') {
            let { userList } = this.state,
                selectedIndex = event.target.value.split("-")[1],
                user = userList[selectedIndex - 1];
            this.setState({ selectedIndex, username: user.username, fullname: user.fullname, userData: { ...user }, warningGiven: false });
        }
    }

    onSelectYearTag(event) {
        if (event.target.value != 'default-tag') {
            const yearTag = event.target.value;
            this.setState({ yearTag });
        }
    }

    async onProcessMultiFile() {
        event.preventDefault();
        const { yearTag, userList, multiFileList = [] } = this.state;
        const { rotationList } = this.props.programInfo;

        let multiProcessStatus = _.map(multiFileList, (d) => ({ 'status': 'info', 'message': 'Processing...' })) || [];

        if (userList.length > 0 && multiFileList.length > 0) {
            // turn on file processing loader
            this.setState({ processing: true, multiProcessStatus });
            // Process each uploaded file seperately
            for (const [fileIndex, file] of multiFileList.entries()) {
                try {
                    // First get the file by its file path
                    const fileContents = await getFileByPath(file);
                    // Then process the RCM file and extract its contents
                    let processedOutput = await processRCMFile(fileContents);
                    // set resident name from user list 
                    let { data, residentName = '', narrativeData = [] } = processedOutput;
                    let userInFile = _.find(userList, (d) => d.fullname.toLowerCase() == residentName.toLowerCase()) || {};
                    // Find the matching resident from the file
                    // Set username from user list 
                    let { username = '', rotationSchedule = {}, promotedDate = [] } = userInFile;
                    // Only upload data if a matching user is found in the user list 
                    if (username.length > 0 && residentName.length > 0) {
                        // copy narrativeData over to local variable to be sent to server later
                        let narrativeDataList = _.clone(narrativeData);
                        //  append every record with two tags 
                        // first phase tag is to identify which phase resident was in when the epa was completed
                        // the second tag is the rotation tag to identify which rotation the resident was in
                        _.map(data, (record, recordID) => {
                            // get the rotation list for the academic year in which the record lies
                            let rotationScheduleList = ROTATION_SCHEDULE_MAP[record.academicYear];
                            //  find the rotation slot in which the record lies
                            let rotationIndex = _.findIndex(rotationScheduleList, (slotStart, slotIndex) => {
                                const periodStartDate = moment(slotStart, "DD-MMM-YYYY"),
                                    endingDate = moment(rotationScheduleList[slotIndex + 1], "DD-MMM-YYYY");
                                return moment(record.Date, 'YYYY-MM-DD').isBetween(periodStartDate, endingDate, 'days', '(]');
                            })
                            // find the rotation in which the resident was during that slot
                            let rotationTag = rotationSchedule[record.academicYear] ?
                                (rotationSchedule[record.academicYear][rotationIndex] ?
                                    rotationSchedule[record.academicYear][rotationIndex] : rotationList[0]) : rotationList[0];
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
                            data[recordID]['phaseTag'] = phaseList[phaseIndex];
                            data[recordID]['rotationTag'] = rotationTag;
                        });
                        if (data.length > 0) {
                            let { insertedCount } = await setRecords(data, username, yearTag);
                        }
                        if (narrativeDataList.length > 0) {
                            let narrativeResponse = await setNarratives(narrativeDataList, username, yearTag);
                        }
                        multiProcessStatus[fileIndex] = { 'status': 'success', 'message': 'Update successful for resident-' + residentName };
                    }
                    else {
                        multiProcessStatus[fileIndex] = { 'status': 'danger', 'message': 'No matching resident found from name on file.' };
                    }
                } catch (error) {
                    multiProcessStatus[fileIndex] = { 'status': 'danger', 'message': 'Error in processing/uploading file.' };
                }
            }
            // turn the loader off and set the process status 
            this.setState({ processing: false, multiProcessStatus });
        }
    }

    onProcessFile(event) {

        event.preventDefault();
        const { username, fullname, warningGiven, yearTag, userData } = this.state;
        const { rotationList } = this.props.programInfo;
        // create an empty list for narratives that is populated when the file is processed
        let narrativeDataList = [];

        if (username.length > 0 && yearTag.length > 0) {
            // turn on file processing loader
            this.setState({ processing: true });
            // fetch the file from the system and then process it 
            getFile('add-data-rcm-file')
                .then((response) => { return processRCMFile(response) })
                .then((processedOutput) => {
                    let { data, narrativeData = [] } = processedOutput,
                        { rotationSchedule = {}, promotedDate = [] } = userData;

                    // copy narrativeData over to local variable to be sent to server later
                    narrativeDataList = _.clone(narrativeData);

                    //  append every record with two tags 
                    // first phase tag is to identify which phase resident was in when the epa was completed
                    // the second tag is the rotation tag to identify which rotation the resident was in
                    _.map(data, (record, recordID) => {

                        // get the rotation list for the academic year in which the record lies
                        let rotationScheduleList = ROTATION_SCHEDULE_MAP[record.academicYear];

                        //  find the rotation slot in which the record lies
                        let rotationIndex = _.findIndex(rotationScheduleList, (slotStart, slotIndex) => {
                            const periodStartDate = moment(slotStart, "DD-MMM-YYYY"),
                                endingDate = moment(rotationScheduleList[slotIndex + 1], "DD-MMM-YYYY");
                            return moment(record.Date, 'YYYY-MM-DD').isBetween(periodStartDate, endingDate, 'days', '(]');
                        })

                        // find the rotation in which the resident was during that slot
                        let rotationTag = rotationSchedule[record.academicYear] ?
                            (rotationSchedule[record.academicYear][rotationIndex] ?
                                rotationSchedule[record.academicYear][rotationIndex] : rotationList[0]) : rotationList[0];


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
                        data[recordID]['phaseTag'] = phaseList[phaseIndex];
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
                    });

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
                            if (data.length > 0) {
                                return setRecords(data, username, yearTag);
                            }
                            else {
                                toastr["warning"]("There were no valid EPA records in the file you have uploaded so skipping upload", "No Records");
                                return Promise.resolve(false);
                            }

                        }
                    }
                })
                .then((data) => {
                    // If there were no mismatched records or the warning was overidden
                    if (!!data) {
                        const { insertedCount } = data;
                        if (narrativeDataList.length > 0) {
                            return setNarratives(narrativeDataList, username, yearTag);
                        }
                        else {
                            // reset form params
                            this.setState({ selectedIndex: 0, username: '', fullname: '', userData: {} });
                            toastr["success"](insertedCount + " records were added for user " + username, "SUCCESS");
                            Promise.resolve(false);
                        }

                    }
                })
                // once the narrative data is also set
                .then((data) => {
                    // If narrative data was available and set
                    if (!!data) {
                        toastr["success"]("records and narratives were updated for user " + username, "SUCCESS");
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
            toastr["error"]("Select an NSID before you upload the data ", "ERROR");
        }

    }

    render() {
        let { uploadType = 'single', multiFileList = [], multiProcessStatus = [], loaderState, processing, selectedIndex, userList } = this.state;

        // Sort the residents alphabetically so that they are easier to look up
        userList.sort((previous, current) => previous.fullname.localeCompare(current.fullname));

        console.log(multiProcessStatus);

        return (
            <div className='add-data-root m-t' >
                {
                    loaderState ?
                        <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :
                        <div className="add-data-form col-lg-7 col-lg-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
                            <div className="input-group m-a">
                                <span className='inner-span'>UPLOAD TYPE</span>
                                <div className='radio-button-container'>
                                    <RadioButton value={'single'} id={'radio_single-uploadType'} className='track-radio' name='type-select'
                                        label={"SINGLE"}
                                        onChange={this.onMultiChange}
                                        checked={uploadType == 'single'} />
                                    <RadioButton value={'multi'} id={'radio_multi-uploadType'} className='track-radio' name='type-select'
                                        label={"MULTI"}
                                        onChange={this.onMultiChange}
                                        checked={uploadType == 'multi'} />
                                </div>
                            </div>
                            {uploadType == 'single' ?
                                <form>
                                    <div className="input-group m-a">
                                        <span className='inner-span'>RESIDENT NSID</span>
                                        <select name="username" className='custom-select' value={'user-' + selectedIndex} onChange={this.onSelectUsername}>
                                            <option key={'user-default'} value={'user-0'} >{'Select NSID'}</option>
                                            {userList.map((user, index) => <option key={'user-' + (index + 1)} value={'user-' + (index + 1)} >{user.fullname} - {user.username}</option>)}
                                        </select>
                                    </div>
                                    <FileUpload className={'m-a'} id='add-data-rcm-file' label='Royal College Export File' />
                                    <button className={"btn btn-success create-btn m-a m-t-md "} type="submit" onClick={this.onProcessFile}>
                                        <span className='create-span'>{"UPLOAD"} </span>
                                        {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                                    </button>
                                </form> :

                                <form>
                                    <p className='text-warning'> Resident Information is automatically matched based on the name in the file. So please make sure that the resident name matches the name in the export file. Processing several files can take longer so please wait for the confirmation message next to each file after clicking the upload button.</p>
                                    <Dropzone onDrop={multiFileList => this.setState({ multiFileList })}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section className='dropzone-container'>
                                                <div className='dropzone' {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag and drop all the resident export files here</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    <div className='multi-file-container'>
                                        {_.map([...multiFileList], (fileRef, fileIndex) => {
                                            const processStatus = multiProcessStatus[fileIndex] || false;
                                            return <p key={'multi-file-key-' + fileIndex}
                                                id={'multi-file-' + fileIndex}
                                                className='multi-file-upload'>
                                                {fileRef.name} {processStatus && <span className={'text-' + processStatus.status}> {processStatus.message}</span>}
                                            </p>
                                        })}
                                    </div>

                                    <button className={"btn btn-success create-btn m-a m-t-md "} type="submit" onClick={this.onProcessMultiFile}>
                                        <span className='create-span'>{"UPLOAD MULTIPLE FILES"} </span>
                                        {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                                    </button>
                                </form>}

                        </div>

                }
            </div>
        );
    }
}

