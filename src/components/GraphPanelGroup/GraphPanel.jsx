/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import BulletChart from './BulletChart';
import { line, scaleLinear } from 'd3';
import LineChart from './LineChart';
import Tooltip from './Tooltip';
import { bindActionCreators } from 'redux';
import { showTooltip, setTooltipVisibility } from '../../redux/actions/actions';

class GraphPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibilityOpenStatus: {
                1: true,
                2: true,
                3: true,
                4: true
            }
        }
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onEPALabelClick = this.onEPALabelClick.bind(this);
    }

    onEPALabelClick(event) {
        const clickedID = +event.currentTarget.className.split('label-index-')[1];
        let visibilityOpenStatus = { ...this.state.visibilityOpenStatus };
        visibilityOpenStatus[clickedID] = !visibilityOpenStatus[clickedID];
        this.setState({ visibilityOpenStatus });
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

    render() {

        let { residentData, isTooltipVisible, tooltipData, epaSourceMap } = this.props,
            { visibilityOpenStatus } = this.state;

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

        //  margin of 20px on either side reduces the available width by 40 
        // 15px bullet chart padding on either sides
        const bulletInnerWidth = widthPartition - 70;


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



        return (
            <div>
                {epaSourcesThatExist && <div className='graph-panel-root'>

                    {/* code chunk to show tooltip*/}
                    {isTooltipVisible && <Tooltip {...tooltipData} />}

                    {/* code chunk for displaying titles above the table */}
                    <div className='title-root'>
                        <h4 style={{ width: widthPartition }} className='title-bar'>EPA(Entrustable Professional Activity)</h4>
                        <h4 style={{ width: widthPartition }} className='title-bar'>Observation Count</h4>
                        <h4 style={{ width: widthPartition * 2 }} className='title-bar'>Score History</h4>
                    </div>

                    {/* This is the main container which houses the table contents */}
                    <div style={{ width: widthOfRootGraphPanel }} className='panel-inner-root'>

                        {_.map(epaSourcesThatExist, (epaSources, innerKey) => {

                            let isCurrentSubRootVisible = visibilityOpenStatus[innerKey];

                            return (
                                <div className="inner-sub-root" key={'sub-root-' + innerKey}>
                                    {/* EPA Label Row head that can be clicked to expand or collapse */}
                                    <div className={'inner-epa-head label-index-' + innerKey} onClick={this.onEPALabelClick}>
                                        {isCurrentSubRootVisible ? <span className="icon icon-chevron-down"></span> : <span className="icon icon-chevron-right"></span>}
                                        <span className='epa-label' >{innerKey + " - " + epaSourceMap[innerKey].topic}</span>
                                    </div>
                                    {/* Atual Row data containing labels and bullet and line charts */}
                                    <div className={'inner-graph-row ' + (isCurrentSubRootVisible ? 'show-row' : 'hide-row')}>
                                        {/* each container contains 3 boxes of widths 1,1,2 quarters of the total */}
                                        {_.map(epaSources, (epaSource, sourceKey) => {

                                            {/* Get the maximum required observations for each EPA from source MAP */ }
                                            const maxObservation = +epaSourceMap[epaSource.split(".")[0]].maxObservation[epaSource];
                                            const rectSize = Math.min((residentData[epaSource].length / maxObservation) * bulletInnerWidth, bulletInnerWidth);


                                            var xScale = scaleLinear().domain([0, residentData[epaSource].length - 1]).range([marginHorizontal, width - marginHorizontal])

                                            var data = residentData[epaSource].map((d, i) => {
                                                return { x: xScale(i), y: yScale(d.Rating) };
                                            });

                                            return (
                                                <div key={'innermost-row-' + sourceKey} >
                                                    <div style={{ width: widthPartition }} className='inner-cell epa-title-cell'>
                                                        <span className='inner-offset-label'>
                                                            {epaSource + " - " + epaSourceMap[innerKey].subRoot[epaSource]}
                                                        </span>
                                                    </div>
                                                    <div style={{ width: widthPartition }} className='inner-cell observation-cell'>
                                                        <BulletChart widthPartition={widthPartition} bulletInnerWidth={bulletInnerWidth} rectSize={rectSize} />
                                                    </div>
                                                    <div style={{ width: widthPartition * 2 }} className='inner-cell score-cell'>
                                                        <LineChart />
                                                    </div>
                                                </div>)
                                        })}
                                    </div>
                                </div>)
                        })}


                    </div>

                    {/* <LineChartColumn
                        residentData={residentData}
                        epaSourcesThatExist={epaSourcesThatExist}
                        widthPartition={widthPartition}
                        onMouseOver={this.onMouseOver}
                        onMouseOut={this.onMouseOut} />  */}

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
