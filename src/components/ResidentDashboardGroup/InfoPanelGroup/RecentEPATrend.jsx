import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import { line, scaleLinear } from 'd3';
import TrackTrails from '../GraphPanelGroup/TrackTrails';
import TrackLegend from '../GraphPanelGroup/TrackLegend';
import { showTooltip } from '../../../redux/actions/actions';
import oScoreReference from '../../../utils/oScoreReference';

class RecentEPATrend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterRange: '25'
        }
        this.setFilterRange = this.setFilterRange.bind(this);
        this.getDataList = this.getDataList.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    setFilterRange(event) {
        event.preventDefault();
        this.setState({ filterRange: document.getElementById('recent-resident-data').value });
    }

    onMouseOver(event) {
        const { actions, programInfo } = this.props;

        let pointId = event.target.id.split("-")[1],
            data = this.getDataList()[pointId],
            tempEPA = data['EPA'].split("."),
            epaText = data['EPA'] + " - " + programInfo.epaSourceMap[tempEPA[0]].subRoot[data['EPA']];


        var pageWidth = window.dynamicDashboard.mountWidth;
        actions.showTooltip(true, {
            'x': event.pageX + 400 > pageWidth ? event.pageX - 400 : event.pageX,
            'y': event.pageY - 50,
            'epa': epaText,
            // Add an empty line to align info horizontally
            'comments': data['Feedback'] ? '\n' + data['Feedback'] : '',
            'type': data['Type'],
            'name': data['Observer_Name'],
            'date': data['Date'],
            // Add an empty line to align info horizontally
            'context': '\n' + data['Situation_Context']
        });

    }

    onMouseOut(event) {
        this.props.actions.showTooltip(false);
    }

    getDataList() {

        const { residentData = {} } = this.props, { filterRange } = this.state;

        // when the records are loaded up we flatten them 
        // then we sort them by date
        let temp = _.reverse(_.sortBy(_.flatMap(residentData), (d) => d.Date));

        if (filterRange.indexOf('month') > -1) {
            //  Get the records that fall in that X month period from now
            return _.reverse(temp.filter((d) => moment(d.Date, 'YYYY-MM-DD')
                .isAfter(moment().subtract(+filterRange.split('-')[0], 'month'))));
        }
        return _.reverse(temp.slice(0, +filterRange));
        // the records are returned reversed so they are sorted from oldest to newest 
    }


    render() {

        const dataList = this.getDataList(), { filterRange } = this.state, { width } = this.props;

        const d3Line = line().x((d) => d.x).y((d) => d.y),
            innerHeight = 200,
            marginHorizontal = 25,
            marginVertical = 25,
            xScale = scaleLinear().domain([0, dataList.length - 1]).range([marginHorizontal + 20, width - marginHorizontal]),
            yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])


        const trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: marginHorizontal + 20,
                dx: width - (2 * marginHorizontal) - 20,
                y: yScale(i + 1)
            }
        });

        const legends = _.map(oScoreReference, (d, i) => {
            return {
                x: marginHorizontal,
                y: yScale(i + 1),
                labelID: i + 1,
                label: d
            }
        });

        const pointList = dataList.map((d, i) => {
            return {
                x: xScale(i),
                y: yScale(d.Rating),
                pureData: d
            };
        });

        // if a record has been marked by the filterpanel it means it lies in
        // a date range selected by the user
        // so make it a diamond instead of a circle
        const elementList = _.map(pointList, (d, i) => {

            if (d.pureData.mark) {
                return <polygon
                    id={'recentPoint-' + i}
                    className='score-point'
                    key={'recent-point-' + i}
                    fill={'white'}
                    stroke={'#252830'}
                    strokeWidth={3}
                    points={(d.x - 6) + "," + d.y + " " + d.x + "," + (d.y + 6) + " " + (d.x + 6) + "," + d.y + " " + (d.x) + "," + (d.y - 6) + " " + (d.x - 6) + "," + (d.y)}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut} />
            }

            return <circle
                id={'recentPoint-' + i}
                className='score-point'
                key={'recent-point-' + i}
                fill={'#252830'}
                cx={d.x} cy={d.y} r={6}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}>
            </circle>
        });

        return (
            <div className='recent-epa-container'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content">
                        RECENT EPAs
                    </h4>
                </div>
                <div className='recent-range-selection'>
                    <div className='name-box'>
                        <label className='filter-label'>Last</label>
                        <select id='recent-resident-data' defaultValue={filterRange} className="custom-select">
                            <option value='10'>10 Records</option>
                            <option value='25'>25 Records</option>
                            <option value='1-month'>1 Month</option>
                            <option value='3-month'>3 Months</option>
                        </select>
                        <button className={'btn btn-primary-outline'} onClick={this.setFilterRange}>
                            <span className="fa fa-play"></span>
                        </button>

                    </div>
                </div>
                <svg height={innerHeight} width={width} className='recent-svg' >
                    {dataList.length <= 0 ?
                        <text x={(width - 190) / 2} y={innerHeight / 2} className="no-data-banner">No Records Available</text> :
                        <g>
                            <TrackLegend legends={legends} />
                            <TrackTrails trackTrailPositions={trackTrailPositions} />
                            <path className='score-spark-line' d={d3Line(pointList)}></path>
                            {elementList}
                        </g>
                    }
                </svg>
            </div>)
    }
}


function mapStateToProps(state) {
    return {
        residentData: state.oracle.residentData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ showTooltip }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentEPATrend);