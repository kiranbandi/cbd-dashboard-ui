import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
import { RadioButton } from '../';

export default class NormativeGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackType: 'record_count',
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
        let datapoint = this.chartCtx && this.chartCtx.getBarsAtEvent(event);
        // if a valid resident name has been clicked
        if (datapoint && datapoint.length > 0) {

            debugger;
            // first get the resident username from the list
            // then check if the resident exists and then trigger a custom select resident 
            let resident = _.find(this.props.residentList, (d) => d == datapoint[0].label);
            if (resident) { this.props.selectResident(resident) }
        }
    }

    render() {

        const { records, width } = this.props, { trackType } = this.state;

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
                        <RadioButton value={'record_count'} id={'track_record_count'} className='track-radio' name='track-select'
                            label={"EPAs"}
                            onChange={this.radioChange}
                            checked={trackType == 'record_count'} />
                        <RadioButton value={'epa_per_week'} id={'track_epa_per_week'} className='track-radio' name='track-select'
                            label={"EPAs/week"}
                            onChange={this.radioChange}
                            checked={trackType == 'epa_per_week'} />
                        <RadioButton value={'expiry_rate'} id={'track_expiry_rate'} className='track-radio' name='track-select'
                            label={"EPA Expiry Rate(%)"}
                            onChange={this.radioChange}
                            checked={trackType == 'expiry_rate'} />
                    </div>
                </div>
                <div className='canvas-wrapper' onClick={this.handleChartClick}>
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




