import React, { Component } from 'react';
import { getRecordsByYear, getAllResidentsList } from '../utils/requestServer';
import { processMultiProgramRecords } from '../utils/processMultiProgramRecords';
import Loading from 'react-loading';
import Switch from 'react-switch';
import ReactSelect from 'react-select';
import { ROTATION_SCHEDULE_MAP, PROGRAM_LIST } from '../utils/programInfo';
import {
    ProgramSummary, ProgramCountPlot, ProgramMonthlyPlot,
    ProgramFeedbackDistribution, ProgramEPACompletion,
    ProgramScoreDistribution, ProgramWordCount, ProgramStageDistribution
} from '../components';
import savePagePDF from '../utils/savePagePDF';



const possibleAcademicYears = _.map(_.keys(ROTATION_SCHEDULE_MAP), (d) => (
    { 'label': d + "-" + (Number(d) + 1), 'value': d }
));

const alphabetList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
    // we get the number of alphabets required based on the number of available programs
    // then we flip the list so the character ordering is easy to read and chart is 
    // rendered from bottom to top
    anonymizeCharList = _.reverse(alphabetList.slice(0, PROGRAM_LIST.length - 1));


export default class ProgramsCompare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            academicYear: { 'label': '2020-2021', 'value': '2020' },
            loaderState: false,
            programData: [],
            residentList: [],
            anonymize: true,
            printModeON: false
        };
        this.onSelectAcademicYear = this.onSelectAcademicYear.bind(this);
        this.onPrintClick = this.onPrintClick.bind(this);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        //  turn loader on
        this.setState({ loaderState: true });

        let residentList = [];
        // first fetch all residents
        // then fetch data for default academic year
        getAllResidentsList()
            .then((response) => {
                residentList = [...response];
                return getRecordsByYear(this.state.academicYear.value, false);
            })
            .then((records) => {
                this.setState({ residentList, 'programData': processMultiProgramRecords(records, residentList, PROGRAM_LIST) });
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ loaderState: false });
            });
    }

    onPrintClick(event) {

        this.setState({ printModeON: true });
        // give a gap of 2 seconds to ensure everything has changed
        // quick hack fix
        setTimeout(() => {
            // move to the top of the page
            window.scrollTo(0, 0);
            let filename = 'Export.pdf';
            // once printing is complete reset back to original state
            savePagePDF(filename, false, false, 'prog').finally(() => {
                this._isMounted && this.setState({ printModeON: false });
            });
            // wait a couple of seconds quick hack
        }, 500);
    }

    onSelectAcademicYear(academicYear) {
        // set the academic year and turn loader on
        this.setState({ academicYear, loaderState: true });
        // fetch data for that specific academic year
        getRecordsByYear(academicYear.value, false).then((records) => {
            this.setState({ 'programData': processProgramRecords(records, this.state.residentList, PROGRAM_LIST) });
        })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ loaderState: false });
            });

    }

    render() {

        const { loaderState, programData, academicYear, anonymize, printModeON } = this.state;

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let overallWidth = document.body.getBoundingClientRect().width - 350,
            partWidth = overallWidth / 2;

        const moddedProgramData = _.map(programData, (d, i) => {
            // if anonymize is true then replace program name for all programs
            // except for 'all' entry with P-Index/Alphabet.
            return {
                ...d,
                'programName': d.programName != 'Overall' ?
                    anonymize ? ('Program-' + anonymizeCharList[i]) : d.programName : d.programName,
            }
        });

        return (
            <div className='m-a program-compare-root container-fluid' >
                {printModeON &&
                    <div className='on-screen-cover-banner'>
                        <h2 className='text-center m-t-lg text-primary'>Generating PDF Export, Please Wait...</h2>
                    </div>}
                <div className='m-t text-center'>
                    <div className='year-selection-box'>
                        <h2 className='header'>Please Select Academic Year</h2>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={academicYear}
                                options={possibleAcademicYears}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectAcademicYear} />
                        </div>
                    </div>
                    <span className='filter-switch-container'>
                        <span className='switch-label'>Anonymize Programs</span>
                        <div className='switch-inner'>
                            <label htmlFor="material-switch-compare">
                                <Switch
                                    checked={anonymize}
                                    onChange={() => { this.setState({ 'anonymize': !anonymize }) }}
                                    onColor="#86d3ff"
                                    onHandleColor="#2693e6"
                                    handleDiameter={20}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={15}
                                    width={35}
                                    className="react-switch"
                                    id="material-switch-compare" />
                            </label>
                        </div>
                    </span>
                </div>
                {loaderState ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t'>
                        {moddedProgramData.length > 0 &&
                            <div>
                                {/* dont include all program entry in the summary calculation */}
                                <ProgramSummary programData={_.filter(moddedProgramData, (d) => d.programName != 'Overall')} printModeON={printModeON} />
                                <div className='text-center printable-content'
                                    style={{ paddingTop: printModeON ? '200px' : '' }}>
                                    <ProgramCountPlot width={(partWidth * 2)} programData={moddedProgramData} printModeON={printModeON} />
                                </div>
                                <div className='text-center printable-content'
                                    style={{ paddingTop: printModeON ? '200px' : '' }}>
                                    <ProgramScoreDistribution width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                    <ProgramStageDistribution width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                </div>
                                <div className='text-center printable-content'
                                    style={{ paddingTop: printModeON ? '200px' : '' }}>
                                    <ProgramWordCount width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                    <ProgramFeedbackDistribution width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                </div>
                                <div className='text-center printable-content'
                                    style={{ paddingTop: printModeON ? '200px' : '' }}>
                                    <ProgramEPACompletion width={(partWidth * 2)} programData={moddedProgramData} printModeON={printModeON} />
                                </div>
                                <ProgramMonthlyPlot width={overallWidth} printModeON={printModeON} programData={_.reverse([...moddedProgramData])} />
                            </div>}
                        {/* Disable print button */}
                        {/* <button id='print-report' className="btn btn-primary print-button" onClick={this.onPrintClick}>
                            <span className="icon icon-download"></span>
                            <span className="icon-label">Report</span>
                        </button> */}
                    </div>
                }

            </div>
        );
    }
}


