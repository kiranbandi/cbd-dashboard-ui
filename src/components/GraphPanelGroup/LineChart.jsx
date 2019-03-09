import React from 'react';
import { line } from 'd3';
import TrackTrails from './TrackTrails';

export default (props) => {

    // get d3 line function that returns path
    let d3Line = line().x((d) => d.x).y((d) => d.y);

    return (
        <svg height={props.innerHeight} width={props.width} className='score-svg' >
            <path className='score-spark-line' d={d3Line(props.data)}></path>
            <TrackTrails trackTrailPositions={props.trackTrailPositions} />
            <g>
                {_.map(props.data, (d, i) =>
                    <circle
                        id={'point-inner-' + props.epaSource + '-outer-' + i}
                        onMouseOver={props.onMouseOver}
                        onMouseOut={props.onMouseOut}
                        r={props.smallScreen ? 3 : 6}
                        className='score-point'
                        key={'score-point-' + i}
                        fill={d.color}
                        cx={d.x} cy={d.y}>
                    </circle>
                )}
                {(props.overShotLineX != 0) &&
                    <line className='over-shot-line'
                        x1={props.overShotLineX} y1="0"
                        x2={props.overShotLineX} y2="180"
                        strokeWidth='3'
                        strokeLinecap='round'
                        stroke="#b44646"
                        strokeDasharray="8" />}
            </g>
        </svg>)
}
