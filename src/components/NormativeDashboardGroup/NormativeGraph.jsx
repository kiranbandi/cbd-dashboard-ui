import React, { Component } from 'react';
import { Line } from 'react-chartjs';
import { RadioButton } from '../';

export default class NormativeGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackType: 'epa_per_week'
        };
        this.radioChange = this.radioChange.bind(this);
    }


    radioChange(event) {
        this.setState({ trackType: event.target.value });
    }

    render() {

        const { records, width } = this.props, { trackType } = this.state;

        let sortedRecords = _.sortBy(records, (d) => d[trackType]);

        // create line object for chart
        const lineData = {
            labels: _.map(sortedRecords, (d) => d.resident_name),
            datasets: [{
                label: "Normative",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                pointColor: "#43b98e",
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(sortedRecords, (d) => d[trackType])
            }]
        }

        let lineOptions = {
            scaleBeginAtZero: true
        };

        return (
            <div className='normative-graph'>
                <div className='radio-button-container'>
                    <RadioButton value={'epa_per_week'} id={'track_epa_per_week'} className='track-radio' name='track-select'
                        label={"EPAs/week"}
                        onChange={this.radioChange}
                        checked={trackType == 'epa_per_week'} />

                    <RadioButton value={'record_count'} id={'track_record_count'} className='track-radio' name='track-select'
                        label={"EPAs"}
                        onChange={this.radioChange}
                        checked={trackType == 'record_count'} />
                    <RadioButton value={'expired'} id={'track_expired'} className='track-radio' name='track-select'
                        label={"Expired"}
                        onChange={this.radioChange}
                        checked={trackType == 'expired'} />
                </div>
                <Line
                    options={lineOptions}
                    data={lineData}
                    width={width} height={450} />
            </div>)
    }

}

