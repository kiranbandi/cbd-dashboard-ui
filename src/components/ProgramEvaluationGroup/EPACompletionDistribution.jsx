import React from 'react';
import { Bar } from 'react-chartjs';

export default (props) => {

    const { programInfo: { epaSourceMap }, records, width } = props;
    const epaObservationMap = {};
    Object.values(epaSourceMap)
        .map(d => Object.entries(d.maxObservation).map(dd => ({ epa: dd[0], maxObservation: dd[1] })))
        .flat()
        .filter(d => epaSourceMap[d.epa.split('.')[0]].subRoot[d.epa].substring(0, 4) !== '(SA)')
        .forEach(d => epaObservationMap[d.epa] = { max: d.maxObservation, total: 0 });
    records
        .filter(d => epaSourceMap[d.epa.split('.')[0]].subRoot[d.epa].substring(0, 4) !== '(SA)')
        .forEach(d => {
            epaObservationMap[d.epa].total++;
        });
    const epaGroupObservationMap = Object.entries(epaObservationMap)
        .reduce((map, currentEntry) => {
            const epaGroup = currentEntry[0].split('.')[0];
            if (!map[epaGroup]) {
                map[epaGroup] = { max: 0, total: 0 };
            }
            map[epaGroup].max += currentEntry[1].max;
            map[epaGroup].total += currentEntry[1].total;
            return map;
        }, {});
    const epaPercentageList = Object.entries(epaObservationMap).map(d => {
        const result = {
            epa: d[0],
            percentageMax: d[1].max / epaGroupObservationMap[d[0].split('.')[0]].max,
            percentageTotal: d[1].total / epaGroupObservationMap[d[0].split('.')[0]].total,
        };
        result.percentageOffset = result.percentageTotal / result.percentageMax;
        return result;
    });

    const data = {
        labels: epaPercentageList.map(d => d.epa),
        datasets: [
            {
                label: "Default",
                fillColor: "rgba(26,73,56,.9)",
                strokeColor: "rgba(26,73,56,.9)",
                highlightFill: "rgba(220,220,220,.9)",
                highlightStroke: "rgba(220,220,220,.9)",
                data: epaPercentageList.map(d => d.percentageOffset.toFixed(2))
            }
        ]
    };

    const options = {
        scaleShowGridLines : true,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: false,
        scaleGridLineColor : "rgb(255,0,0)",
        scaleGridLineWidth : 1,
    }

    return (
        <div className='col-xs-12 reel-in-left epa-specific'>
            <div className='m-a program-vis-box row'>
                <h3 className='text-left m-b'>EPA Completion Distribution</h3>
                <div className='col-xs-12'>
                    {data.labels.length > 0 ? <Bar
                        options={options}
                        data={data}
                        width={width} height={350}
                        redraw={true} /> :
                        <h3 className='error-code text-left m-b'>No Records</h3>
                    }
                </div>
            </div>
        </div>
    );
}