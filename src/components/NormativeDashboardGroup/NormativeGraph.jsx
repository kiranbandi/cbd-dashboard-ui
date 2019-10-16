import React, { Component } from 'react';
import { Line } from 'react-chartjs';
import { RadioButton } from '../';

export default class NormativeGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackType: 'epa_per_week',
            dualTracks: true
        };
        this.radioChange = this.radioChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
    }

    onCheckboxChange() {
        this.setState({ dualTracks: !this.state.dualTracks });
    }


    radioChange(event) {
        this.setState({ trackType: event.target.value });
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

        // create line object for chart
        const lineData = {
            labels: _.map(sortedRecords, (d) => d.resident_name),
            datasets
        }

        let lineOptions = {
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
                <Line
                    redraw={true}
                    options={lineOptions}
                    data={lineData}
                    width={width} height={450} />
            </div>)
    }

}

