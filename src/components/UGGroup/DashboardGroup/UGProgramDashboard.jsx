import React, { Component } from 'react';
import { getAllData } from '../../../utils/requestServer';
import Loading from 'react-loading';
import ReactSelect from 'react-select';
import moment from 'moment';
import EPAMonthlyRotation from '../../ProgramEvaluationGroup/UGEPAMonthlyRotation';
import UGEPAspecificRotation from '../../ProgramEvaluationGroup/UGEPAspecificRotation';
import UGRotationSpecificEPA from '../../ProgramEvaluationGroup/UGRotationSpecificEPA';
import EPAOverallbyRotation from '../../ProgramEvaluationGroup/UGEPAOverallbyRotation';

const possibleCohorts = _.map(["2020", "2021", "2022", "2023", "2024", "2025"], (d) => (
    { 'label': d, 'value': d }
));


export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            cohort: { 'label': '2021', 'value': '2021' },
            allRecords: [],
            residentList: [],
            selected: 'all'
        };
        this._isMounted = false;
    }

    componentDidMount() {
        // initialize empty map
        let { residentList = [] } = this.state;

        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents to get rotation count from schedule , no filtering of graduated residents
        getAllData('UG')
            .then((data) => {
                // filter out records that dont have rotation and phase tag on them or are expired
                this._isMounted && this.setState({
                    'residentList':[],
                    allRecords: _.clone(data)
                });
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

        const { allRecords, cohort } = this.state,
            { epaSourceMap } = this.props.programInfo;

        let width = document.body.getBoundingClientRect().width - 250, filteredRecords = [];
        // for small screens use all available width
        width = width < 800 ? width : width / 2;
        // then Filter out records which belong to the selected cohort
        filteredRecords = _.filter(allRecords, (d) => d.year_tag == cohort.value);

        const rotationList = _.keys(_.groupBy(filteredRecords, d => d.rotationTag));

        return (
            <div className='m-a dashboard-root-program' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t text-center'>
                        <div className='row'>
                            <div className='year-selection-box'>
                                <h2 className='header'> COHORT: </h2>
                                <div className='react-select-root'>
                                    <ReactSelect
                                        value={cohort}
                                        options={possibleCohorts}
                                        styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                        onChange={(cohort) => { this.setState({ cohort }) }} />
                                </div>
                            </div>
                        </div>
                        {filteredRecords.length > 0 ?
                            <div className='row'>
                                {/* List all vis boxes */}
                                <UGEPAspecificRotation
                                    width={width}
                                    epaSourceMap={epaSourceMap}
                                    filteredRecords={filteredRecords} />
                                <UGRotationSpecificEPA
                                    width={width}
                                    epaSourceMap={epaSourceMap}
                                    rotationList={rotationList}
                                    filteredRecords={filteredRecords} />
                                <EPAOverallbyRotation
                                    width={width}
                                    normalizeByCount={false}
                                    rotationList={rotationList}
                                    filteredRecords={filteredRecords} />
                                <EPAMonthlyRotation
                                    width={width}
                                    filteredRecords={filteredRecords} />
                            </div> :
                            <h2 className='text-center text-danger m-t-lg'>No program data available for selected cohort</h2>}
                    </div>}
            </div >
        );
    }
}
