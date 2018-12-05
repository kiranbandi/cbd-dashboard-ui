/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import epaSourceMap from '../utils/epaSourceMap';
import { line, scaleLinear } from 'd3';
import TrackTrails from './TrackTrails';

class GraphPanel extends Component {

    constructor(props) {
        super(props);
    }

    getBulletChart(residentData, epaSourcesThatExist) {
        return _.map(epaSourcesThatExist, (epaSources, innerKey) => {
            return <div className='observation-outer' key={'observation-outer-' + innerKey}>
                {_.map(epaSources, (epaSource, sourceKey) => {
                    const rectSize = Math.min((residentData[epaSource].length / 20) * 250, 250);
                    return <svg height={200} width={300} className='observation-svg' key={'observation-svg-' + sourceKey}>
                        <g>
                            <rect fill={'#eee'} className='bullet-range' width="280" height="25" x="20" y="10"></rect>
                            <rect fill={'lightsteelblue'} className='bullet-measure' width={250} height="10" x="35" y="17.5"></rect>
                            <rect fill={'steelblue'} className='bullet-measure' width={rectSize} height="10" x="35" y="17.5"></rect>
                        </g>
                    </svg>
                })}
            </div>;
        })
    }

    initialiseTrackTrails(positions, trackType) {

        return _.each(markerPositions, (markerList, markerListId) => {
            let multiplier = markerListId == 'source' ? -66 : 16;
            _.each(markerList, (marker) => {
                for (let looper = 0; looper <= 5; looper++) {
                    trackTrailPostions.push({
                        x: marker.x,
                        dx: marker.dx,
                        y: marker.y + multiplier + (looper * 10)
                    });
                }
            });
        });


    }


    getLineChart(residentData, epaSourcesThatExist) {


        // get d3 line function that returns path
        let d3Line = line().x((d) => d.x).y((d) => d.y);


        var marginVertical = 20;
        var marginHorizontal = 20;

        var height = 180;
        var width = 500;


        var yScale = scaleLinear().domain([1, 5]).range([marginVertical, height - marginVertical])

        var trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: marginHorizontal,
                dx: width - (2 * marginHorizontal),
                y: yScale(i + 1)
            }
        })

        return _.map(epaSourcesThatExist, (epaSources, innerKey) => {
            return <div className='score-outer' key={'score-outer-' + innerKey}>
                {_.map(epaSources, (epaSource, sourceKey) => {


                    var xScale = scaleLinear().domain([0, residentData[epaSource].length - 1]).range([marginHorizontal, width - marginHorizontal])

                    var data = residentData[epaSource].map((d, i) => {
                        return { x: xScale(i), y: yScale(d.Rating) };
                    });


                    return <svg height={200} width={500} className='score-svg' key={'score-svg-' + sourceKey}>
                        <path className='score-spark-line' d={d3Line(data)}></path>
                        <g>
                            {_.map(data, (d, i) => {
                                return <circle r={4} className='score-point' key={'score-point-' + i} cx={d.x} cy={d.y}></circle>;
                            })}
                        </g>
                        <TrackTrails trackTrailPositions={trackTrailPositions} />
                    </svg>

                })}
            </div>;
        })



    }

    render() {

        let { residentData } = this.props;

        let epaSourcesThatExist = residentData ? _.groupBy(Object.keys(residentData), (key) => { return key.split('.')[0] }) : false;

        return (
            <div>
                {epaSourcesThatExist && <div className='m-a-md graph-panel-root'>

                    <div className='title-root'>
                        <h4 className='title-bar small-container'>EPA(Entrustable Professional Activity)</h4>
                        <h4 className='title-bar small-container'>Observation Count</h4>
                        <h4 className='title-bar big-container'>Score History</h4>
                    </div>

                    <div className='p-l-md epa-root small-container'>
                        {_.map(epaSourcesThatExist, (epaSources, innerKey) => {
                            return <div key={'inner-epa-' + innerKey}>
                                <div className='inner-epa-head'>
                                    <span className="icon icon-chevron-right"></span>
                                    <span className='epa-label' >{innerKey + " - " + epaSourceMap[innerKey].topic}</span>
                                </div>
                                <div className='inner-epa-body'>
                                    {_.map(epaSources, (epaSource, sourceKey) => {
                                        return <span className='epa-label inner-offset-label' key={'epa-cell-' + sourceKey} > {epaSource + " - " + epaSourceMap[innerKey].subRoot[epaSource]}</span>
                                    })}
                                </div>
                            </div>;
                        })}
                    </div>


                    <div className='p-a-0 observation-root small-container'>
                        {this.getBulletChart(residentData, epaSourcesThatExist)}
                    </div>
                    <div className='p-r-md score-root big-container'>
                        {this.getLineChart(residentData, epaSourcesThatExist)}
                    </div>

                </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { residentData: state.oracle.residentData };
}

export default connect(mapStateToProps, null)(GraphPanel);
