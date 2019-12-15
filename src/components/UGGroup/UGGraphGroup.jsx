/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTooltip, setLevelVisibilityStatus } from '../../redux/actions/actions';
import Tooltip from '../ResidentDashboardGroup/GraphPanelGroup/Tooltip';


class GraphPanel extends Component {

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onTableExpandClick = this.onTableExpandClick.bind(this);
        this.onFilterExpandClick = this.onFilterExpandClick.bind(this);
        this.state = {
            openTableID: '',
            openFilterID: ''
        };
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
            'context': data['Situation_Context']
        });

    }

    onMouseOut(event) {
        this.props.actions.showTooltip(false);
    }

    render() {

        let { studentRecords, isTooltipVisible, tooltipData,
            smallScreen = false, width, programInfo = {} } = this.props;

        const { openTableID, openFilterID } = this.state, { epaSourceMap } = programInfo;

        let widthOfRootGraphPanel = smallScreen ? (width + 50) : width;
        let widthPartition = smallScreen ? (width - 20) : (width / 4);

            

        return (
            <div className='graph-panel-root'>
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
                    <div className="inner-sub-root">
                        {/* Actual Row data containing labels and bullet and line charts */}
                        <div className={'inner-graph-row '}>
                            {_.map(epaSourceMap.subRoot, (epaSource, sourceKey) => {
                                return (<div></div>)
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
