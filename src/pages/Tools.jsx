import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UCNormativeDashboard, GraphPanel, UCFilterPanel, NarrativeTable, ExpiredRecordTable } from '../components';
import getFileByPath from '../utils/getFileByPath';
import processRCMFile from '../utils/processRCMFile';
import { setResidentData, setProgramInfo, setResidentFilter, setNarrativeData, setResidentList } from '../redux/actions/actions';
import toastr from '../utils/toastr';
import Loading from 'react-loading';
import moment from 'moment';
import _ from 'lodash';
import ReactSelect from 'react-select';
import Dropzone from 'react-dropzone';
import programOverallMap from '../utils/programOverallMap.json';

// remove UG from program list
const programList = _.map(_.keys(programOverallMap), e => ({ 'label': e, 'value': e }));

class Tools extends Component {

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
        location.reload();
    }

    selectResident = (resident = '', showUncommencedEPA = true, openOnlyCurrentPhase = true) => {

        let { residentFilter = {}, actions, programInfo } = this.props;

        const { dataStore } = this.state,
            { residentDataList = [], narrativeDataList = [], residentList = [] } = dataStore;

        // If a resident is provided use it, if not use the preset in the resident filter
        residentFilter.username = resident.length > 0 ? resident : residentFilter.username;
        residentFilter.startDate = document.getElementById('filter-startDate-resident').value;
        residentFilter.endDate = document.getElementById('filter-endDate-resident').value;

        // Fitler out resident info from the list 
        let residentIndex = _.findIndex(residentList, (d) => d.username == residentFilter.username),
            residentInfo = residentList[residentIndex],
            residentData = residentDataList[residentIndex],
            narrativeData = narrativeDataList[residentIndex];

        // if the selected resident is valid and his info is available
        if (residentInfo) {
            // set all the parameters in the resident filter
            actions.setResidentFilter({ ...residentFilter });
            // mark records in the selected date range with a flag
            var markedResidentData = _.map(residentData, (d) => {
                if (residentFilter.isAllData) {
                    d.mark = false;
                }
                else {
                    d.mark = moment(d.Date, 'YYYY-MM-DD').isBetween(moment(residentFilter.startDate, 'MM/DD/YYYY'), moment(residentFilter.endDate, 'MM/DD/YYYY'), 'days', '[]')
                }
                return d;
            })

            // group data on the basis of EPA
            var groupedResidentData = _.groupBy(markedResidentData, (d) => d.EPA);

            // force sort data by Date in each EPA type
            // also if uncommenced EPAs are needed to be seen then sub in empty records
            _.map(programInfo.epaSourceMap, (source) => {
                _.map(source.subRoot, (epa, innerKey) => {
                    if (showUncommencedEPA && !groupedResidentData.hasOwnProperty(innerKey)) {
                        groupedResidentData[innerKey] = [];
                    }
                    if (groupedResidentData[innerKey]) {
                        groupedResidentData[innerKey] = _.sortBy(groupedResidentData[innerKey], (d) => d.Date);
                    }
                })
            })
            // store the info of visibility of phase into resident info
            residentInfo.openOnlyCurrentPhase = openOnlyCurrentPhase;
            actions.setResidentData(groupedResidentData, residentInfo);
            // mark records in the selected date range with a flag
            var markedNarrativeData = _.map(narrativeData, (d) => {
                if (residentFilter.isAllData) {
                    d.mark = false;
                }
                else {
                    d.mark = moment(d.observation_date, 'YYYY-MM-DD').isBetween(moment(residentFilter.startDate, 'MM/DD/YYYY'), moment(residentFilter.endDate, 'MM/DD/YYYY'), 'days', '[]');
                }
                return d;
            })
            actions.setNarrativeData(markedNarrativeData);
        }
    }


    onProgramChange = (e) => {
        const program = e.value;
        this.props.actions.setProgramInfo(programOverallMap[program]);
        this.setState({ program });
    }

    async onProcessFile() {

        event.preventDefault();
        // clear data in the dashboard 
        this.props.actions.setResidentList([]);
        this.props.actions.setNarrativeData([]);
        this.props.actions.setResidentData(null);

        const { fileList = [], program } = this.state;

        let dataStore = {
            residentDataList: [],
            narrativeDataList: [],
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
                    let { data, residentPhase = '', residentName = '', narrativeData = [] } = processedOutput;

                    // store the corresponding data into datastore and remap the username
                    dataStore.residentList.push({ 'fullname': residentName, 'currentPhase': residentPhase, 'username': residentName + '_' + residentCount });
                    dataStore.residentDataList.push(_.map(data, d => ({ ...d, 'username': residentName + '_' + residentCount })));
                    dataStore.narrativeDataList.push(_.map(narrativeData, d => ({ ...d, 'username': residentName + '_' + residentCount })));
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

            if (dataStore.residentList.length > 0) {
                this.props.actions.setResidentList(dataStore.residentList);
                this.selectResident(dataStore.residentList[0].username);
            }

        }
        else {
            toastr["error"]("Please select a program and add a file first.", "ERROR");
        }
    }

    render() {
        const { processing, dataReady, program = '', fileList = [], dataStore } = this.state,
            { residentDataList = [], residentList = [] } = dataStore;


        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let width = document.body.getBoundingClientRect().width - 125;

        return (
            <div className='tools-root m-t text-xs-left text-sm-left m-b-lg' >
                <div className='container'>
                    <h2 className='text-left text-primary text-center'> Royal College ePortfolio Observation Report Visualizer</h2>
                    <p className='upload-text-box'> This is a online toolkit designed to visualize CBME data in realtime from RCM (Royal College of Medicine) export files.

                        To use this dashboard, <br />first <b>select the relevent program</b> that the resident belongs to
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
                                    {fileList.length > 0 && <h4 className='text-info'>{fileList.length} {fileList.length == 1 ? 'file' : 'files'} added</h4>}
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
                        <UCNormativeDashboard selectResident={this.selectResident} residentList={residentList} residentDataList={residentDataList} />
                    </div>}
                {dataReady &&
                    <div>
                        <h2 className='text-primary m-t text-center'>Resident Dashboard</h2>
                        <UCFilterPanel selectResident={this.selectResident} residentList={residentList} />
                        <GraphPanel
                            hideMarkButton={true}
                            nonDemoMode={true}
                            width={width}
                            epaSourceMap={this.props.programInfo.epaSourceMap} />
                        <NarrativeTable />
                        <ExpiredRecordTable />
                    </div>}
            </div >
        );
    }
}


function mapStateToProps(state) {
    return {
        programInfo: state.oracle.programInfo,
        residentFilter: state.oracle.residentFilter,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setResidentData,
            setProgramInfo,
            setResidentFilter,
            setResidentList,
            setNarrativeData
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools);