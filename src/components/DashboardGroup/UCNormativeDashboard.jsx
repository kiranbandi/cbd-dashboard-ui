import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { NormativeTable, UCNormativeGraph } from '../';

export default class NormativeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            residentRecords: [],
            residentList: []
        };
        this.processRecordsToTabularFormat = this.processRecordsToTabularFormat.bind(this);
    }

    processRecordsToTabularFormat() {

        const startDate = document.getElementById('normative-filter-startDate') && document.getElementById('normative-filter-startDate').value;
        const endDate = document.getElementById('normative-filter-endDate') && document.getElementById('normative-filter-endDate').value;

        const { residentData = [], residentList = [] } = this.props, residentRecords = _.flatten(residentData);

        // filter the records by dates
        let filteredRecords = _.filter(residentRecords, (d) => {
            return moment(d.Date, 'YYYY-MM-DD').isAfter(moment(startDate, 'MM/DD/YYYY')) && moment(d.Date, 'YYYY-MM-DD').isBefore(moment(endDate, 'MM/DD/YYYY'));
        });

        // process only if records are available
        if (residentRecords.length > 0) {

            const recordsGroupedByResident = _.groupBy(residentRecords, (d) => d.username),
                filteredRecordsGroupedByResident = _.groupBy(filteredRecords, (d) => d.username);

            return _.map(residentList, (resident, residentIndex) => {
                let username = resident + "_" + residentIndex;
                // Let the first day the resident gets a record be the start date 
                let firstResidentRecord = recordsGroupedByResident[username] ? recordsGroupedByResident[username][0] : { 'Date': '2018-07-01' };
                let residentStartDate = moment(firstResidentRecord.Date, "YYYY-MM-DD");

                // Get the number of weeks that have passed since the start of the program
                const weeksPassed = (moment().diff(residentStartDate, "weeks"));
                // Get the number of weeks in the date filter period
                const weeksInPeriod = (moment(endDate, 'MM/DD/YYYY').diff(moment(startDate, 'MM/DD/YYYY'), "weeks"));

                // split expired and non expired epas for all records and filtered records
                let residentAllRecords = _.partition(recordsGroupedByResident[username] || [], (d) => !d.isExpired);
                let residentFilteredRecords = _.partition(filteredRecordsGroupedByResident[username] || [], (d) => !d.isExpired);

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
                    'resident_name': resident,
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

        const processedRecords = this.processRecordsToTabularFormat();
        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let overallWidth = document.body.getBoundingClientRect().width - 125 - 475;

        return (
            <div className='normative-data-container'>
                {processedRecords.length > 0 &&
                    <div className='normative-inner-root'>
                        <UCNormativeGraph
                            residentList={this.props.residentList}
                            width={overallWidth}
                            residentSelect={this.props.selectResident}
                            records={processedRecords} />
                        <NormativeTable
                            width={475}
                            residentSelect={this.props.selectResident}
                            records={processedRecords} />
                    </div>}
            </div>
        );
    }
}

