import React, { Component } from 'react';
import _ from 'lodash';
import { getAllData, getResidentList } from '../../utils/requestServer';
import moment from 'moment';
import { NormativeTable, NormativeFilterPanel, NormativeGraph } from '../';
import Loading from 'react-loading';

export default class NormativeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            filterLoaderState: false,
            residentRecords: [],
            residentList: []
        };
        this._isMounted = false;
        this.onSubmit = this.onSubmit.bind(this);
        this.processRecordsToTabularFormat = this.processRecordsToTabularFormat.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        // turn loader on
        this.setState({ isLoaderVisible: true });
        // get list of all residents who have not graduated
        getResidentList(true)
            .then((residentList) => { this.setState({ residentList }) })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching resident list"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    onSubmit() {
        event.preventDefault();
        // toggle loader before fetching data
        this.setState({ filterLoaderState: true, residentRecords: [] });
        // get data of all residents
        // In future this will be replace with names of residents for whom we want 
        // data , or in the resident list
        getAllData()
            .then((residentRecords) => {
                this._isMounted && this.setState({ residentRecords, filterLoaderState: false });
            })
            // toggle loader again once the request completes
            .catch(() => {
                console.log("error in fetching all records");
                this._isMounted && this.setState({ residentRecords, filterLoaderState: false });
            });
    }


    processRecordsToTabularFormat() {

        const startDate = document.getElementById('normative-filter-startDate') && document.getElementById('normative-filter-startDate').value;
        const endDate = document.getElementById('normative-filter-endDate') && document.getElementById('normative-filter-endDate').value;
        const currentPhase = document.getElementById('filter-phaselist') && document.getElementById('filter-phaselist').value;

        const { residentRecords = [], residentList = [] } = this.state;

        // filter the records by dates
        let filteredRecords = _.filter(residentRecords, (d) => {
            return moment(d.observation_date, 'YYYY-MM-DD').isAfter(moment(startDate, 'MM/DD/YYYY')) && moment(d.observation_date, 'YYYY-MM-DD').isBefore(moment(endDate, 'MM/DD/YYYY'));
        });

        const residentsInPhase = (currentPhase == 'all-stages') ? residentList : _.filter(residentList, (res) => res.currentPhase == currentPhase);

        // process only if records are available
        if (residentRecords.length > 0) {

            const recordsGroupedByResident = _.groupBy(residentRecords, (d) => d.username),
                filteredRecordsGroupedByResident = _.groupBy(filteredRecords, (d) => d.username);

            return _.map(residentsInPhase, (resident) => {

                let residentStartDate = moment("01-07-2018", "DD-MM-YYYY");
                // All records we have are from 1st July 2018 , so if someone has 
                //  a valid program start date and this date is after the July 2018 then we use it
                // if not we assume he was from a batch earlier.
                if (resident.programStartDate && moment(resident.programStartDate).isAfter(residentStartDate)) {
                    residentStartDate = moment(resident.programStartDate);
                }
                // Get the number of weeks that have passed since the start of the program
                const weeksPassed = (moment().diff(residentStartDate, "weeks"));
                // Get the number of weeks in the date filter period
                const weeksInPeriod = (moment(endDate, 'MM/DD/YYYY').diff(moment(startDate, 'MM/DD/YYYY'), "weeks"));

                // split expired and non expired epas for all records and filtered records
                let residentAllRecords = _.partition(recordsGroupedByResident[resident.username] || [], (d) => !d.isExpired);
                let residentFilteredRecords = _.partition(filteredRecordsGroupedByResident[resident.username] || [], (d) => !d.isExpired);

                let averageEPAsPerWeek = Math.round((residentAllRecords[0].length / weeksPassed) * 100) / 100;
                let averageEPAsPerWeekPeriod = (weeksInPeriod != 0) ? Math.round((residentFilteredRecords[0].length / weeksInPeriod) * 100) / 100 : 0;

                // get expiry rate percentages
                let expiry_rate = Math.round((residentAllRecords[1].length / (residentAllRecords[0].length + residentAllRecords[1].length)) * 100);
                let expiry_rate_period = Math.round((residentFilteredRecords[1].length / (residentFilteredRecords[0].length + residentFilteredRecords[1].length)) * 100);

                // if values are NaN port them to zero
                averageEPAsPerWeek = averageEPAsPerWeek || 0;
                averageEPAsPerWeekPeriod = averageEPAsPerWeekPeriod || 0;
                expiry_rate = expiry_rate || 0;
                expiry_rate_period = expiry_rate_period || 0;

                return {
                    'resident_name': resident.fullname,
                    'phase': resident.currentPhase.split("-").join(" "),
                    'record_count': residentAllRecords[0].length,
                    'epa_per_week': averageEPAsPerWeek,
                    'expiry_rate': expiry_rate,
                    'record_count_period': residentFilteredRecords[0].length,
                    'epa_per_week_period': averageEPAsPerWeekPeriod,
                    'expiry_rate_period': expiry_rate_period
                };

            });
        }
        return [];
    }


    render() {

        const { filterLoaderState } = this.state, processedRecords = this.processRecordsToTabularFormat();

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let overallWidth = document.body.getBoundingClientRect().width - 125;

        const dateFilterActive = document.getElementById('filter-dateFilterActive') && document.getElementById('filter-dateFilterActive').checked;

        return (
            <div className='normative-data-container'>

                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div>
                        <NormativeFilterPanel
                            filterLoaderState={filterLoaderState}
                            onSubmit={this.onSubmit} />
                        {processedRecords.length > 0 &&
                            <div className='normative-inner-root'>
                                <NormativeGraph
                                    width={overallWidth - (dateFilterActive ? 600 : 450)}
                                    records={processedRecords} />
                                <NormativeTable
                                    width={dateFilterActive ? 600 : 450}
                                    records={processedRecords} />
                            </div>}
                    </div>
                }
            </div>
        );
    }
}

