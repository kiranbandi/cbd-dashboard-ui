import React, { Component } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs';

export default class WeeklyEPAChart extends Component {

    constructor(props) {
        super(props);
    }


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

        let datasets = [{
            label: "EPA Count by Week",
            fillColor: "rgba(28,168,221,0.05)",
            strokeColor: "steelblue",
            pointColor: "steelblue",
            data: _.map(weekList, (d) => d.count)
        }];

        // if there is a date range
        if (!residentFilter.isAllData) {

            let filterStart = moment(residentFilter.startDate, 'MM/DD/YYYY'),
                filterEnd = moment(residentFilter.endDate, 'MM/DD/YYYY');

            //  if a date period is selected count all the weekIDs in that period
            // then if that weekID exists in the last 25 weeks chart mark it so its highlighted
            let periodWeekIDcollection = [];
            while (filterStart.isBefore(filterEnd)) {
                const periodweekNumber = filterStart.week(),
                    periodyearNumber = filterStart.year();
                periodWeekIDcollection.push(periodweekNumber + "-" + periodyearNumber);
                filterStart = filterStart.add(1, 'week');
            }

            datasets.push({
                label: "EPA Count by Week in Selected Range",
                fillColor: "rgba(28,168,221,0.35)",
                strokeColor: "rgba(28,168,221,0)",
                pointColor: "rgba(28,168,221,0)",
                data: _.map(weekList, (d) => {
                    return periodWeekIDcollection.indexOf(d.weekID) > -1 ? d.count : 0;
                })
            });
        }
        // create line object for chart
        const lineData = {
            labels: _.map(weekList, (d) => d.label),
            datasets
        }

        let lineOptions = {
            scaleBeginAtZero: true,
            animation: false
        };

        return (
            <div className='resident-weekly-graph'>
                <Line
                    redraw={true}
                    options={lineOptions}
                    data={lineData}
                    width={width} height={200} />
            </div>)
    }

}

