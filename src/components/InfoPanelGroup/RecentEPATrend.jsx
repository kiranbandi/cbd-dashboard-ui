import React from 'react';
import { line, curveCardinal, scaleLinear } from 'd3';
import TrackTrails from '../GraphPanelGroup/TrackTrails';

export default (props) => {

    // // remove non numbers so that they dont screw up the plot
    // let citeScoreData = props.citeExamScoreList.filter((d) => !isNaN(d));
    // const d3Line = line().curve(curveCardinal).x((d) => d.x).y((d) => d.y);

    //125px to offset the 30px margin on both sides and vertical scroll bar width
    let widthOfRoot = document.body.getBoundingClientRect().width - 155;

    const innerHeight = 200,
        marginHorizontal = 25,
        marginVertical = 25,
        width = (widthOfRoot < 800) ? widthOfRoot : widthOfRoot / 2;

    // const xScale = scaleLinear().domain([0, citeScoreData.length - 1]).range([marginHorizontal, width - marginHorizontal])
    const yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])

    // const pointsList = citeScoreData.map((d, i) => {
    //     return {
    //         x: xScale(i),
    //         y: yScale(d),
    //         value: d
    //     };
    // });

    // const dotList = _.map(pointsList, (d, i) => {
    //     return <circle r={12}
    //         className='cite-score-point'
    //         key={'point-cite-score-' + i}
    //         cx={d.x} cy={d.y}>
    //     </circle>
    // })

    // const textPointList = _.map(pointsList, (d, i) => {
    //     return <text
    //         className='cite-score-text'
    //         key={'text-cite-score-' + i}
    //         fill={'white'}
    //         x={d.x - 8} y={d.y + 4}>
    //         {d.value}
    //     </text>
    // })

    const trackTrailPositions = _.map([...Array(5)], (d, i) => {
        return {
            x: marginHorizontal,
            dx: width - (2 * marginHorizontal),
            y: yScale(i + 1)
        }
    })

    return (
        <div className='recent-epa-container'>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> RECENT EPAs </h4>
            </div>
            <div className='recent-range-selection'>
                <div className='name-box'>
                    <label className='filter-label'>Last</label>
                    <select id='recent-resident-data' className="custom-select">
                        <option value='10'>10 Records</option>
                        <option value='25'>25 Records</option>
                        <option value='1-month'>1 Month</option>
                        <option value='3-month'>3 Months</option>
                    </select>
                    <button className={'btn btn-primary-outline'} >
                        <span className="icon icon-controller-play"></span>
                    </button>

                </div>
            </div>
            <svg height={innerHeight} width={width} className='recent-svg' >
                <TrackTrails trackTrailPositions={trackTrailPositions} />
            </svg>
        </div>)

}


