import React from 'react';
import { line, curveCardinal,scaleLinear } from 'd3';

export default (props) => {

    // remove non numbers so that they dont screw up the plot
    let citeScoreData = props.citeExamScoreList.filter((d) => !isNaN(d));
    const d3Line = line().curve(curveCardinal).x((d) => d.x).y((d) => d.y);
    citeScoreData = [43, 12, 97, 10, 50];

    const innerHeight = 180,
        marginHorizontal = 10,
        marginVertical = 10,
        width = 500;

    const xScale = scaleLinear().domain([0, citeScoreData.length - 1]).range([marginHorizontal, width - marginHorizontal])
    const yScale = scaleLinear().domain([0, 100]).range([marginVertical, innerHeight - marginVertical])

    const pointsList = citeScoreData.map((d, i) => {
        return {
            x: xScale(i),
            y: yScale(d),
            value: d
        };
    });


    return (
        <div className='cite-exam-score-container'>
            <svg height={180} width={500} className='cite-svg' >
                <path
                    className='score-spark-line'
                    d={d3Line(pointsList)}
                    fill={'none'}
                    stroke={'red'}
                    strokeWidth={'2'}></path>
            </svg>
        </div>)

}


