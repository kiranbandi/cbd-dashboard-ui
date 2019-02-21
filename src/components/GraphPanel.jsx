/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import templateEpaSourceMap from '../utils/epaSourceMap';
import { line, scaleLinear } from 'd3';
import TrackTrails from './TrackTrails';
import { bindActionCreators } from 'redux';
import { showTooltip, setTooltipVisibility } from '../redux/actions/actions';

class GraphPanel extends Component {

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    onMouseOver(event) {
        let { residentData, actions } = this.props;
        let pointId = event.target.id.split("-");
        let data = residentData[pointId[2]][pointId[4]];
        var pageWidth = document.body.getBoundingClientRect().width;
        actions.showTooltip({
            'x': event.pageX + 400 > pageWidth ? event.pageX - 400 : event.pageX,
            'y': event.pageY - 50,
            'feedback': data['Feedback'],
            'name': data['Observer_Name'],
            'date': data['Date'],
            'type': data['Observer_Type'],
            'context': data['Situation_Context']
        });

    }

    onMouseOut(event) {
        this.props.actions.setTooltipVisibility(false);
    }

    getBulletChart(epaSourceMap, residentData, epaSourcesThatExist, widthPartition) {
        // 15px bullet chart padding on either sides
        const innerWidth = widthPartition - 30;
        return _.map(epaSourcesThatExist, (epaSources, innerKey) => {
            return <div className='observation-outer' key={'observation-outer-' + innerKey}>
                {_.map(epaSources, (epaSource, sourceKey) => {
                    // Get the maximum required observations for each EPA from source MAP
                    const maxObservation = +epaSourceMap[epaSource.split(".")[0]].maxObservation[epaSource];
                    const rectSize = Math.min((residentData[epaSource].length / maxObservation) * innerWidth, innerWidth);
                    return <svg height={200} width={widthPartition} className='observation-svg' key={'observation-svg-' + sourceKey}>
                        <g>
                            <rect fill={'#eee'} className='bullet-range' width={widthPartition} height="25" x="0" y="5"></rect>
                            <rect fill={'lightsteelblue'} className='bullet-measure' width={innerWidth} height="10" x="15" y="12.5"></rect>
                            <rect fill={'steelblue'} className='bullet-measure' width={rectSize} height="10" x="15" y="12.5"></rect>
                        </g>
                    </svg>
                })}
            </div>;
        })
    }


    getLineChart(residentData, epaSourcesThatExist, widthPartition) {

        // get d3 line function that returns path
        let d3Line = line().x((d) => d.x).y((d) => d.y);

        var marginVertical = 20;
        var marginHorizontal = 20;

        var height = 200;
        var innerHeight = height - 20;
        var width = widthPartition;

        var yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])

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

                    return <div style={{ height: height }} key={'score-svg-' + sourceKey}>
                        <svg height={innerHeight} width={width} className='score-svg' >
                            <path className='score-spark-line' d={d3Line(data)}></path>
                            <TrackTrails trackTrailPositions={trackTrailPositions} />
                            <g>
                                {_.map(data, (d, i) => {
                                    return <circle id={'point-inner-' + epaSource + '-outer-' + i} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} r={5} className='score-point' key={'score-point-' + i} cx={d.x} cy={d.y}></circle>;
                                })}
                            </g>

                        </svg>
                    </div>

                })}
            </div>;
        })
    }



    render() {

        let { residentData, isTooltipVisible, tooltipData, epaSourceMap } = this.props;

        // if there is no source map provided then use the Emergency medicine Template Map
        epaSourceMap = !!epaSourceMap ? epaSourceMap : templateEpaSourceMap;

        // if no data then set flag to false if not group data by root key
        let epaSourcesThatExist = false;
        if (residentData && Object.keys(residentData).length > 0) {
            epaSourcesThatExist = _.groupBy(Object.keys(residentData), (key) => { return key.split('.')[0] })
        }

        //100px to offset the 30px margin on both sides and vertical scroll bar width
        let widthOfRootGraphPanel = document.body.getBoundingClientRect().width - 125;
        let widthPartition = widthOfRootGraphPanel / 4;

        return (
            <div>
                {epaSourcesThatExist && <div className='graph-panel-root'>

                    {isTooltipVisible &&
                        <div className='graph-tooltip' style={{ 'left': tooltipData.x, 'top': tooltipData.y }}>
                            <p><b>DATE: </b><span>{tooltipData.date}</span> </p>
                            <p><b>SITUATION CONTEXT: </b><span>{tooltipData.context}</span></p>
                            <p><b>OBSERVER NAME: </b><span>{tooltipData.name}</span></p>
                            <p><b>OBSERVER TYPE: </b><span>{tooltipData.type}</span></p>
                            <p><b>FEEDBACK: </b><span>{tooltipData.feedback}</span></p>
                        </div>}

                    <div className='title-root'>
                        <h4 style={{ width: widthPartition }} className='title-bar panel-container'>EPA(Entrustable Professional Activity)</h4>
                        <h4 style={{ width: widthPartition }} className='title-bar panel-container'>Observation Count</h4>
                        <h4 style={{ width: widthPartition * 2 }} className='title-bar panel-container'>Score History</h4>
                    </div>

                    <div style={{ width: widthPartition }} className='p-a-0 epa-root panel-container'>
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

                    <div style={{ width: widthPartition }} className='p-a-0 observation-root panel-container'>
                        {/* margin of 20px on either side reduces the available width by 40 */}
                        {this.getBulletChart(epaSourceMap, residentData, epaSourcesThatExist, widthPartition - 40)}
                    </div>
                    {/* margin of 10px on either side reduces the available width by 20 */}
                    <div style={{ width: widthPartition * 2 }} className='p-a-0 score-root panel-container'>
                        {this.getLineChart(residentData, epaSourcesThatExist, (widthPartition * 2) - 20)}
                    </div>

                </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentData: state.oracle.residentData,
        isTooltipVisible: state.oracle.isTooltipVisible,
        tooltipData: state.oracle.tooltipData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ showTooltip, setTooltipVisibility }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphPanel);
