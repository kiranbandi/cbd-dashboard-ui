import React from 'react';
import { Bar } from 'react-chartjs';

export default (props) => {

    const { rotationCount, filteredRecords, width } = props;

    // group all the records by their rotation tag
    let groupedRecords = _.groupBy(filteredRecords, (d) => d.rotationTag);
    // Count records for each group and normalize by rotation count for that group
    _.map(groupedRecords, (group, groupKey) => {
        groupedRecords[groupKey] = Math.ceil(group.length / rotationCount[groupKey]);
    });

    let lineData = {
        labels: _.map(groupedRecords, (d, key) => key),
        datasets: [{
            label: "Rotations",
            fillColor: "rgba(28,168,221,.03)",
            strokeColor: "#43b98e",
            pointColor: "#43b98e",
            pointStrokeColor: 'rgba(28,168,221,.03)',
            pointHighlightFill: "rgba(28,168,221,.03)",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: _.map(groupedRecords, (d) => d)
        }]
    }

    let lineOptions = {
        scaleBeginAtZero: true
    };

    return (
        <div className='col-sm-6 col-xs-12'>
            <div className='m-a program-vis-box row'>
                <h3 className='text-left m-b'>EPA Count per Rotation</h3>
                <div className='col-xs-12'>
                    <Bar
                        options={lineOptions}
                        data={lineData}
                        width={width} height={400}
                        redraw={true} />
                </div>
            </div>
        </div>)
}

