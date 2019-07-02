import React, { Component } from 'react';
import { getAllData } from '../../utils/requestServer';
import Loading from 'react-loading';
import { getResidentList } from '../../utils/requestServer';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import moment from 'moment';
import EPAOverallbyRotation from '../ProgramEvaluationGroup/EPAOverallbyRotation';
import EPAMonthlyRotation from '../ProgramEvaluationGroup/EPAMonthlyRotation';
import EPAspecificRotation from '../ProgramEvaluationGroup/EPAspecificRotation';
import RotationSpecificEPA from '../ProgramEvaluationGroup/RotationSpecificEPA';
import EPACompletionRateUnder from '../ProgramEvaluationGroup/EPACompletionRateUnder';
import EPACompletionRateOver from '../ProgramEvaluationGroup/EPACompletionRateOver';

export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            allRecords: [],
            selected: 'all',
            rotationCount: {}
        };
        this._isMounted = false;
        this.selectionChange = this.selectionChange.bind(this);
    }

    selectionChange(event) {
        event.preventDefault();
        let selected = event.target.className.split(" ")[1].split("-")[2];
        this.setState({ selected });
    }

    componentDidMount() {
        // initialize empty map
        let rotationCount = {};

        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents to get rotation count from schedule
        getResidentList()
            .then((residentList) => {
                // temporary stopgap solution 
                var currentResidentList = _.filter(residentList, (d) => (moment(d.programStartDate).isBefore(moment('07/01/2019', 'MM/DD/YYYY'))))

                // count each rotation
                _.map(currentResidentList, (resident) => {
                    _.map(resident.rotationSchedule['2018'], (rotation) => {
                        if (rotationCount.hasOwnProperty(rotation)) {
                            rotationCount[rotation] += 1;
                        }
                        else {
                            rotationCount[rotation] = 1;
                        }
                    });
                })
                return getAllData();
            })
            // now get all the records in DB
            .then((data) => {
                // filter out records that dont have rotation and phase tag on them or are expired
                this._isMounted && this.setState({
                    rotationCount,
                    allRecords: _.filter(data, (d) => !d.isExpired && (!!d.rotationTag && !!d.phaseTag))
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

        const { allRecords, selected, rotationCount } = this.state;

        let width = document.body.getBoundingClientRect().width - 250, filteredRecords = [];
        // for small screens use all available width
        width = width < 800 ? width : width / 2;
        // group records based on the phase the resident was in 
        const phaseGroupedRecords = _.groupBy(allRecords, (d) => d.phaseTag);

        if (selected == 'all') {
            filteredRecords = _.clone(allRecords);
        }
        else {
            filteredRecords = _.clone(phaseGroupedRecords[selected]);
        }

        return (
            <div className='m-a dashboard-root-program' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t text-center'>
                        {filteredRecords.length > 0 ?
                            <div className='row'>
                                <div className='selection-box-container'>
                                    <h2 className='header'>Filter by Resident Phase : </h2>
                                    <div
                                        className={'selection-box box-id-all' + " " + (selected == 'all' ? 'selected-button' : '')}
                                        key={'select-all'}
                                        onClick={this.selectionChange}>
                                        All Phases
                                    </div>
                                    {_.map(templateEpaSourceMap, (inner, i) => {
                                        return <div
                                            className={'selection-box box-id-' + (inner.ID) + " " + (selected == (inner.ID) ? 'selected-button' : '')}
                                            key={'select-' + inner.ID}
                                            onClick={this.selectionChange}>
                                            {inner.topic}
                                        </div>
                                    })}
                                </div>
                                {/* List all vis boxes */}
                                <EPAspecificRotation
                                    width={width}
                                    filteredRecords={filteredRecords} />
                                <RotationSpecificEPA
                                    width={width}
                                    filteredRecords={filteredRecords} />
                                <EPAOverallbyRotation
                                    width={width}
                                    rotationCount={rotationCount}
                                    filteredRecords={allRecords} />
                                <EPAMonthlyRotation
                                    width={width}
                                    filteredRecords={filteredRecords} />
                                <EPACompletionRateUnder
                                    width={width}
                                    selected={selected}
                                    allRecords={allRecords} />
                                <EPACompletionRateOver
                                    width={width}
                                    selected={selected}
                                    allRecords={allRecords} />
                            </div> :
                            <h2 className='text-center text-danger'>No program information is available currently</h2>}
                    </div>}
            </div >
        );
    }
}