import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
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


    handleChartClick(event) {

        const { actions, residentFilter, residentList } = this.props;
        
        let datapoint = this.chartCtx && this.chartCtx.getBarsAtEvent(event);
        // if a valid resident name has been clicked
        if (datapoint && datapoint.length > 0) {
            // first get the resident username from the list
            // then check if the resident exists and then trigger a custom select resident action 
            let resident = _.find(residentList, (d) => d.fullname == datapoint[0].label);
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

        let datasets = [{
            label: "Achieved",
            fillColor: "rgba(67,185,142,0.75)",
            strokeColor: "#43b98e",
            pointColor: "#43b98e",
            pointStrokeColor: '#43b98e',
            pointHighlightFill: "#43b98e",
            pointHighlightStroke: "#43b98e",
            data: _.map(sortedRecords, (d) => d[trackType])
        }];

        if (trackType == 'completedAssessments') {
            datasets.push({
                label: "Total",
                fillColor: "rgba(151,187,205,0.75)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "rgba(151,187,205,1)",
                pointHighlightFill: "rgba(151,187,205,1)",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: _.map(sortedRecords, (d) => d['totalAssessments'])
            });
        }

        // create Bar object for chart
        const BarData = {
            labels: _.map(sortedRecords, (d) => d.fullname),
            datasets
        }

        let BarOptions = {
            scaleBeginAtZero: true
        };

        
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
                <div onClick={this.handleChartClick}>
                    <Bar
                        ref={r => this.chartCtx = r && r.getChart()}
                        redraw={true}
                        options={BarOptions}
                        data={BarData}
                        width={width} height={450} />
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



