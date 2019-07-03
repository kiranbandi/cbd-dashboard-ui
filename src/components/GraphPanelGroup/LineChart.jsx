import React from 'react';
import { line } from 'd3';
import TrackTrails from './TrackTrails';

export default (props) => {

    // get d3 line function that returns path
    const d3Line = line().x((d) => d.x).y((d) => d.y),
        elementSize = props.smallScreen ? 3 : 6,
        elementList = _.map(props.data, (d, i) => {

            if (!d.pureData.mark) {
                return <circle
                    id={'point-inner-' + props.epaSource + '-outer-' + i}
                    onMouseOver={props.onMouseOver}
                    onMouseOut={props.onMouseOut}
                    r={elementSize}
                    className='score-point'
                    key={'score-point-' + i}
                    fill={d.highlight ? '#ff6a6a' : '#252830'}
                    cx={d.x} cy={d.y}>
                </circle>
            }

            return <polygon
                id={'point-inner-' + props.epaSource + '-outer-' + i}
                points={(d.x - elementSize) + "," + d.y + " " + d.x + "," + (d.y + elementSize) + " " + (d.x + elementSize) + "," + d.y + " " + (d.x) + "," + (d.y - elementSize) + " " + (d.x - elementSize) + "," + (d.y)}
                className='score-point'
                onMouseOver={props.onMouseOver}
                onMouseOut={props.onMouseOut}
                stroke={d.highlight ? '#ff6a6a' : '#252830'}
                fill={'white'}
                strokeWidth={elementSize / 2}
                key={'score-point-' + i} />

        });


    return (
        <svg height={props.innerHeight} width={props.width} className='score-svg' >
            <path className='score-spark-line' d={d3Line(props.data)}></path>
            <TrackTrails trackTrailPositions={props.trackTrailPositions} />
            <g>{elementList}</g>
        </svg>)
}
