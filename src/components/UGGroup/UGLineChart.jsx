import React from 'react';
import { line } from 'd3';
import TrackTrails from '../ResidentDashboardGroup/GraphPanelGroup/TrackTrails';

export default (props) => {

    // get d3 line function that returns path
    const d3Line = line().x((d) => d.x).y((d) => d.y);

    let elementSize = props.smallScreen ? 3 : 6,
        currentRotation = props.currentRotation,
        elementList = _.map(props.data, (d, i) => {

            let currentElementSize = elementSize;
            if (currentRotation != 'all' && currentRotation != '') {
                if (d.rotationMark) {
                    currentElementSize += elementSize * .40;
                }
                else {
                    currentElementSize -= elementSize * .50;
                }
            }


            if (!d.mark) {
                return <circle
                    id={'point-inner-' + props.epaSource + '-outer-' + i}
                    onMouseOver={props.onMouseOver}
                    onMouseOut={props.onMouseOut}
                    r={currentElementSize}
                    className='score-point'
                    key={'score-point-' + i}
                    fill={d.highlight ? '#ff6a6a' : '#252830'}
                    cx={d.x} cy={d.y}>
                </circle>
            }

            return <polygon
                id={'point-inner-' + props.epaSource + '-outer-' + i}
                points={(d.x - currentElementSize) + "," + d.y + " " + d.x + "," + (d.y + currentElementSize) + " " + (d.x + currentElementSize) + "," + d.y + " " + (d.x) + "," + (d.y - currentElementSize) + " " + (d.x - currentElementSize) + "," + (d.y)}
                className='score-point'
                onMouseOver={props.onMouseOver}
                onMouseOut={props.onMouseOut}
                stroke={d.highlight ? '#ff6a6a' : '#252830'}
                fill={'white'}
                strokeWidth={currentElementSize / 2}
                key={'score-point-' + i} />

        });


    return (
        <svg height={props.innerHeight} width={props.width} className='score-svg' >
            <path className='score-spark-line' d={d3Line(props.data)}></path>
            <TrackTrails trackTrailPositions={props.trackTrailPositions} />
            <g>{elementList}</g>
        </svg>)
}
