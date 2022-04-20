import React, { Component } from 'react';
import moment from 'moment';
import { Line, CartesianGrid, XAxis, YAxis, Tooltip, ComposedChart, Area } from 'recharts';
import _ from 'lodash';

export default class WeeklyEPAChart extends Component {

    render() {

        const { residentData, residentFilter, width } = this.props,
            residentDataList = _.flatMap(residentData);

        let residentDataWeeklyGroup = _.groupBy(residentDataList, (d) => {
            return moment(d.Date, 'YYYY-MM-DD').week() + "-" + moment(d.Date, 'YYYY-MM-DD').year();
        });

        // start with current day
        let startDate = moment(), weekList = [];
        // go back by 15 weeks and get every weeks start date end date and its week number and year

        while (weekList.length < 25) {

            const weekStart = startDate.startOf('week').format('DD'),
                weekEnd = startDate.endOf('week').format('DD MMM'),
                weekNumber = startDate.week(),
                yearNumber = startDate.year(),
                weekID = weekNumber + '-' + yearNumber,
                records = residentDataWeeklyGroup[weekID] || [];

            weekList.push({
                count: records.length,
                label: weekStart + "-" + weekEnd,
                weekID
            });

            startDate = startDate.subtract(1, 'week');

        }
        // reverse the week list so its from oldest to current
        weekList = _.reverse(weekList);
        // Show an area chart spadding a timeperiod if one is selected
        const isPeriodActive = !residentFilter.isAllData;
        let periodWeekIDcollection = [];
        // if there is a date range
        if (isPeriodActive) {

            let filterStart = moment(residentFilter.startDate, 'MM/DD/YYYY'),
                filterEnd = moment(residentFilter.endDate, 'MM/DD/YYYY');

            //  if a date period is selected count all the weekIDs in that period
            // then if that weekID exists in the last 25 weeks chart mark it so its highlighted
            while (filterStart.isBefore(filterEnd)) {
                const periodweekNumber = filterStart.week(),
                    periodyearNumber = filterStart.year();
                periodWeekIDcollection.push(periodweekNumber + "-" + periodyearNumber);
                filterStart = filterStart.add(1, 'week');
            }
        }
        // create line object for chart
        const chartData = _.map(weekList, (d) => ({
            'week': d.label,
            'EPA count in week': d.count,
            'EPA count in period': periodWeekIDcollection.indexOf(d.weekID) > -1 ? d.count : 0
        }));


        return (
            <div className='resident-weekly-graph'>
                <ComposedChart width={width}
                    height={200} data={chartData}
                    margin={{ left: 5, right: 5, top: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="category" dataKey="week" />
                    <YAxis width={15} />
                    <Tooltip labelStyle={{ 'color': 'black' }} />
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey={'EPA count in week'}
                        stroke={'steelblue'}
                        strokeWidth={3} />
                    {isPeriodActive &&
                        <Area
                            isAnimationActive={false}
                            type="monotone"
                            dataKey={'EPA count in period'}
                            stroke={'rgba(70, 130, 180,0.5)'}
                            strokeWidth={3} />}
                </ComposedChart>
            </div>)
    }

}

