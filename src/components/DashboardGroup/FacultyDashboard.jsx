import React, { Component } from 'react';
import _ from 'lodash';
import { getAllData } from '../../utils/requestServer';
import moment from 'moment';
import { FacultyFilterPanel, NormativeTable, NormativeGraph, StatCard } from '../';
import Loading from 'react-loading';


export default class NormativeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            rotationList: [],
            allResidentRecords: []
        };
        this._isMounted = false;
        this.processRecordsToTabularFormat = this.processRecordsToTabularFormat.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        // turn loader on
        this.setState({ isLoaderVisible: true });

        getAllData()
            .then((allResidentRecords) => {
                let recordsGroupedByRotation = _.groupBy(allResidentRecords, (d) => d.rotationTag);
                // sub in another category called "ALL" which is essentially all the records 
                recordsGroupedByRotation['ALL'] = allResidentRecords;
                // create a list with the name and count of each rotation
                let rotationList = _.map(recordsGroupedByRotation, (records, key) => ({
                    'label': key,
                    'count': records.length,
                })).sort((a, b) => b.count - a.count);
                this._isMounted && this.setState({ allResidentRecords, rotationList, isLoaderVisible: false });
            })
            // toggle loader again once the request completes
            .catch(() => {
                console.log("error in fetching all resident records");
                this._isMounted && this.setState({ allResidentRecords, isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }




    processRecordsToTabularFormat() {

        const startDate = document.getElementById('faculty-filter-startDate') && document.getElementById('normative-filter-startDate').value;
        const endDate = document.getElementById('faculty-filter-endDate') && document.getElementById('normative-filter-endDate').value;
        const currentRotation = document.getElementById('filter-rotationList') && document.getElementById('filter-rotationList').value;

        const { allResidentRecords = [], residentList = [] } = this.state;

        // filter the records by dates
        let filteredRecords = _.filter(allResidentRecords, (d) => {
            return moment(d.observation_date, 'YYYY-MM-DD').isAfter(moment(startDate, 'MM/DD/YYYY')) && moment(d.observation_date, 'YYYY-MM-DD').isBefore(moment(endDate, 'MM/DD/YYYY'));
        });


        // process only if records are available
        if (allResidentRecords.length > 0) {

            const recordsGroupedByResident = _.groupBy(allResidentRecords, (d) => d.username),
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
                if (isNaN(averageEPAsPerWeek)) {
                    averageEPAsPerWeek = 0;
                }
                if (isNaN(averageEPAsPerWeekPeriod)) {
                    averageEPAsPerWeekPeriod = 0;
                }
                if (isNaN(expiry_rate)) {
                    expiry_rate = 0;
                }
                if (isNaN(expiry_rate_period)) {
                    expiry_rate_period = 0;
                }

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

        const { rotationList = [], allResidentRecords = [] } = this.state, processedRecords = this.processRecordsToTabularFormat();

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let overallWidth = document.body.getBoundingClientRect().width - 125;

        const dateFilterActive = document.getElementById('filter-FCdateFilterActive') && document.getElementById('filter-FCdateFilterActive').checked;

        return (
            <div className='normative-data-container'>

                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div>
                        <FacultyFilterPanel
                            rotationList={rotationList}
                            onSubmit={this.onSubmit} />
                        {allResidentRecords.length > 0 &&
                            <div>
                                {
                                    (this.state.dateFilterActive) ?
                                        <div>
                                            <StatCard dual={true} title='EPAs observed' type='info' metric={properObserverDataList.length} secondMetric={properObserverDataListInDateRange.length} />
                                            <StatCard dual={true} title='Percentage of EPAs Expired' type='success' metric={expiredRecordPrecentage + '%'} secondMetric={expiredRecordPrecentageInDateRange + '%'} />
                                            <StatCard dual={true} title='Average EPA Score' type='primary' metric={averageEPAScore} secondMetric={averageEPAScoreInDateRange} />
                                            <StatCard dual={true} title='Average words per comment' type='danger' metric={wordsPerComment} secondMetric={wordsPerCommentInDateRange} />
                                        </div> :
                                        <div>
                                            <StatCard title='EPAs observed' type='info' metric={properObserverDataList.length} />
                                            <StatCard title='Percentage of EPAs Expired' type='success' metric={expiredRecordPrecentage + '%'} />
                                            <StatCard title='Average EPA Score' type='primary' metric={averageEPAScore} />
                                            <StatCard title='Average words per comment' type='danger' metric={wordsPerComment} />
                                        </div>
                                }
                            </div>

                            // <div className='normative-inner-root'>
                            //     <NormativeGraph
                            //         width={overallWidth - (dateFilterActive ? 600 : 450)}
                            //         records={processedRecords} />
                            //     <NormativeTable
                            //         width={dateFilterActive ? 600 : 450}
                            //         records={processedRecords} />
                            // </div>

                        }
                    </div>
                }
            </div>
        );
    }
}

