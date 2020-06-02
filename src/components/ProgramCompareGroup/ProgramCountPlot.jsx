import React, { Component } from 'react';
import { XYPlot, XAxis, HorizontalBarSeries } from 'react-vis';
import Switch from 'react-switch';


export default class ProgramCountPlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            normalizeByResident: true,
            hoverValue: '',
            HoverX: 0,
            HoverY: 0
        };
        this.normalizeResidentToggle = this.normalizeResidentToggle.bind(this);
    }

    normalizeResidentToggle() {
        this.setState({ normalizeByResident: !this.state.normalizeByResident });
    }

    render() {
        const { programData, width } = this.props,
            { normalizeByResident, hoverValue, HoverX, HoverY } = this.state;

        const epa_count_data = _.map(programData, (d, i) => {
            // if normalize is true , normalise by resident count but first check if residents are not zero
            return {
                'x': d.epa_count / (normalizeByResident ? d.resident_count != 0 ? d.resident_count : 1 : 1),
                'y': i + 1,
                'yLabel': d.programName + ', ' + d.epa_count + ' EPAs' + ', ' + d.resident_count + ' Residents'
            };
        }),
            epa_expired_data = _.map(programData, (d, i) => {
                return {
                    'x': d.expired_count / (normalizeByResident ? d.resident_count != 0 ? d.resident_count : 1 : 1),
                    'y': i + 1,
                    'yLabel': d.programName + ', ' + d.expired_count + "/" + d.epa_count + ' Expired EPAs' + ', ' + d.resident_count + ' Residents'
                };
            });

        return (
            <div className='program-part-container'>
                <div>
                    <XYPlot yType="ordinal"
                        width={width} height={500}
                        margin={{ left: 20, right: 20, top: 10, bottom: 40 }}>
                        <XAxis />
                        <HorizontalBarSeries onValueMouseOut={() => { this.setState({ 'hoverValue': null }) }}
                            onValueMouseOver={(datapoint, { event }) => {
                                this.setState({
                                    'hoverValue': datapoint.yLabel,
                                    'HoverX': event.pageX - 10,
                                    'HoverY': event.pageY - 50
                                });
                            }}
                            data={epa_count_data} />
                        <HorizontalBarSeries onValueMouseOut={() => { this.setState({ 'hoverValue': null }) }}
                            onValueMouseOver={(datapoint, { event }) => {
                                this.setState({
                                    'hoverValue': datapoint.yLabel,
                                    'HoverX': event.pageX - 10,
                                    'HoverY': event.pageY - 50
                                });
                            }}
                            data={epa_expired_data} />
                    </XYPlot>
                    {hoverValue &&
                        <div className='graph-tooltip' style={{ 'left': HoverX, 'top': HoverY }}>
                            <span>{hoverValue}</span>
                        </div>}
                    <h2 className='chart-title'>
                        <span>EPAs Acquired and Expired</span>
                        <span className='switch-container'>
                            <div className='switch-inner'>
                                <label htmlFor="material-switch-norm">
                                    <Switch
                                        checked={normalizeByResident}
                                        onChange={this.normalizeResidentToggle}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={35}
                                        className="react-switch"
                                        id="material-switch-norm" />
                                </label>
                            </div>
                            <span style={{ 'fontSize': '14px', 'fontWeight': 'bold' }}>Normalize by No. of Residents</span>
                        </span>
                    </h2>
                </div>
            </div>
        );
    }
}


