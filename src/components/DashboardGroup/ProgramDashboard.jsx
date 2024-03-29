import React, { Component } from 'react';
import { getAllData, getResidentList } from '../../utils/requestServer';
import Loading from 'react-loading';
import { ROTATION_SCHEDULE_MAP } from '../../utils/programInfo';
import ProgramAllYearsSummary from '../ProgramEvaluationGroup/ProgramAllYearsSummary';
import ProgramBasePanel from '../ProgramEvaluationGroup/ProgramBasePanel';
import EPACompletionDistribution from '../ProgramEvaluationGroup/EPACompletionDistribution';
import EPAOverallbyRotation from '../ProgramEvaluationGroup/EPAOverallbyRotation';
import savePagePDF from '../../utils/savePagePDF';
import infoTooltipReference from '../../utils/infoTooltipReference';
import moment from 'moment';

const possibleAcademicYears = _.map(_.keys(ROTATION_SCHEDULE_MAP),
    (d) => ({ 'label': d + "-" + (Number(d) + 1), 'value': d }));


export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            academicYear: { 'label': '2020-2021', 'value': '2020' },
            allRecords: [],
            residentList: [],
            printModeON: false
        };
        this._isMounted = false;
        this.onPrintClick = this.onPrintClick.bind(this);
    }

    onPrintClick(event) {

        const { programInfo } = this.props, { programName = 'Program' } = programInfo;

        this.setState({ printModeON: true });
        // give a gap of 2 seconds to ensure everything has changed
        // quick hack fix
        setTimeout(() => {
            // move to the top of the page
            window.scrollTo(0, 0);
            let filename = programName + '_export_' + moment().format('DD_MMM') + '.pdf';
            // once printing is complete reset back to original state
            savePagePDF(filename, false, false, 'prog').finally(() => {
                this._isMounted && this.setState({ printModeON: false });
            });
            // wait a couple of seconds, quick hack to fix bug
        }, 500);


    }

    componentDidMount() {
        // initialize empty map
        let { residentList = [] } = this.state;
        // set flag to indicate component is mounted
        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents to get rotation count from schedule
        getResidentList(false)
            .then((response) => {
                residentList = _.clone(response);
                // now get all the records in DB for a given program
                return getAllData();
            })
            .then((data) => {
                this._isMounted && this.setState({ residentList, allRecords: _.clone(data) });
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const { allRecords = [], residentList, printModeON } = this.state,
            { programInfo } = this.props,
            fullWidth = document.body.getBoundingClientRect().width - 300;

        return (
            <div className='m-a dashboard-root-program m-b-lg' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin'
                        height='100px' width='100px'
                        color='#d6e5ff' delay={- 1} /> :
                    <div className='container-fluid'>
                        {allRecords.length > 0 ?
                            <div>
                                {printModeON &&
                                    <div className='on-screen-cover-banner'>
                                        <h2 className='text-center m-t-lg text-primary'>Generating Export of Program Metrics, Please Wait...</h2>
                                    </div>}
                                <ProgramAllYearsSummary
                                    width={fullWidth}
                                    allRecords={allRecords}
                                    programInfo={programInfo}
                                    possibleAcademicYears={_.reverse(possibleAcademicYears.slice(1))}
                                    printModeON={printModeON} />

                                <EPACompletionDistribution
                                    width={fullWidth}
                                    possibleAcademicYears={possibleAcademicYears}
                                    programInfo={programInfo}
                                    records={allRecords}
                                    printModeON={printModeON} />

                                <ProgramBasePanel
                                    width={fullWidth - 50}
                                    allRecords={allRecords}
                                    programInfo={programInfo}
                                    residentList={residentList}
                                    possibleAcademicYears={possibleAcademicYears}
                                    printModeON={printModeON} />
                            </div>
                            : <h2 className='text-center text-danger m-t-lg'>No program data available currently</h2>}
                        {/* TODO - Fix and enable export PDF */}
                        {/* <button
                            id='print-report'
                            className="btn btn-primary print-button"
                            onClick={this.onPrintClick}>
                            <span className="icon icon-download"></span>
                            <span className="icon-label">Report</span>
                            <s-tooltip border-width="1px" orientation="left" max-width="800px" show-delay="1000" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.programEvaluation.Report}</s-tooltip>
                        </button> */}
                    </div>}
            </div >
        );
    }
}


