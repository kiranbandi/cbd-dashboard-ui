import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTooltip } from '../../../redux/actions/actions';
import { line, curveCardinal, scaleLinear } from 'd3';
import { InfoTip } from '../../';
import infoTooltipReference from '../../../utils/infoTooltipReference';

class OralScoreGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'academicYear': ''
        };
        this.onChangeYear = this.onChangeYear.bind(this);
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.removeTooltip = this.removeTooltip.bind(this);
    }

    onChangeYear() {
        this.setState({ 'academicYear': document.getElementById('academic-year-dropdown').value });
    }


    onMouseOver(event) {

        // stop event from bubbling over
        event.stopPropagation();

        const { actions, oralScoreData } = this.props;

        const dataPointIDs = event.target.id.split("-");
        // // curate the original ID to get the points key
        const dataPoint = oralScoreData[dataPointIDs[1]][dataPointIDs[2]];

        var pageWidth = document.body.getBoundingClientRect().width;

        actions.showTooltip(true, {
            'x': event.pageX + 400 > pageWidth ? event.pageX - 400 : event.pageX,
            'y': event.pageY - 50,
            'epa': '',
            'feedback': dataPoint.narrative || 'No narrative',
            'name': '',
            'date': '',
            'context': ''
        });

    }

    removeTooltip(event) {
        this.props.actions.showTooltip(false);
    }

    render() {

        const { oralScoreData = {}, width } = this.props,
            possibleAcademicYears = _.keys(oralScoreData);

        let { academicYear } = this.state;

        // if the current academic year is empty and 
        // there are years with data set then pick the first year as default

        if (!academicYear && possibleAcademicYears.length > 0) {
            academicYear = possibleAcademicYears[0];
        }

        let currentYearData = oralScoreData[academicYear] || [];

        const d3Line = line().curve(curveCardinal).x((d) => d.x).y((d) => d.y);
        const innerHeight = 200, margin = 50;

        const xScale = scaleLinear().domain([0, currentYearData.length - 1]).range([margin, width - margin])
        const yScale = scaleLinear().domain([100, 0]).range([margin, innerHeight - margin])

        const pointsList = currentYearData.map((d, i) => {
            return {
                x: xScale(i),
                y: yScale(+d.value),
                value: d.value
            };
        });

        const dotList = _.map(pointsList, (d, i) => {
            return <circle r={12}
                id={'oral-' + academicYear + "-" + i}
                className='cite-score-point oral-point'
                key={'point-cite-score-' + i}
                cx={d.x} cy={d.y}
                onMouseOver={this.onMouseOver}>
            </circle>
        })

        const textPointList = _.map(pointsList, (d, i) => {
            return <text
                className='cite-score-text oral-text no-event-item'
                key={'text-cite-score-' + i}
                fill={'white'}
                x={d.x - 8} y={d.y + 4}>
                {d.value}
            </text>
        });

        return (
            <div className='cite-exam-score-container pullto-left'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content">
                        Oral Exam Scores
                        <InfoTip info={infoTooltipReference.residentMetrics.oralExamScores} />
                    </h4>
                </div>
                <div className='recent-range-selection'>
                    <div className='name-box'>
                        <label className='filter-label'>Academic Year</label>
                        <select id='academic-year-dropdown' defaultValue={academicYear} className="custom-select">
                            {_.map(possibleAcademicYears, (year => { return <option key={'year-' + year} value={year}>{year}-{+year + 1}</option> }))}
                        </select>
                        <button className={'btn btn-primary-outline'} onClick={this.onChangeYear}>
                            <span className="icon icon-controller-play"></span>
                        </button>
                    </div>
                </div>

                <svg height={innerHeight} width={width} className='cite-svg' onMouseOver={this.removeTooltip}>
                    {dotList.length == 0 &&
                        <text x={(width - 190) / 2} y={innerHeight / 2} className="no-data-banner">No Records Available</text>}
                    <path
                        className='score-spark-line'
                        d={d3Line(pointsList)}></path>
                    {dotList}
                    {textPointList}
                </svg>
            </div>)
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ showTooltip }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(OralScoreGraph);