/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTooltip, setLevelVisibilityStatus } from '../../../redux/actions/actions';
import GraphRow from './GraphRow';
import HeaderRow from './HeaderRow';
import Tooltip from './Tooltip';


class GraphPanel extends Component {

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onEPALabelClick = this.onEPALabelClick.bind(this);
        this.onTableExpandClick = this.onTableExpandClick.bind(this);
        this.onFilterExpandClick = this.onFilterExpandClick.bind(this);
        this.onAssessmentPlanClick = this.onAssessmentPlanClick.bind(this);
        this.state = {
            openTableID: '',
            openFilterID: '',
            openPlanID: ''
        };
    }

    onEPALabelClick(event) {
        const clickedID = +event.currentTarget.className.split('label-index-')[1];
        let visibilityOpenStatus = { ...this.props.levelVisibilityOpenStatus };
        visibilityOpenStatus[clickedID] = !visibilityOpenStatus[clickedID];
        this.props.actions.setLevelVisibilityStatus(visibilityOpenStatus);
        this.setState({ openTableID: '' });
    }

    onTableExpandClick(event) {
        const openTableID = event.target.className.split(" ")[3];
        // if already open close it , if not open it !
        if (event.target.className.indexOf('open-table') > -1) {
            this.setState({ openTableID: '', openFilterID: '' });
        }
        else {
            this.setState({ openTableID, openFilterID: '' });
        }
    }
    onFilterExpandClick(event) {
        const openFilterID = event.target.className.split(" ")[3];
        // if already open close it , if not open it !
        if (event.target.className.indexOf('open-filter') > -1) {
            this.setState({ openFilterID: '', openTableID: '' });
        }
        else {
            this.setState({ openFilterID, openTableID: '' });
        }
    }

    onAssessmentPlanClick() {
        const openPlanID = event.target.dataset.epaSource;
        // if already open close it , if not open it !
        if (event.target.className.indexOf('open-plan') > -1) {
            this.setState({ openPlanID: '' });
        }
        else {
            this.setState({ openPlanID });
        }
    }

    onMouseOver(event) {
        let { residentData, actions } = this.props;
        let pointId = event.target.id.split("-");
        let data = residentData[pointId[2]][pointId[4]];
        var pageWidth = document.getElementById('visual-summary-content-mount').getBoundingClientRect().width;
        actions.showTooltip(true, {
            'x': event.pageX + 400 > pageWidth ? event.pageX - 400 : event.pageX,
            'y': event.pageY - 50,
            // Add an empty line to align info horizontally
            'comments': '\n' + data['Feedback'],
            'name': data['Observer_Name'],
            'type': data['Type'],
            'date': data['Date'],
            // Add an empty line to align info horizontally
            'context': '\n' + data['Situation_Context'],
            // show safety concerns in the tooltip only if they are non empty and not "No"
            "concern": (data['Professionalism_Safety'] != 0 && data['Professionalism_Safety'] != "No") ? data['Professionalism_Safety'] : ''
        });

    }

    onMouseOut(event) {
        this.props.actions.showTooltip(false);
    }

    render() {

        let { residentData, residentFilter = {},
            isTooltipVisible,
            tooltipData, smallScreen, width,
            levelVisibilityOpenStatus, programInfo = {} } = this.props;

        const { openTableID, openFilterID, openPlanID } = this.state;

        const { isAllData = true, hideNoDataEPAs = false } = residentFilter;

        // populate the source map from the program info
        let epaSourceMap = programInfo.epaSourceMap;

        // if no data then set flag to false if not group data by root key
        let epaSourcesThatExist = false;
        if (residentData && Object.keys(residentData).length > 0) {
            epaSourcesThatExist = _.groupBy(Object.keys(residentData), (key) => { return key.split('.')[0] });
            // sort the values 
            _.map(epaSourcesThatExist, (epaSource) => {
                epaSource.sort((a, b) => Number(a.split(".")[1]) - Number(b.split(".")[1]));
            });
            // remove values that dont exist in the original source map 
            _.map(epaSourcesThatExist, (epaSource, epaRootKey) => {

                const mappedStageList = epaSource.filter((d) => {
                    const sourceMapExists = epaSourceMap[epaRootKey].subRoot.hasOwnProperty(d);
                    const noMarkedData = _.filter(residentData[d] || [], (e) => e.mark).length == 0;
                    // if the hide filter is on and no marked data exists remove the source by filtering it out
                    if (!isAllData && hideNoDataEPAs && noMarkedData) return false;
                    return sourceMapExists;
                });

                // After the filtering is done,
                // if a stage is empty remove it
                if (mappedStageList.length > 0) {
                    epaSourcesThatExist[epaRootKey] = mappedStageList;
                }
                else {
                    delete epaSourcesThatExist[epaRootKey];
                }

            });
        }

        let widthOfRootGraphPanel = smallScreen ? (width + 50) : width;
        let widthPartition = smallScreen ? (width - 20) : (width / 4);


        return (
            <div>
                {epaSourcesThatExist && <div className='graph-panel-root'>

                    <s-tooltip border-width="1px" show-delay="1000" style={{ fontFamily: 'inherit' }} attach-to=".s-tooltip-assessment-plan-button"></s-tooltip>

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
                                        epaSourceMap={epaSourceMap} />

                                    {/* Actual Row data containing labels and bullet and line charts */}
                                    <div className={'inner-graph-row ' + (isCurrentSubRootVisible ? 'show-row' : 'hide-row')}>
                                        {_.map(epaSources, (epaSource, sourceKey) => {
                                            return (
                                                <GraphRow
                                                    key={'inner-row-' + sourceKey}
                                                    innerKey={innerKey}
                                                    epaSource={epaSource}
                                                    isTableVisible={epaSource == openTableID}
                                                    isFilterVisible={epaSource == openFilterID}
                                                    isPlanVisible={epaSource == openPlanID}
                                                    widthPartition={widthPartition}
                                                    epaSourceMap={epaSourceMap}
                                                    smallScreen={smallScreen}
                                                    residentEPAData={residentData[epaSource] || []}
                                                    onMouseOver={this.onMouseOver}
                                                    onMouseOut={this.onMouseOut}
                                                    onAssessmentPlanClick={this.onAssessmentPlanClick}
                                                    onTableExpandClick={this.onTableExpandClick}
                                                    onFilterExpandClick={this.onFilterExpandClick} />)
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
        levelVisibilityOpenStatus: state.oracle.visibilityOpenStatus,
        programInfo: state.oracle.programInfo ? state.oracle.programInfo : {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                showTooltip,
                setLevelVisibilityStatus
            }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphPanel);
