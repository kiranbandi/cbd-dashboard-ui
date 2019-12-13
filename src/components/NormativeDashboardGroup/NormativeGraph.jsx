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
            trackType: 'epa_per_week',
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

        const { actions, residentFilter, programInfo } = this.props;

        let datapoint = this.chartCtx && this.chartCtx.getBarsAtEvent(event);
        // if a valid resident name has been clicked
        if (datapoint && datapoint.length > 0) {
            // first get the resident username from the list
            // then check if the resident exists and then trigger a custom select resident action 
            let resident = _.find(this.props.residentList, (d) => d.fullname == datapoint[0].label);
            if (resident) {
                // set the username on the filter
                residentFilter.username = resident.username;
                actions.switchToResidentDashboard(resident, residentFilter, programInfo);
            }
        }

    }

    render() {

        const { records, width } = this.props, { trackType, dualTracks } = this.state;

        const dateFilterActive = document.getElementById('filter-dateFilterActive') && document.getElementById('filter-dateFilterActive').checked;

        let sortedRecords = _.sortBy(records, (d) => d[trackType]);

        let datasets = [{
            label: "Overall",
            fillColor: "rgba(28,168,221,.03)",
            strokeColor: "#43b98e",
            pointColor: "#43b98e",
            pointStrokeColor: 'rgba(28,168,221,.03)',
            pointHighlightFill: "rgba(28,168,221,.03)",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: _.map(sortedRecords, (d) => d[trackType])
        }];

        if (dateFilterActive) {
            if (dualTracks) {
                datasets.push({
                    label: "Period",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: _.map(sortedRecords, (d) => d[trackType + "_period"])
                });
            }
            else {
                datasets = [{
                    label: "Period",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: _.map(sortedRecords, (d) => d[trackType + "_period"])
                }];
            }
        }

        // create Bar object for chart
        const BarData = {
            labels: _.map(sortedRecords, (d) => d.resident_name),
            datasets
        }

        let BarOptions = {
            scaleBeginAtZero: true
        };

        return (
            <div className='normative-graph'>
                <div className='sub-filter'>
                    <div className='radio-button-container'>
                        <RadioButton value={'epa_per_week'} id={'track_epa_per_week'} className='track-radio' name='track-select'
                            label={"EPAs/week"}
                            onChange={this.radioChange}
                            checked={trackType == 'epa_per_week'} />
                        <RadioButton value={'record_count'} id={'track_record_count'} className='track-radio' name='track-select'
                            label={"EPAs"}
                            onChange={this.radioChange}
                            checked={trackType == 'record_count'} />
                        <RadioButton value={'expiry_rate'} id={'track_expiry_rate'} className='track-radio' name='track-select'
                            label={"EPA Expiry Rate(%)"}
                            onChange={this.radioChange}
                            checked={trackType == 'expiry_rate'} />
                    </div>
                    {dateFilterActive &&
                        <div className="checkbox custom-control text-center custom-checkbox">
                            <label className='filter-label'>
                                {"Compare with Overall"}
                                <input id='filter-dateFilterActive' type="checkbox" checked={dualTracks} onChange={this.onCheckboxChange} />
                                <span className="custom-control-indicator"></span>
                            </label>
                        </div>}
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
        residentFilter: state.oracle.residentFilter,
        //  can be null occasionally so better to check and set it
        programInfo: state.oracle.programInfo ? state.oracle.programInfo : {}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NormativeGraph);



