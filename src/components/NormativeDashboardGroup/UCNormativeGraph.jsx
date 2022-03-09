import React, { Component } from 'react';
// import { Bar } from 'react-chartjs';
import { RadioButton } from '../';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default class NormativeGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackType: 'record_count',
            dualTracks: true
        };
        this.radioChange = this.radioChange.bind(this);

    }

    radioChange(event) {
        this.setState({ trackType: event.target.value });
    }

    handleChartClick = (resident) => {
        // if a valid resident name has been clicked
        if (resident && resident.username.length > 0) {
            this.props.selectResident(resident.username);
        }
    }

    render() {

        const { records, width } = this.props, { trackType } = this.state;

        let sortedRecords = _.sortBy(records, (d) => d[trackType]);

        const custom_data = _.map(sortedRecords, (d, i) => {
            return {
                'Resident': d.resident_name,
                'username': d.username,
                [createLabel(trackType)]: d[trackType],
            }
        });

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
                <div className='chart-container'>
                    <BarChart width={width} height={400}
                        data={custom_data}
                        barGap={0}
                        barCategoryGap={'10%'}
                        margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                        <XAxis interval={0} style={{ fill: 'black', 'fontWeight': 'bolder' }} dataKey="Resident" />
                        <YAxis />
                        <Tooltip labelStyle={{ 'color': 'black' }} allowEscapeViewBox={{ x: false, y: true }} wrapperStyle={{ 'fontWeight': 'bold' }} />
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        <Bar onClick={this.handleChartClick} isAnimationActive={true} dataKey={createLabel(trackType)} fill="rgb(78, 121, 167)" />
                    </BarChart>
                </div>

            </div>)
    }

}

const createLabel = (s) => capitalizeStr(s.split('_').join(' '));
const capitalizeStr = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
