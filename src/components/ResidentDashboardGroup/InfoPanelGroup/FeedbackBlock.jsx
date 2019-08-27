import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { line, scaleLinear, scaleTime } from 'd3';
import moment from 'moment';
import TrackTrails from '../GraphPanelGroup/TrackTrails';
import { modifyccFeedbackList, showTooltip } from '../../../redux/actions/actions';
import { PHASES_LIST } from '../../../utils/programInfo';

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

        let { width, ccFeedbackList = [], residentInfo } = this.props;

        // For the chronological scale on the X axis 
        //  we use the start as the residents program start date and 
        //  the endate is the date 5 years from the start date or the last date on the list
        // which ever is farther away from current date.
        let start_date = moment(residentInfo.programStartDate),
            end_date = moment(residentInfo.programStartDate).add(5, 'years');

        // In the same way if there is a record that starts earlier in the cc list 
        //  than the resident start date we use that to start the list 
        _.map(ccFeedbackList, (meeting) => {
            if (moment(meeting.meetingDate, 'MM/DD/YYYY').isBefore(start_date)) {
                start_date = moment(meeting.meetingDate, 'MM/DD/YYYY');
            }
            else if (moment(meeting.meetingDate, 'MM/DD/YYYY').isAfter(end_date)) {
                end_date = moment(meeting.meetingDate, 'MM/DD/YYYY');
            }
        });


        const d3Line = line().x((d) => d.x).y((d) => d.y),
            innerHeight = 200,
            marginHorizontal = 25,
            marginVertical = 25,
            xScale = scaleTime().domain([start_date.toDate(), end_date.toDate()]).range([marginHorizontal + 130, width - marginHorizontal]),
            yScale = scaleLinear().domain([1, 5]).range([marginVertical + 10, innerHeight - marginVertical - 25])


        const trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: 130,
                dx: width - (2 * marginHorizontal) - 105,
                y: yScale(i + 1)
            }
        })

        const maxPromotedIndex = _.findIndex(PHASES_LIST, (d) => d == residentInfo.currentPhase);

        const promotedDataList = _.map(residentInfo.promotedDate.slice(0, maxPromotedIndex), (d, i) => {
            return {
                x: xScale(new Date(d)),
                label: i == 0 ? 'FOUNDATION' : i == 1 ? 'CORE' : 'TP'
            }
        });




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
            x: xScale(new Date(d.meetingDate)),
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
                    <h4 className="hr-divider-content"> Competence Committee Feedback and Resident Progress </h4>
                </div>
                <svg height={innerHeight} width={width} className='recent-svg' >
                    {ccFeedbackList.length <= 0 ?
                        <text x={(width - 190) / 2} y={innerHeight / 2} className="no-data-banner">No Records Available</text> :
                        <g>
                            {promotedTracks}
                            {promotedLabels}
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