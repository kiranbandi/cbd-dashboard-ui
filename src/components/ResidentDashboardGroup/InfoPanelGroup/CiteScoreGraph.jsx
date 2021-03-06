import React from 'react';
import { line, curveCardinal, scaleLinear } from 'd3';
import { InfoTip } from '../../';
import infoTooltipReference from '../../../utils/infoTooltipReference';

export default (props) => {

    const { citeScoreData = {}, width } = props, yearsList = _.keys(citeScoreData);

    let citeScoreList = [];
    // For every year get all the datapoints and add them individually 
    // the data points are comma seperated or just a single string
    _.map(yearsList, (yearKey) => {
        // remove non numbers so that they dont screw up the plot
        let dataPointArray = citeScoreData[yearKey].split(",").filter((d) => !isNaN(d))
        _.map(dataPointArray, (dataPoint) => {
            citeScoreList.push({ 'label': yearKey, 'value': +dataPoint })
        })
    })

    const d3Line = line().curve(curveCardinal).x((d) => d.x).y((d) => d.y);

    const innerHeight = 200, margin = 50;

    const xScale = scaleLinear().domain([0, citeScoreList.length - 1]).range([margin, width - margin])
    const yScale = scaleLinear().domain([100, 0]).range([margin, innerHeight - margin])

    const pointsList = citeScoreList.map((d, i) => {
        return {
            x: xScale(i),
            y: yScale(d.value),
            value: d.value,
            label: d.label
        };
    });

    const dotList = _.map(pointsList, (d, i) => {
        return <circle r={12}
            className='cite-score-point'
            key={'point-cite-score-' + i}
            cx={d.x} cy={d.y}>
        </circle>
    })

    const textPointList = _.map(pointsList, (d, i) => {
        return <text
            className='cite-score-text'
            key={'text-cite-score-' + i}
            fill={'white'}
            x={d.x - 8} y={d.y + 4}>
            {d.value}
        </text>
    })

    const yearLabelList = _.map(pointsList, (d, i) => {
        const yearlyLabel = isNaN((+d.label) + 1) ? d.label : d.label + '-' + ((+d.label) + 1);
        return <text
            className='cite-year-label'
            key={'year-label-' + i}
            fill={'#1ca8dd'}
            x={d.x - 30} y={d.y + 30}>
            {yearlyLabel}
        </text>
    })

    return (
        <div className='cite-exam-score-container'>
            <div className="hr-divider">
                <h4 className="hr-divider-content">
                    Written Exam Scores
                    <InfoTip info={infoTooltipReference.residentMetrics.writtenExamScores} />
                </h4>
            </div>
            <svg height={innerHeight} width={width} className='cite-svg' >
                {dotList.length == 0 &&
                    <text x={(width - 190) / 2} y={innerHeight / 2} className="no-data-banner">No Records Available</text>}
                <path
                    className='score-spark-line'
                    d={d3Line(pointsList)}></path>
                {dotList}
                {textPointList}
                {yearLabelList}
            </svg>
        </div>)

}


