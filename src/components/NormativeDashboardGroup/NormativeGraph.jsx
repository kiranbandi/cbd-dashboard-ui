import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { RadioButton } from '../';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchToResidentDashboard } from '../../redux/actions/actions';

class NormativeGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackType: 'totalAssessments',
            dualTracks: true
        };
        this.radioChange = this.radioChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.handleChartClick = this.handleChartClick.bind(this);

    }


    onCheckboxChange() {
        this.setState({ dualTracks: !this.state.dualTracks });
    }


    radioChange(event) {
        this.setState({ trackType: event.target.value });
    }


    handleChartClick(datapoint) {
        const { actions, residentFilter, residentList } = this.props;
        // if a valid resident name has been clicked
        if (datapoint && datapoint.activeLabel.length > 0) {
            // first get the resident username from the list
            // then check if the resident exists and then trigger a custom select resident action 
            let resident = _.find(residentList, (d) => d.fullname == datapoint.activeLabel);
            if (resident) {
                // set the username on the filter
                residentFilter.username = resident.username;
                actions.switchToResidentDashboard(resident, residentFilter);
            }
        }
    }

    render() {

        const { records, width } = this.props, { trackType } = this.state;

        let sortedRecords = _.sortBy(records, (d) => d[trackType]);

        const chartLabelMap = {
            'totalAssessments': 'Total EPAs',
            'achievementRate': 'Achievement Rate',
            'totalProgress': 'Progress(%)',
            'completedAssessments': 'Achieved EPAs'
        };

        const showAchievedAndTotal = trackType == 'completedAssessments';

        // create Bar object for chart
        const barData = _.map(sortedRecords, (d) => {
            let barDatapoint = {
                'username': d.username,
                'name': d.fullname,
                [chartLabelMap[trackType]]: d[trackType]
            };
            if (showAchievedAndTotal) {
                barDatapoint[chartLabelMap['totalAssessments']] = d['totalAssessments'];
            }
            return barDatapoint;
        });

        return (
            <div className='normative-graph m-b'>
                <div className='sub-filter'>
                    <div className='radio-button-container'>
                        <RadioButton value={'totalAssessments'} id={'track_totalAssessments'} className='track-radio' name='track-select'
                            label={"Total EPAs"}
                            onChange={this.radioChange}
                            checked={trackType == 'totalAssessments'} />
                        <RadioButton value={'achievementRate'} id={'track_achievementRate'} className='track-radio' name='track-select'
                            label={"Achievement Rate"}
                            onChange={this.radioChange}
                            checked={trackType == 'achievementRate'} />
                        <RadioButton value={'totalProgress'} id={'track_totalProgress'} className='track-radio' name='track-select'
                            label={"Progress(%)"}
                            onChange={this.radioChange}
                            checked={trackType == 'totalProgress'} />
                        <RadioButton value={'completedAssessments'} id={'track_completedAssessments'} className='track-radio' name='track-select'
                            label={"Achieved EPAs vs Total EPAs"}
                            onChange={this.radioChange}
                            checked={trackType == 'completedAssessments'} />
                    </div>
                </div>
                <div className='bar-chart-wrapper'>
                    <BarChart width={width} height={450}
                        data={barData}
                        cursor={'pointer'}
                        layout="horizontal"
                        onClick={this.handleChartClick}
                        margin={{ left: 5, right: 5, top: 5, bottom: 5 }}>
                        <Tooltip labelStyle={{ 'color': 'black' }} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Legend wrapperStyle={{ bottom: 0 }} height={20} />
                        {showAchievedAndTotal && <Bar dataKey={chartLabelMap['totalAssessments']} fill="#8884d8" />}
                        <Bar dataKey={chartLabelMap[trackType]} fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>)
    }

}



function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ switchToResidentDashboard }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        residentFilter: state.oracle.residentFilter
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NormativeGraph);

