import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UCNormativeDashboard, GraphPanel } from '../components';
import getFileByPath from '../utils/getFileByPath';
import processRCMFile from '../utils/processRCMFile';
import downloadCSV from '../utils/downloadCSV';
import { setResidentData, setProgramInfo } from '../redux/actions/actions';
import toastr from '../utils/toastr';
import Loading from 'react-loading';
import axios from 'axios';
import _ from 'lodash';
import ReactSelect from 'react-select';
import Dropzone from 'react-dropzone';
import { PROGRAM_INFO, PROGRAM_LIST } from '../utils/programInfo';

// remove UG from program list
const programList = _.filter(PROGRAM_LIST, e => e.value != 'UNDERGRADUATE');

class UCalgaryDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            dataReady: false,
            epaSourceMap: false,
            program: '',
            fileList: [],
            dataStore: {}
        }
        this.onProcessFile = this.onProcessFile.bind(this);
    }

    componentDidMount() {
        // On this tab make residentData null so that it doesnt interfere with data from the other tabs
        this.props.actions.setResidentData(null);
    }

    componentWillUnmount() {
        //When moving out of the tab force reload the page to avoid side effects from this page to main dashboard
        // location.reload();
    }

    selectResident = (resident) => {
        console.log(resident);
    }

    onProgramChange = (e) => {
        const program = e.value;
        this.props.actions.setProgramInfo(PROGRAM_INFO[program]);
        this.setState({ program });
    }

    async onProcessFile() {
        event.preventDefault();

        const { fileList = [], program } = this.state;

        let dataStore = {
            residentData: [],
            narrativeData: [],
            residentList: []
        }, dataReady = false, residentCount = 0;

        if (fileList.length > 0 && program.length > 0) {
            // turn on file processing loader
            this.setState({ processing: true, dataReady: false });
            // Process each uploaded file seperately
            for (const [fileIndex, file] of fileList.entries()) {
                try {
                    // First get the file by its file path
                    const fileContents = await getFileByPath(file);
                    // Then process the RCM file and extract its contents
                    let processedOutput = await processRCMFile(fileContents, { 'programName': program });
                    // set resident name from user list 
                    let { data, residentName = '', narrativeData = [] } = processedOutput;
                    // store the corresponding data into datastore and remap the username
                    dataStore.residentList.push(residentName);
                    dataStore.residentData.push(_.map(data, d => ({ ...d, 'username': residentName + '_' + residentCount })));
                    dataStore.narrativeData.push(_.map(narrativeData, d => ({ ...d, 'username': residentName + '_' + residentCount })));
                    // increase the resident count
                    residentCount += 1;
                } catch (error) {
                    toastr["error"]("There was an error in processing file - " + file.name, "ERROR");
                }
            }
            // only show dashboard if data is available after processing files
            dataReady = dataStore.residentList.length > 0;
            // turn the loader off and set the process status 
            this.setState({ processing: false, dataStore, dataReady });
        }
        else {
            toastr["error"]("Please select a program and add a file first.", "ERROR");
        }
    }

    render() {
        const { processing, dataReady, program = '', fileList = [], dataStore } = this.state,
            { residentData = [], narrativeData = [], residentList = [] } = dataStore;

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let width = document.body.getBoundingClientRect().width - 125;

        return (
            <div className='tools-root m-t text-xs-left text-sm-left' >
                <div className='container'>
                    <h2 className='text-left text-primary'>University of Calgary - CBME Dashboard</h2>
                    <p className='upload-text-box'> This is a online toolkit designed to visualize CBME data in realtime from RCM(Royal College of Medicine) export files.
                        <br />
                        To use this dashboard, first <b>select the relevent program</b> that the resident belongs to
                        and then <b>upload their RCM export file</b>.
                        <br />
                        Data for several residents can be uploaded at the same time by dragging and dropping their files onto the upload panel below.
                    </p>

                    <div className='react-select-root-filter'>
                        <ReactSelect
                            placeholder='Select Program...'
                            isSearchable={true}
                            value={_.find(programList, e => e.value == program)}
                            options={programList}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                            onChange={this.onProgramChange} />
                    </div>

                    <Dropzone onDrop={fileList => this.setState({ fileList })}>
                        {({ getRootProps, getInputProps }) => (
                            <section className='dropzone-container'>
                                <div className='dropzone' {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop files here</p>
                                    {fileList.length > 0 && <h4 className='text-primary'>{fileList.length} files uploaded</h4>}
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <button className="btn btn-primary-outline m-t process-btn" onClick={this.onProcessFile}>
                        <span className='process-span'>{"VISUALIZE"} </span>
                        {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                    </button>
                </div>
                {dataReady && (residentList.length > 1) &&
                    <div className='container-fluid m-t-lg'>
                        <UCNormativeDashboard residentList={residentList} residentData={residentData} />
                    </div>}

                {/* 
                {dataReady &&
                    <div>
                            {showGraphPanel &&
                                <div>
                                    <GraphPanel
                                        width={width}
                                        smallScreen={smallScreen}
                                        epaSourceMap={epaSourceMap} />
                                </div>}
                    </div>} */}
            </div >
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setResidentData, setProgramInfo }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(UCalgaryDashboard);