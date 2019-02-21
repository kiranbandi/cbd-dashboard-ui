import React from 'react';
import TrackTrails from './TrackTrails';
import { line, scaleLinear } from 'd3';

export default (props) => {

    const { residentData, epaSourcesThatExist, widthPartition,onMouseOver,onMouseOut } = props;
    // get d3 line function that returns path
    let d3Line = line().x((d) => d.x).y((d) => d.y);
    // margin of 10px on either side reduces the available width by 20
    var marginVertical = 20;
    var marginHorizontal = 20;
    var height = 200;
    var innerHeight = height - 20;
    var width = (widthPartition * 2) - 20;

    var yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])

    var trackTrailPositions = _.map([...Array(5)], (d, i) => {
        return {
            x: marginHorizontal,
            dx: width - (2 * marginHorizontal),
            y: yScale(i + 1)
        }
    })

    return <div style={{ width: widthPartition * 2 }} className='p-a-0 score-root panel-container'>

        {_.map(epaSourcesThatExist, (epaSources, innerKey) => {
            return <div className='score-outer' key={'score-outer-' + innerKey}>
                {_.map(epaSources, (epaSource, sourceKey) => {


                    var xScale = scaleLinear().domain([0, residentData[epaSource].length - 1]).range([marginHorizontal, width - marginHorizontal])

                    var data = residentData[epaSource].map((d, i) => {
                        return { x: xScale(i), y: yScale(d.Rating) };
                    });

                    return <div style={{ height: height }} key={'score-svg-' + sourceKey}>
                        <svg height={innerHeight} width={width} className='score-svg' >
                            <path className='score-spark-line' d={d3Line(data)}></path>
                            <TrackTrails trackTrailPositions={trackTrailPositions} />
                            <g>
                                {_.map(data, (d, i) => {
                                    return <circle id={'point-inner-' + epaSource + '-outer-' + i} onMouseOver={onMouseOver} onMouseOut={onMouseOut} r={6} className='score-point' key={'score-point-' + i} cx={d.x} cy={d.y}></circle>;
                                })}
                            </g>

                        </svg>
                    </div>

                })}
            </div>;
        })}
    </div>
}