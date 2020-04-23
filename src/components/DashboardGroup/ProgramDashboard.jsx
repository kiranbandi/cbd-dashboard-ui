import React, { Component } from 'react';
import { getAllData, getResidentList } from '../../utils/requestServer';
import Loading from 'react-loading';
import { ROTATION_SCHEDULE_MAP } from '../../utils/programInfo';
import ProgramBasePanel from '../ProgramEvaluationGroup/ProgramBasePanel';
import EPACompletionDistribution from '../ProgramEvaluationGroup/EPACompletionDistribution';

const possibleAcademicYears = _.map(_.keys(ROTATION_SCHEDULE_MAP),
    (d) => ({ 'label': d + "-" + (Number(d) + 1), 'value': d }));

export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            academicYear: { 'label': '2019-2020', 'value': '2019' },
            allRecords: [],
            residentList: []
        };
        this._isMounted = false;
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

        const { allRecords = [], residentList } = this.state, { programInfo } = this.props,
            fullWidth = document.body.getBoundingClientRect().width - 250;

        return (
            <div className='m-a dashboard-root-program m-b-lg' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin'
                        height='100px' width='100px'
                        color='#d6e5ff' delay={- 1} /> :
                    <div className='container-fluid'>
                        {allRecords.length > 0 ?
                            <div className='row'>
                                <ProgramBasePanel
                                    width={fullWidth}
                                    allRecords={allRecords}
                                    programInfo={programInfo}
                                    residentList={residentList}
                                    possibleAcademicYears={possibleAcademicYears} />
                                <EPACompletionDistribution
                                    width={fullWidth}
                                    programInfo={programInfo}
                                    records={allRecords} />
                            </div>
                            : <h2 className='text-center text-danger m-t-lg'>No program data available currently</h2>}
                    </div>}
            </div >
        );
    }
}


