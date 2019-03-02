/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import Tooltip from './Tooltip';
import { bindActionCreators } from 'redux';
import { showTooltip, setTooltipVisibility, setLevelVisibilityStatus } from '../../redux/actions/actions';
import GraphRow from './GraphRow';
import HeaderRow from './HeaderRow';

class GraphPanel extends Component {

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onEPALabelClick = this.onEPALabelClick.bind(this);
    }

    onEPALabelClick(event) {
        const clickedID = +event.currentTarget.className.split('label-index-')[1];
        let visibilityOpenStatus = { ...this.props.levelVisibilityOpenStatus };
        visibilityOpenStatus[clickedID] = !visibilityOpenStatus[clickedID];
        this.props.actions.setLevelVisibilityStatus(visibilityOpenStatus);
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

        let { residentData,
            isTooltipVisible,
            isEMDepartment = false,
            tooltipData,
            epaSourceMap,
            levelVisibilityOpenStatus } = this.props;

        // if there is no source map provided then use the Emergency medicine Template Map
        epaSourceMap = !!epaSourceMap ? epaSourceMap : templateEpaSourceMap;

        // if no data then set flag to false if not group data by root key
        let epaSourcesThatExist = false;
        if (residentData && Object.keys(residentData).length > 0) {
            epaSourcesThatExist = _.groupBy(Object.keys(residentData), (key) => { return key.split('.')[0] })
        }

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let widthOfRootGraphPanel = document.body.getBoundingClientRect().width - 125;
        let widthPartition = widthOfRootGraphPanel / 4;

        let smallScreen = false;

        if (widthPartition < 200) {
            widthOfRootGraphPanel += 50;
            widthPartition = widthOfRootGraphPanel - 20;
            smallScreen = true;
        }

        return (
            <div>
                {epaSourcesThatExist && <div className='graph-panel-root'>

                    {/* code chunk to show tooltip*/}
                    {isTooltipVisible && <Tooltip {...tooltipData} />}

                    {/* code chunk for displaying titles above the table */}
                    <div className='title-root text-xs-center'>
                        <h4 style={{ width: widthPartition }} className='title-bar'>EPA(Entrustable Professional Activity)</h4>
                        <h4 style={{ width: widthPartition }} className='title-bar'>Observation Count</h4>
                        <h4 style={{ width: smallScreen ? widthPartition : widthPartition * 2 }} className='title-bar'>Score History</h4>
                    </div>

                    {/* This is the main container which houses the table contents */}
                    <div style={{ width: widthOfRootGraphPanel }} className='panel-inner-root'>
                        {_.map(epaSourcesThatExist, (epaSources, innerKey) => {

                            let isCurrentSubRootVisible = levelVisibilityOpenStatus[innerKey];

                            return (
                                <div className="inner-sub-root" key={'sub-root-' + innerKey}>

                                    {/* EPA Label Row head that can be clicked to expand or collapse */}
                                    <HeaderRow
                                        onEPALabelClick={this.onEPALabelClick}
                                        innerKey={innerKey}
                                        smallScreen={smallScreen}
                                        isCurrentSubRootVisible={isCurrentSubRootVisible}
                                        residentData={residentData}
                                        epaSourceMap={epaSourceMap} />

                                    {/* Atual Row data containing labels and bullet and line charts */}
                                    <div className={'inner-graph-row ' + (isCurrentSubRootVisible ? 'show-row' : 'hide-row')}>
                                        {_.map(epaSources, (epaSource, sourceKey) => {
                                            return (
                                                <GraphRow
                                                    key={'inner-row-' + sourceKey}
                                                    innerKey={innerKey}
                                                    onMouseOver={this.onMouseOver}
                                                    onMouseOut={this.onMouseOut}
                                                    epaSource={epaSource}
                                                    widthPartition={widthPartition}
                                                    epaSourceMap={epaSourceMap}
                                                    smallScreen={smallScreen}
                                                    residentData={residentData} />)
                                        })}
                                    </div>

                                </div>)
                        })}
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
        tooltipData: state.oracle.tooltipData,
        levelVisibilityOpenStatus: state.oracle.visibilityOpenStatus
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                showTooltip,
                setTooltipVisibility,
                setLevelVisibilityStatus
            }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphPanel);
