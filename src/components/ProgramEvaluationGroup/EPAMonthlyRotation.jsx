import React from 'react';
import { Line } from 'react-chartjs';
import moment from 'moment';

const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default (props) => {

    const { filteredRecords, width } = props;
    // Create empty map for all months
    let monthCount = {};
    // Count records for each month
    _.map(filteredRecords, (d) => {
        let monthKey = moment(d.observation_date, 'YYYY-MM-DD').format('MMM');
        if (monthCount.hasOwnProperty(monthKey)) {
            monthCount[monthKey] += 1;
        }
        else {
            monthCount[monthKey] = 1;
        }
    });
    // create line object for chart
    const lineData = {
        labels: monthList,
        datasets: [{
            label: "Rotations",
            fillColor: "rgba(28,168,221,.03)",
            strokeColor: "#43b98e",
            pointColor: "#43b98e",
            pointStrokeColor: 'rgba(28,168,221,.03)',
            pointHighlightFill: "rgba(28,168,221,.03)",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: _.map(monthList, (d) => monthCount[d] || 0)
        }]
    }

    let lineOptions = {
        scaleBeginAtZero: true
    };

    return (
        <div className='col-sm-6 col-xs-12 reel-in-left'>
            <div className='m-a program-vis-box row'>
                <h3 className='text-left m-b'>EPA Monthly Distribution</h3>
                <div className='col-xs-12'>
                    <Line
                        options={lineOptions}
                        data={lineData}
                        width={width} height={400}
                        redraw={true} />
                </div>
            </div>
        </div>)
}

