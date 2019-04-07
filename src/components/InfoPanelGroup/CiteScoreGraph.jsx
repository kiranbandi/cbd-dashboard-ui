import React from 'react';
import { line, curveCardinal, scaleLinear } from 'd3';

export default (props) => {

    // remove non numbers so that they dont screw up the plot
    let citeScoreData = props.citeExamScoreList.filter((d) => !isNaN(d));
    const d3Line = line().curve(curveCardinal).x((d) => d.x).y((d) => d.y);

    //125px to offset the 30px margin on both sides and vertical scroll bar width
    let widthOfRoot = document.body.getBoundingClientRect().width - 155;

    const innerHeight = 200,
        marginHorizontal = 20,
        marginVertical = 20,
        width = (widthOfRoot < 800) ? widthOfRoot : widthOfRoot / 2;

    const xScale = scaleLinear().domain([0, citeScoreData.length - 1]).range([marginHorizontal, width - marginHorizontal])
    const yScale = scaleLinear().domain([100, 0]).range([marginVertical, innerHeight - marginVertical])

    const pointsList = citeScoreData.map((d, i) => {
        return {
            x: xScale(i),
            y: yScale(d),
            value: d
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


    return (
        <div className='cite-exam-score-container'>
            <div className="hr-divider">
                <h4 className="hr-divider-content">Canadian In-Training Exam Scores (Percentile in Cohort)</h4>
            </div>
            <svg height={innerHeight} width={width} className='cite-svg' >
                {dotList.length == 0 &&
                    <text x={(width - 190) / 2} y={innerHeight / 2} className="no-data-banner">No Records Available</text>}
                <path
                    className='score-spark-line'
                    d={d3Line(pointsList)}></path>
                {dotList}
                {textPointList}
            </svg>
        </div>)

}


