import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { line, scaleLinear } from 'd3';
import TrackTrails from '../GraphPanelGroup/TrackTrails';
import { modifyCCFeedback, showTooltip, toggleCCEditModal } from '../../../redux/actions/actions';


class FeedbackBlock extends Component {

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.triggerCCEditModal = this.triggerCCEditModal.bind(this);
    }


    triggerCCEditModal(event) {
        this.props.actions.toggleCCEditModal();
    }

    onMouseOver(event) {
        const { actions, ccFeedback } = this.props;

        const dataPointIDs = event.target.id.split("-");
        // curate the original ID to get the points key
        const dataPoint = ccFeedback[dataPointIDs[1]][dataPointIDs[2]];

        var pageWidth = document.body.getBoundingClientRect().width;
        actions.showTooltip(true, {
            'x': event.pageX + 400 > pageWidth ? event.pageX - 400 : event.pageX,
            'y': event.pageY - 50,
            'epa': '',
            'feedback': dataPoint.feedback,
            'name': '',
            'date': '323/12/11',
            'context': ''
        });

    }

    onMouseOut(event) {
        this.props.actions.showTooltip(false);
    }


    render() {

        let dataList = [], { width, ccFeedback, accessType } = this.props;

        const d3Line = line().x((d) => d.x).y((d) => d.y),
            innerHeight = 200,
            marginHorizontal = 25,
            marginVertical = 25,
            xScale = scaleLinear().domain([0, 19]).range([marginHorizontal + 110, width - marginHorizontal]),
            yScale = scaleLinear().domain([5, 1]).range([marginVertical + 10, innerHeight - marginVertical - 25])


        const trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: 110,
                dx: width - (2 * marginHorizontal) - 85,
                y: yScale(i + 1)
            }
        })

        const yLabelList = _.map(['Inactive', 'No Progress', 'Not as Expected', 'Expected', 'Accelerated'], (d, i) => {
            return <text
                className='feedback-label-y'
                key={'feedback-label-y-' + i}
                x={10} y={yScale(i + 1) + 5}>
                {d}
            </text>
        });

        const xLabelList = _.map([1, 2, 3, 4, 5], (d, i) => {
            return [
                <circle
                    className='feedback-label-x-circle'
                    key={'feedback-label-x-circle' + i}
                    r={12}
                    cx={xScale((d * 4) - 1)} cy={innerHeight - 20}>
                    {d}
                </circle>,
                <text
                    className='feedback-label-x'
                    key={'feedback-label-x-' + i}
                    x={xScale((d * 4) - 1) - 4} y={innerHeight - 16}>
                    {d}
                </text>
            ]
        });


        dataList = [];

        // This complicated fuckery is simply to evade the random chance of 
        // someone setting the data at a particular meeting point to unavailable 
        // So the whole graph doesnt get shifted but instead that point alone is
        // subbed in with a zero

        [1, 2, 3, 4, 5].map(function (d, i) {
            const yearlyData = ccFeedback[d];
            // if there are records , then
            if (yearlyData) {
                [1, 2, 3, 4].map((inner_d) => {
                    dataList.push(yearlyData[inner_d] ? yearlyData[inner_d].rating : 0);
                })
            } else {
                dataList = dataList.concat([0, 0, 0, 0]);
            }
        });

        const pointList = [];

        //  push only points that actually have data
        _.map(dataList, (d, index) => {
            if (d != 0) {
                pointList.push({
                    x: xScale(index),
                    y: yScale(d),
                    originalId: (Math.floor(+index / 4) + 1) + "-" + (((+index) % 4) + 1)
                });
            }
        });

        const elementList = _.map(pointList, (d, i) => {
            return <circle
                id={'feedback-' + d.originalId}
                className='feedback-point'
                key={'feedback-point-' + i}
                fill={'#252830'}
                cx={d.x} cy={d.y} r={6}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}>
            </circle>
        });

        let promotedDataList = [];

        _.map(Object.keys(ccFeedback.promoted), (d) => {
            if (d) {
                const innerMap = d.split('.').map((d) => Number(d));
                promotedDataList.push({
                    'x': xScale(((innerMap[0] - 1) * 4) + innerMap[1] - 1),
                    'label': ccFeedback.promoted[d]
                })
            }
        });

        const promotedTracks = _.map(promotedDataList, (d, index) => {
            return <line
                x1={d.x} y1={yScale.range()[0]}
                x2={d.x} y2={yScale.range()[1]}
                strokeWidth={0.5}
                stroke={'red'}
                key={'promoted-track' + index}
                className={'promoted-track'}>
            </line>
        })

        const promotedLabels = _.map(promotedDataList, (d, index) => {
            return <text
                className='promoted-label'
                key={'promoted-label-' + index}
                // blurb to center the text based on its length
                x={d.x - ((d.label.length * 9) / 2)} y={22.5}>
                {d.label}
            </text>
        })

        return (
            <div className='feedback-block pullto-left' >
                <div className="hr-divider">
                    <h4 className="hr-divider-content"> Competence Committee Feedback </h4>
                </div>
                {(['admin', 'super-admin', 'director', 'reviewer'].indexOf(accessType) > -1) &&
                    <button
                        onClick={this.triggerCCEditModal}
                        className='edit-feedback-button btn btn-primary-outline'>
                        Edit <span className='icon icon-new-message'></span>
                    </button>}
                <svg height={innerHeight} width={width} className='recent-svg' >
                    {false ?
                        <text x={(width - 190) / 2} y={innerHeight / 2} className="no-data-banner">No Records Available</text> :
                        <g>
                            {yLabelList}
                            {xLabelList}
                            {promotedLabels}
                            {promotedTracks}
                            <TrackTrails trackTrailPositions={trackTrailPositions} />
                            <path className='score-spark-line' d={d3Line(pointList)}></path>
                            {elementList}
                        </g>
                    }
                </svg>
            </div >)
    }
}

function mapStateToProps(state) {
    return {
        accessType: state.oracle.userDetails.accessType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ modifyCCFeedback, showTooltip, toggleCCEditModal }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackBlock);