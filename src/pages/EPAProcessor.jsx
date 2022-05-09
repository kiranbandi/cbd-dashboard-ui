import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getFileByPath from '../utils/getFileByPath';
import processRCMFile from '../utils/processRCMFile';
import { setResidentData, setProgramInfo, setResidentFilter, setNarrativeData, setResidentList } from '../redux/actions/actions';
import toastr from '../utils/toastr';
import Loading from 'react-loading';
import moment from 'moment';
import _ from 'lodash';
import FileSaver from 'file-saver';
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
        this.props.actions.setProgramInfo(PROGRAM_INFO[program]);
        this.setState({ program });
    }

    async onProcessFile() {

        event.preventDefault();

        const { fileList = [] } = this.state;
        let overallProgramMap = {};

        if (fileList.length > 0) {
            // turn on file processing loader
            this.setState({ processing: true, dataReady: false });
            // Process each uploaded file seperately
            for (const [fileIndex, file] of fileList.entries()) {
                try {
                    // First get the file by its file path
                    const fileContents = await getFileByPath(file);
                    // Then process the RCM file and extract its contents
                    let processedOutput = await processRCMFile(fileContents);
                    // set resident name from user list 
                    let { epa_codes, epa_assessments } = processedOutput;

                    // Process the epa codes list
                    // Filter out the ones which dont have an effective end date meaning they are actually active now 
                    const filtered_epa_codes = _.filter(epa_codes, d => !d.EPA_END_DATE),
                        filtered_epa_assessments = _.filter(epa_assessments, d => !d.EPA_END_DATE);


                    let programInfo = {
                        programName: filtered_epa_codes[0].SPECIALTY_NAME_ENG,
                        infoCardsVisible: false,
                        examScoresVisible: false,
                        narrativesVisible: true,
                    };

                    let epaSourceMap = {
                        1: {
                            'ID': 'TTD',
                            'topic': 'Transition to Discipline (D)',
                            subRoot: {},
                            maxObservation: {},
                            filterValuesDict: {},
                            assessmentInfo: {}
                        },
                        2: {
                            'ID': 'F',
                            'topic': 'Foundations of Discipline (F)',
                            subRoot: {},
                            maxObservation: {},
                            filterValuesDict: {},
                            assessmentInfo: {}
                        },
                        3: {
                            'ID': 'CORE',
                            'topic': 'Core of Discipline (C)',
                            subRoot: {},
                            maxObservation: {},
                            filterValuesDict: {},
                            assessmentInfo: {}
                        },
                        4: {
                            'ID': 'TP',
                            'topic': 'Transition to Practice (P)',
                            subRoot: {},
                            maxObservation: {},
                            filterValuesDict: {},
                            assessmentInfo: {}
                        }
                    };

                    // Set the EPA title values from EPA code
                    _.map(filtered_epa_codes, f => {
                        epaSourceMap[f.STAGE_ID]['subRoot'][f.STAGE_ID + '.' + f.EPA_SEQUENCE] = f.EPA_TITLE_ENG;
                    });

                    // group the epa assessments by the EPA key 
                    const grouped_epa_keys = _.groupBy(filtered_epa_assessments, d => d.STAGE_ID + '.' + d.EPA_SEQUENCE);
                    _.map(grouped_epa_keys, (filter_data, epa_key) => {

                        // For the same EPA Key there can be mutiple form types and part types 
                        // So then group by part type
                        let grouped_by_part = _.groupBy(filter_data, d => d.PLAN_PART);

                        let maxObservation = 0, assessmentInfo = '', filterValuesDict = { 'Part': [] };

                        _.map(grouped_by_part, (epa_data) => {

                            // use the first datapoint as a reference
                            const datapoint = epa_data[0];

                            const form_part_type = datapoint.ASMNT_TITLE_ENG;
                            // Add the form part type as a contextual value filter
                            filterValuesDict['Part'].push(form_part_type);
                            // Add the assessment info along with the part type, if there is already text in there add a new line
                            assessmentInfo = (assessmentInfo.length > 0 ? assessmentInfo + '\n' : '') + (form_part_type + '\n' + datapoint.ASMNT_DETAILS_ENG);
                            maxObservation += +datapoint.OBSERVATIONS;

                            // only use single value contextual variables since that is the only filter type 
                            _.map(_.filter(epa_data, g => g.DISPLAY_TYPE == 'SINGLE VALUE'), c => {
                                filterValuesDict[c.CONTEXT_ENG] = c.CONTEXT_VALUES_ENG.split(';').map(l => l.trim());
                            });

                        });

                        epaSourceMap[epa_key.split('.')[0]]['maxObservation'][epa_key] = maxObservation;
                        epaSourceMap[epa_key.split('.')[0]]['assessmentInfo'][epa_key] = assessmentInfo;
                        epaSourceMap[epa_key.split('.')[0]]['filterValuesDict'][epa_key] = { ...filterValuesDict };
                    });

                    // set the source map onto program info
                    programInfo['epaSourceMap'] = epaSourceMap;
                    overallProgramMap[programInfo.programName] = programInfo;

                } catch (error) {
                    console.log(error);
                    toastr["error"]("There was an error in processing file - " + file.name, "ERROR");
                }
            }

            // Create a blob of the data
            var fileToSave = new Blob([JSON.stringify(overallProgramMap)], {
                type: 'application/json'
            })
            saveAs(fileToSave, 'programOverallMap.json');

        }
        else {
            toastr["error"]("Please select a program and add a file first.", "ERROR");
        }
    }

    render() {
        const { processing, fileList = [] } = this.state;

        return (
            <div className='tools-root m-t text-xs-left text-sm-left m-b-lg' >
                <div className='container'>

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

export default connect(mapStateToProps, mapDispatchToProps)(UCalgaryDashboard);