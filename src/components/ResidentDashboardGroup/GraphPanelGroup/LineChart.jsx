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

    // If any EPA has a professionalism or safety concern
    // Add a small exclaimation point right under the EPA
    _.map(props.data, (d, i) => {
        if (d.concern) {
            let yShifter = d.pureData.Rating == '1' ? - 50 : 0;
            elementList.push(<path
                key={"concern-point-" + i}
                className='concern-point'
                fill="#d64646"
                transform={"translate(" + (d.x - 15) + "," + (yShifter + d.y + 10) + ") scale(0.095)"}
                d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027
            c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236
            c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209
            S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972
            c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723
            c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843
            C160.878,195.732,152.878,187.723,143.036,187.723z"/>)
        }
    })


    return (
        <svg height={props.innerHeight} width={props.width} className='score-svg' >
            <path className='score-spark-line' d={d3Line(props.data)}></path>
            <TrackTrails trackTrailPositions={props.trackTrailPositions} />
            <g>{elementList}</g>
        </svg>)
}
