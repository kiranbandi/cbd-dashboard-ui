/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import templateEpaSourceMap from '../utils/epaSourceMap';
import { BulletChartColumn, LineChartColumn } from './';
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
                                        return (<span className='epa-label inner-offset-label' key={'epa-cell-' + sourceKey} >
                                            {epaSource + " - " + epaSourceMap[innerKey].subRoot[epaSource]}
                                        </span>)
                                    })}
                                </div>
                            </div>;
                        })}
                    </div>

                    <BulletChartColumn
                        epaSourceMap={epaSourceMap}
                        residentData={residentData}
                        epaSourcesThatExist={epaSourcesThatExist}
                        widthPartition={widthPartition} />

                    <LineChartColumn
                        residentData={residentData}
                        epaSourcesThatExist={epaSourcesThatExist}
                        widthPartition={widthPartition}
                        onMouseOver={this.onMouseOver}
                        onMouseOut={this.onMouseOut} />

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
