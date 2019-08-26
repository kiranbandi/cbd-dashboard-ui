import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { line, scaleLinear } from 'd3';
import TrackTrails from '../GraphPanelGroup/TrackTrails';
import { modifyccFeedbackList, showTooltip } from '../../../redux/actions/actions';

const optionsList = ['Accelerated', 'As Expected', 'Not as Expected', 'Not Progressing', 'Inactive'];


class FeedbackBlock extends Component {

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);

    }


    onMouseOver(event) {
        const { actions, ccFeedbackList } = this.props;

        const dataPointIDs = event.target.id.split("-");
        // curate the original ID to get the points key
        const dataPoint = ccFeedbackList[dataPointIDs[1]];

        var pageWidth = document.body.getBoundingClientRect().width;
        actions.showTooltip(true, {
            'x': event.pageX + 400 > pageWidth ? event.pageX - 400 : event.pageX,
            'y': event.pageY - 50,
            'epa': '',
            'feedback': dataPoint.feedback,
            'name': '',
            'date': dataPoint.meetingDate,
            'context': ''
        });

    }

    onMouseOut(event) {
        this.props.actions.showTooltip(false);
    }


    render() {

        let { width, ccFeedbackList = [] } = this.props;

        const d3Line = line().x((d) => d.x).y((d) => d.y),
            innerHeight = 200,
            marginHorizontal = 25,
            marginVertical = 25,
            xScale = scaleLinear().domain([0, 25]).range([marginHorizontal + 130, width - marginHorizontal]),
            yScale = scaleLinear().domain([1, 5]).range([marginVertical + 10, innerHeight - marginVertical - 25])


        const trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: 130,
                dx: width - (2 * marginHorizontal) - 105,
                y: yScale(i + 1)
            }
        })

        const yLabelList = _.map(optionsList, (d, i) => {
            return <text
                className='feedback-label-y'
                key={'feedback-label-y-' + i}
                x={10} y={yScale(i + 1) + 5}>
                {d}
            </text>
        });


        //  push only points that actually have data
        const pointList = _.map(ccFeedbackList, (d, index) => ({
            x: xScale(index),
            y: yScale(_.findIndex(optionsList, (r) => r == d.rating) + 1),
            'data-point-id': index
        })
        );

        const elementList = _.map(pointList, (d, i) => {
            return <circle
                id={'feedback-' + d['data-point-id']}
                className='feedback-point'
                key={'feedback-point-' + i}
                fill={'#252830'}
                cx={d.x} cy={d.y} r={6}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}>
            </circle>
        });

        return (
            <div className='feedback-block pullto-left' >
                <div className="hr-divider">
                    <h4 className="hr-divider-content"> Competence Committee Feedback and Resident Progress </h4>
                </div>
                <svg height={innerHeight} width={width} className='recent-svg' >
                    {ccFeedbackList.length <= 0 ?
                        <text x={(width - 190) / 2} y={innerHeight / 2} className="no-data-banner">No Records Available</text> :
                        <g>
                            {yLabelList}
                            <TrackTrails trackTrailPositions={trackTrailPositions} />
                            <path className='score-spark-line' d={d3Line(pointList)}></path>
                            {elementList}
                        </g>
                    }
                </svg>
            </div >)
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ modifyccFeedbackList, showTooltip }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(FeedbackBlock);