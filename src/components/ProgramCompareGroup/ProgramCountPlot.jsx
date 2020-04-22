import React, { Component } from 'react';
import { XYPlot, XAxis, HorizontalBarSeries } from 'react-vis';
import Switch from 'react-switch';


export default class ProgramCountPlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            normalizeByResident: false,
        };
        this.normalizeResidentToggle = this.normalizeResidentToggle.bind(this);
    }

    normalizeResidentToggle() {
        this.setState({ normalizeByResident: !this.state.normalizeByResident });
    }


    render() {
        const { programData, width } = this.props, { normalizeByResident } = this.state;


        const epa_count_data = _.map(programData, (d, i) => {
            // if normalize is true , normalise by resident count but first check if residents are not zero
            return {
                'x': d.epa_count / (normalizeByResident ? d.resident_count != 0 ? d.resident_count : 1 : 1),
                'y': i + 1
            };
        }),
            epa_expired_data = _.map(programData, (d, i) => {
                return {
                    'x': d.expired_count / (normalizeByResident ? d.resident_count != 0 ? d.resident_count : 1 : 1),
                    'y': i + 1
                };
            });

        return (
            <div className='program-part-container'>
                <div>
                    <XYPlot yType="ordinal"
                        width={width} height={500}
                        margin={{ left: 20, right: 20, top: 10, bottom: 40 }}>
                        <XAxis />
                        <HorizontalBarSeries data={epa_count_data} />
                        <HorizontalBarSeries data={epa_expired_data} />
                    </XYPlot>
                    <h2 className='chart-title'>
                        <span>EPAs Acquired and Expired</span>
                        <span className='switch-container'>
                            <div className='switch-inner'>
                                <label htmlFor="material-switch">
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
                                        id="material-switch" />
                                </label>
                            </div>
                            <span>Normalize</span>
                        </span>
                    </h2>
                </div>
            </div>
        );
    }
}


