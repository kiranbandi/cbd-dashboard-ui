/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTooltip, setLevelVisibilityStatus } from '../../redux/actions/actions';
import Tooltip from '../ResidentDashboardGroup/GraphPanelGroup/Tooltip';
import UGGraphRow from './UGGraphRow';

class GraphPanel extends Component {

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onTableExpandClick = this.onTableExpandClick.bind(this);
        this.state = {
            openTableID: ''
        };
    }

    onTableExpandClick(event) {
        const openTableID = event.target.className.split(" ")[3];
        // if already open close it , if not open it !
        if (event.target.className.indexOf('open-table') > -1) {
            this.setState({ openTableID: '' });
        }
        else {
            this.setState({ openTableID });
        }
    }


    onMouseOver(event) {
        let { studentRecords, actions } = this.props;
        let pointId = event.target.id.split("-");
        let data = _.groupBy(studentRecords, (d) => d.epa)[pointId[2]][pointId[4]];
        var pageWidth = document.body.getBoundingClientRect().width;
        actions.showTooltip(true, {
            'x': event.pageX + 400 > pageWidth ? event.pageX - 400 : event.pageX,
            'y': event.pageY - 50,
            'feedback': data['feedback'],
            'name': data['observer_name'],
            'date': data['date'],
            'context': data['patient_type'] + " " + data['admission_type']
        });

    }

    onMouseOut(event) {
        this.props.actions.showTooltip(false);
    }

    render() {

        let { studentRecords, isTooltipVisible, tooltipData,
            smallScreen = false, width, programInfo = {} } = this.props;

        const { openTableID } = this.state, { epaSourceMap } = programInfo;

        let widthOfRootGraphPanel = smallScreen ? (width + 50) : width;
        let widthPartition = smallScreen ? (width - 20) : (width / 4);

        const studentData = _.groupBy(studentRecords, (d) => d.epa);

        return (
            <div className='graph-panel-root'>
                {/* code chunk to show tooltip*/}
                {isTooltipVisible && <Tooltip {...tooltipData} />}

                {/* code chunk for displaying titles above the table */}
                <div className='title-root text-xs-left'>
                    <h4 style={{ width: widthPartition }} className='title-bar'>EPA(Entrustable Professional Activity)</h4>
                    <h4 style={{ width: widthPartition }} className='title-bar'>Observation Count</h4>
                    <h4 style={{ width: smallScreen ? widthPartition : widthPartition * 2 }} className='title-bar'>Score History</h4>
                </div>

                {/* This is the main container which houses the table contents */}
                <div style={{ width: widthOfRootGraphPanel }} className='panel-inner-root'>
                    <div className="inner-sub-root">
                        {/* Actual Row data containing labels and bullet and line charts */}
                        <div className={'inner-graph-row '}>
                            {_.map(epaSourceMap.subRoot, (epaSource, sourceKey) => {
                                return (<UGGraphRow
                                    key={'inner-row-' + sourceKey}
                                    epaSource={sourceKey}
                                    isTableVisible={sourceKey == openTableID}
                                    widthPartition={widthPartition}
                                    epaSourceMap={epaSourceMap}
                                    studentEPAData={studentData[sourceKey] || []}
                                    onMouseOver={this.onMouseOver}
                                    onMouseOut={this.onMouseOut}
                                    onTableExpandClick={this.onTableExpandClick} />)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isTooltipVisible: state.oracle.isTooltipVisible,
        tooltipData: state.oracle.tooltipData,
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
