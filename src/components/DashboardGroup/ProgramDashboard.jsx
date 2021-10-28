import React, { Component } from 'react';
import { getAllData, getRotationSchedules } from '../../utils/requestServer';
import _ from 'lodash';
import ProgramAllYearsSummary from '../ProgramEvaluationGroup/ProgramAllYearsSummary';
// import ProgramBasePanel from '../ProgramEvaluationGroup/ProgramBasePanel';
// import infoTooltipReference from '../../utils/infoTooltipReference';
// import moment from 'moment';

// const possibleAcademicYears = _.map(_.keys(ROTATION_SCHEDULE_MAP),
//     (d) => ({ 'label': d + "-" + (Number(d) + 1), 'value': d }));

export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            // list of all resident records
            allResidentRecords: [],
            academicYearList: []
        };
        this._isMounted = false;
    }


    componentDidMount() {
        this._isMounted = true;
        // turn loader on
        this.setState({ isLoaderVisible: true });

        getAllData()
            .then(({ allResidentRecords, dashboard_epas }) => {
                // create a list of academic years 
                let academicYearList = _.map(_.groupBy(allResidentRecords, (d) => d.Academic_Year), (recs, key) => ({ 'label': key, 'value': key }))
                    .sort((previous, current) => previous.label.localeCompare(current.label));
                // sub in a value at the front of the list for 'ALL'
                academicYearList.unshift({ 'label': 'All', 'value': 'ALL' });
                let residentList = _.keys(_.groupBy(allResidentRecords, (d) => d.username));
                // set the values on the state 
                this._isMounted && this.setState({ allResidentRecords, academicYearList, 'epa_list': [...dashboard_epas], isLoaderVisible: false });
                return getRotationSchedules(residentList);
            })
            .then(() => {
                debugger;
            })
            // toggle loader again once the request completes
            .catch(() => {
                console.log("error in fetching all resident records");
                this._isMounted && this.setState({ allResidentRecords: [], isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const { allResidentRecords = [], academicYearList = [], epa_list } = this.state,
            fullWidth = document.body.getBoundingClientRect().width - 300;

        return (
            <div className='m-a dashboard-root-program m-b-lg' >
                {this.state.isLoaderVisible ?
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div> :
                    <div className='container-fluid'>
                        {allResidentRecords.length > 0 ?
                            <div>
                                <ProgramAllYearsSummary
                                    width={fullWidth}
                                    allRecords={allResidentRecords}
                                    possibleAcademicYears={_.reverse(academicYearList.slice(1))} />
                                {/* <ProgramBasePanel
                                    width={fullWidth - 50}
                                    allRecords={allRecords}
                                    programInfo={programInfo}
                                    residentList={residentList}
                                    possibleAcademicYears={possibleAcademicYears} /> */}
                            </div>
                            : <h2 className='text-primary text-center m-t-lg'>No program data available currently</h2>}
                    </div>}
            </div >
        );
    }
}


