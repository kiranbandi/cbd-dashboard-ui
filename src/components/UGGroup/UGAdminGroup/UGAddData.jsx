import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import getFileByPath from '../../../utils/getFileByPath';
import toastr from '../../../utils/toastr';
import Loading from 'react-loading';
import { setUGRecords } from '../../../utils/requestServer';
import { read, utils } from 'xlsx';
import moment from 'moment';

export default class AddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            multiFileList: [],
            multiProcessStatus: []
        }
        this.onProcessMultiFile = this.onProcessMultiFile.bind(this);
    }

    async onProcessMultiFile() {
        event.preventDefault();
        const { multiFileList = [] } = this.state;

        let multiProcessStatus = _.map(multiFileList, (d) => ({ 'status': 'info', 'message': 'Processing...' })) || [];

        if (multiFileList.length > 0) {

            // turn on file processing loader
            this.setState({ processing: true, multiProcessStatus });

            var epaDataList = [];

            // Process each uploaded file seperately
            for (const [fileIndex, file] of multiFileList.entries()) {

                try {
                    // First get the file by its file path
                    const fileContents = await getFileByPath(file),
                    workbook = read((new Uint8Array(fileContents)), {type: 'array'}),
                    defaultSheet = workbook.SheetNames[0],
                    dataInRows = utils.sheet_to_json(workbook.Sheets[defaultSheet]);

                    let referenceColumns = dataInRows[0];
                    // remove the first and last entries. The first entry is the column names and the last entry is the average count
                    let actualData = dataInRows.slice(1,-1);

                    let remappedData = actualData.map((d) => {
                        let store = {};
                        Object.keys(referenceColumns).forEach((column) => {
                            store[referenceColumns[column]] = d[column];
                        });
                        return store;
                    });

                    let processedData = remappedData.map((d) => {

                        let handoverAssessor = d["Name of assessor completing this form:"] || d["Name of assessor completing this EPA form:"] || d["Their first name and last name:"];
                        let observerName = handoverAssessor? handoverAssessor: d["Evaluator first name"]+" "+(d["Evaluator middle name"]?d["Evaluator middle name"]+" ":"")+d["Evaluator last name"];
        
                        let patientType = d["Patient Type:"];
                        let admissionType = d["Admission Type:"];
                        let handoverType = d["Handover type:"];
        
                        let feedback = d["Narrative feedback to the learner (include any concerns about professionalism):"];
        
                        feedback = handoverType? "Handover Type: " + handoverType + ", Feedback: " + feedback: feedback;
        
                        return {
                                "epa": String(Number(d["Form name"].slice(19,21))),
                                "resident_name": d["Target first name"]+" "+(d["Target middle name"]?d["Target middle name"]+" ":"")+d["Target last name"],
                                "username": d["Target email"].split("@")[0].trim().toLocaleLowerCase(),
                                "observer_name": observerName,
                                "observation_date": moment(d["Evaluation completed date"],'DD-MMM-YYYY').format('YYYY-MM-DD'),
                                "observer_type": "",
                                "year_tag": String(d["Target grad year"]),
                                "rating": String(d["Observation Rating: (Numerical Answer)"]),
                                "rotationTag": d["Rotation / course:"].trim().toLocaleLowerCase(),
                                "feedback": feedback,
                                // patient type is rewritten under situation_context
                                "situation_context": (patientType?patientType:'').toLocaleLowerCase().trim(),
                                    // admission type is rewritten under professionalism_safety
                                "professionalism_safety": (admissionType?admissionType:'').toLocaleLowerCase().trim(),
                                "type": "app",
                                "isExpired": false,
                                "phaseTag": "",
                                "program": "UNDERGRADUATE",
                        }
                    });

                    epaDataList = epaDataList.concat(processedData);
                    multiProcessStatus[fileIndex] = { 'status': 'success', 'message': 'File processed without any errors.' };

                } catch (error) {
                    console.log(error);
                    multiProcessStatus[fileIndex] = { 'status': 'danger', 'message': 'Error in processing/uploading file.' };
                }
            }

            try {
            await setUGRecords(epaDataList);
            toastr["success"]("UGME Data has been successfully updated", "SUCCESS");
            } catch (error) {
                toastr["error"]("Sorry there was an error in processing the uploaded files", "ERROR");
            }
            // turn the loader off and set the process status 
            this.setState({ processing: false, multiProcessStatus });
        }
    }

    render() {
        let { processing, multiFileList = [], multiProcessStatus = [] } = this.state;

        return (
            <div className='add-data-root m-t' >
                 <div className="add-data-form col-lg-7 col-lg-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
                    <form>
                    <p className='text-warning'> The data in the dashboard is completely cleared and updated with the new files after each upload. Sp please upload all corresponding EPA files at the same time.</p>
                    <Dropzone onDrop={multiFileList => this.setState({ multiFileList })}>
                        {({ getRootProps, getInputProps }) => (
                            <section className='dropzone-container'>
                                <div className='dropzone' {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop all the EPA data files here</p>
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
                        <span className='create-span'>{"UPLOAD DATA"} </span>
                        {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                    </button>
                </form>
                </div>
            </div>
        );
    }
}
