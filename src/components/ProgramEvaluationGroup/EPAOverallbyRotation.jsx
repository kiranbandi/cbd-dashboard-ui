import React from 'react';
import { Bar } from 'react-chartjs';

export default (props) => {

    const { rotationCount, filteredRecords, normalizeByCount = true, rotationList, width } = props;

    // group all the records by their rotation tag
    let groupedRecords = _.groupBy(filteredRecords, (d) => d.rotationTag);
    // Count records for each group and normalize by rotation count for that group
    const programData = _.map(groupedRecords, (group, label) => {
        return {
            value: Math.ceil(group.length / (normalizeByCount ? rotationCount[label] : 1)),
            label
        };
    }).sort((a, b) => (b.value - a.value));


    let lineData = {
        labels: _.map(programData, (d) => d.label),
        datasets: [{
            label: "Rotations",
            fillColor: "rgba(28,168,221,.03)",
            strokeColor: "#43b98e",
            pointColor: "#43b98e",
            pointStrokeColor: 'rgba(28,168,221,.03)',
            pointHighlightFill: "rgba(28,168,221,.03)",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: _.map(programData, (d) => d.value)
        }]
    }

    let lineOptions = {
        scaleBeginAtZero: true
    };

    return (
        <div className='col-sm-6 col-xs-12'>
            <div className='m-a program-vis-box row'>
                <h3 className='text-left m-b'>{normalizeByCount ? 'EPA Count per Rotation' : 'EPA Overall Count'}</h3>
                <p className='text-left text-warn' style={{ color: '#43b98e' }} ></p>
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

