import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { line, scaleLinear, scaleTime } from 'd3';
import moment from 'moment';
import TrackTrails from '../GraphPanelGroup/TrackTrails';
import { showTooltip } from '../../../redux/actions/actions';
import { STAGES_LIST } from '../../../utils/programInfo';

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
            marginHorizontalStart = 150,
            marginHorizontalEnd = 25,
            marginVertical = 25,
            xScale = scaleTime().domain([start_date.toDate(), end_date.toDate()]).range([marginHorizontalStart, width - marginHorizontalEnd]),
            yScale = scaleLinear().domain([1, 5]).range([marginVertical + 10, innerHeight - marginVertical - 25])


        const trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: xScale(start_date.toDate()),
                dx: xScale(end_date.toDate()) - xScale(start_date.toDate()),
                y: yScale(i + 1)
            }
        })



        // from the 4 phases find the number at the which the resident is currently in
        const maxPromotedIndex = _.findIndex(STAGES_LIST, (d) => d == residentInfo.currentPhase);

        // now use that to add the promotion dates for all the phases he was in before that
        // so if he is in phase 4 add the promotion dates for phase 2 and 3
        const promotedDataList = _.map(residentInfo.promotedDate.slice(0, maxPromotedIndex),
            (d, i) => {
                return {
                    'date': d,
                    label: i == 0 ? 'F' : i == 1 ? 'C' : 'TTP'
                }
            });

        // finally for some residents in EM who have moved into the program directly in say core
        // or foundation we ignore the previous promotion dates, we do this by setting all the dates
        // to the same date
        // if there are multiple promotions on the same date simply pick the other that is further along
        // and ignore the others , for such cases also dont add the TTD start point
        let uniquePromotedList = [], copyExists = false;
        _.map(promotedDataList, (point) => {
            const existingIndex = _.findIndex(uniquePromotedList, (d) => d.date == point.date);
            if (existingIndex > -1) {
                copyExists = true;
                uniquePromotedList[existingIndex] = point;
            }
            else {
                uniquePromotedList.push(point);
            }

            // also if any of the dates equal to the resident start date then skip adding the TTD label
            if (moment(new Date(point.date)).isSame(start_date)) {
                copyExists = true;
            }
        })

        // if duplicates exist skip adding TTD 
        if (!copyExists) {
            uniquePromotedList.unshift({ 'date': residentInfo.programStartDate, 'label': 'TTD' });
        }


        // map promoted list  dates to x values 
        const updatedPromotedDataList = _.map(uniquePromotedList, (d) => {
            return { 'x': xScale(new Date(d.date)), label: d.label }
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


        const promotedTracks = _.map(updatedPromotedDataList, (d, index) => {
            return <line
                x1={d.x} y1={yScale.range()[0]}
                x2={d.x} y2={yScale.range()[1]}
                strokeWidth={0.5}
                stroke={'red'}
                key={'promoted-track' + index}
                className={'promoted-track'}>
            </line>
        })

        const promotedLabels = _.map(updatedPromotedDataList, (d, index) => {
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
        actions: bindActionCreators({ showTooltip }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(FeedbackBlock);