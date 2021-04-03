import React, { Component } from 'react';
import { getRecordsByYear, getAllResidentsList } from '../utils/requestServer';
import { processMultiProgramRecords } from '../utils/processMultiProgramRecords';
import Loading from 'react-loading';
import Switch from 'react-switch';
import ReactSelect from 'react-select';
import { ROTATION_SCHEDULE_MAP, PROGRAM_LIST } from '../utils/programInfo';
import {
    ProgramSummary, ProgramCountPlot, ProgramMonthlyPlot,
    NormalizedProgramCountPlot, SingleProgramSummary,
    ProgramFeedbackDistribution, ProgramEPACompletion,
    ProgramScoreDistribution, ProgramWordCount, ProgramStageDistribution
} from '../components';
import savePagePDF from '../utils/savePagePDF';

var nonUGProgramList = _.filter(PROGRAM_LIST, (d) => d.value != 'UNDERGRADUATE');

const possibleAcademicYears = _.map(_.keys(ROTATION_SCHEDULE_MAP), (d) => (
    { 'label': d + "-" + (Number(d) + 1), 'value': d }
));

const alphabetList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],

    // we get the number of alphabets required based on the number of available programs
    // then we flip the list so the character ordering is easy to read and chart is 
    // rendered from bottom to top
    anonymizeCharList = _.reverse(alphabetList.slice(0, nonUGProgramList.length));


export default class ProgramsCompare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            academicYear: { 'label': '2020-2021', 'value': '2020' },
            loaderState: false,
            // Default to the first program
            activeProgram: nonUGProgramList[0].value,
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

    onSelectProgram = (selectedProgram) => {
        this.setState({ 'activeProgram': selectedProgram.value });
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
                this.setState({ residentList, 'programData': processMultiProgramRecords(records, residentList, nonUGProgramList) });
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
            this.setState({ 'programData': processMultiProgramRecords(records, this.state.residentList, nonUGProgramList) });
        })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ loaderState: false });
            });
    }

    render() {

        const { loaderState, programData, activeProgram,
            academicYear, anonymize, printModeON } = this.state;

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let overallWidth = document.body.getBoundingClientRect().width - 350,
            partWidth = overallWidth / 2;

        const moddedProgramData = _.map(programData, (d, i) => {
            let isActiveProgram = d.program == activeProgram,
                programName = d.programName;
            // if anonymize is true then replace program name for all programs
            // except for 'all' entry with P-Index/Alphabet.
            if (!isActiveProgram && d.programName != 'Overall' && anonymize) {
                programName = 'Program-' + anonymizeCharList[i];
            }
            return { ...d, programName, isActiveProgram };
        });

        return (
            <div className='m-a program-compare-root container-fluid' >
                {printModeON &&
                    <div className='on-screen-cover-banner'>
                        <h2 className='text-center m-t-lg text-primary'>Generating PDF Export, Please Wait...</h2>
                    </div>}
                <div className='m-t text-center'>
                    <div className='multi-selection-box'>
                        <h2 className='header'>Academic Year</h2>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={academicYear}
                                options={possibleAcademicYears}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectAcademicYear} />
                        </div>
                    </div>

                    <div className='multi-selection-box'>
                        <h2 className='header'>Program</h2>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={_.find(nonUGProgramList, (e) => e.value == activeProgram)}
                                options={nonUGProgramList}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectProgram} />
                        </div>
                    </div>

                    <span className='filter-switch-container'>
                        <span className='switch-label'>Anonymize Program Names</span>
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
                                <SingleProgramSummary programData={_.find(moddedProgramData, (d) => d.isActiveProgram) || {}} printModeON={printModeON} />
                                <div className='text-center printable-content'
                                    style={{ paddingTop: printModeON ? '200px' : '' }}>
                                    <ProgramCountPlot activeProgram={activeProgram} width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                    <NormalizedProgramCountPlot activeProgram={activeProgram} width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                </div>
                                <div className='text-center printable-content'
                                    style={{ paddingTop: printModeON ? '200px' : '' }}>
                                    <ProgramScoreDistribution activeProgram={activeProgram} width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                    <ProgramStageDistribution activeProgram={activeProgram} width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                </div>
                                <div className='text-center printable-content'
                                    style={{ paddingTop: printModeON ? '200px' : '' }}>
                                    <ProgramWordCount activeProgram={activeProgram} width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                    <ProgramFeedbackDistribution activeProgram={activeProgram} width={partWidth} programData={moddedProgramData} printModeON={printModeON} />
                                </div>
                                <div className='text-center printable-content'
                                    style={{ paddingTop: printModeON ? '200px' : '' }}>
                                    <ProgramEPACompletion activeProgram={activeProgram} width={(partWidth * 2)} programData={moddedProgramData} printModeON={printModeON} />
                                </div>
                                <ProgramMonthlyPlot width={overallWidth} printModeON={printModeON} programData={_.reverse([...moddedProgramData])} />
                            </div>}
                        {/* Disabled print button due to broken functionality */}
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


