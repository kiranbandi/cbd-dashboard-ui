/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTooltip, setLevelVisibilityStatus, setResidentList } from '../../../redux/actions/actions';
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
        var pageWidth = document.body.getBoundingClientRect().width;
        actions.showTooltip(true, {
            'x': event.pageX + 400 > pageWidth ? event.pageX - 400 : event.pageX,
            'y': event.pageY - 50,
            'feedback': data['Feedback'],
            'name': data['Observer_Name'],
            'date': data['Date'],
            'context': data['Situation_Context'],
            // show safety concerns in the tooltip only if they are non empty and not "No"
            "concern": (data['Professionalism_Safety'] != 0 && data['Professionalism_Safety'] != "No") ? data['Professionalism_Safety'] : ''
        });

    }

    onMouseOut(event) {
        this.props.actions.showTooltip(false);
    }

    render() {

        let { residentData,
            expiredResidentData,
            isTooltipVisible,
            nonDemoMode = false,
            tooltipData,
            hideMarkButton = false,
            epaSourceMap, smallScreen, width,
            residentFilter,
            residentList = [],
            levelVisibilityOpenStatus, programInfo = {}, userType } = this.props,
            residentInfo = false;

        const { hidePercentages = false, hideTogoNumbers } = programInfo;

        const { openTableID, openFilterID, openPlanID } = this.state;

        // if there is no source map provided then use the Emergency medicine Template Map
        epaSourceMap = !!epaSourceMap ? epaSourceMap : programInfo.epaSourceMap;

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
                epaSourcesThatExist[epaRootKey] = epaSource.filter((d) => epaSourceMap[epaRootKey].subRoot.hasOwnProperty(d));
                // For the EPAs in the hideIfNoData list, if there is no data, filter them out from the list 
                let hiddenEPAList = epaSourceMap[epaRootKey].hideIfNoData || [];
                epaSourcesThatExist[epaRootKey] = epaSource.filter((d) => {
                    // if an EPA exists in the hidden list and it has no data then no need to show it
                    if (hiddenEPAList.indexOf(d) > -1 && residentData[d].length == 0) {
                        return false;
                    }
                    return true;
                });
            });

        }

        // Get the residents corresponding completion status for each EPA
        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);
        }

        let expiredResidentDataGrouped = _.groupBy(expiredResidentData, (d) => d.EPA);

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
                                        nonDemoMode={nonDemoMode}
                                        hidePercentages={hidePercentages}
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
                                                    hideMarkButton={hideMarkButton ? true : (userType == 'resident')}
                                                    isTableVisible={epaSource == openTableID}
                                                    isFilterVisible={epaSource == openFilterID}
                                                    isPlanVisible={epaSource == openPlanID}
                                                    widthPartition={widthPartition}
                                                    epaSourceMap={epaSourceMap}
                                                    residentInfo={residentInfo}
                                                    residentList={residentList}
                                                    smallScreen={smallScreen}
                                                    hideTogoNumbers={hideTogoNumbers}
                                                    residentEPAData={residentData[epaSource] || []}
                                                    expiredResidentEPAData={expiredResidentDataGrouped[epaSource] || []}
                                                    onMouseOver={this.onMouseOver}
                                                    onMouseOut={this.onMouseOut}
                                                    setResidentList={this.props.actions.setResidentList}
                                                    nonDemoMode={nonDemoMode}
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
        userType: state.oracle.userDetails.accessType,
        residentData: state.oracle.residentData,
        expiredResidentData: state.oracle.expiredResidentData,
        isTooltipVisible: state.oracle.isTooltipVisible,
        tooltipData: state.oracle.tooltipData,
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList,
        levelVisibilityOpenStatus: state.oracle.visibilityOpenStatus,
        programInfo: state.oracle.programInfo ? state.oracle.programInfo : {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                showTooltip,
                setLevelVisibilityStatus,
                setResidentList
            }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphPanel);
