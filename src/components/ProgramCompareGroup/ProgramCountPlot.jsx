import React, { Component } from 'react';
import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, ReferenceLine, Legend
} from 'recharts';
import Switch from 'react-switch';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';


export default class ProgramCountPlot extends Component {

    constructor(props) {
        super(props);
        this.state = { normalizeByResident: true };
        this.normalizeResidentToggle = this.normalizeResidentToggle.bind(this);
    }

    normalizeResidentToggle() {
        this.setState({ normalizeByResident: !this.state.normalizeByResident });
    }

    render() {
        const { programData, width, printModeON } = this.props,
            { normalizeByResident } = this.state;

        const custom_data = _.map(programData, (d, i) => {
            return {
                'name': d.programName,
                'resident_count': d.resident_count,
                'EPAs Acquired': d.epa_count / (normalizeByResident ? d.resident_count != 0 ? d.resident_count : 1 : 1),
                'EPAs Expired': d.expired_count / (normalizeByResident ? d.resident_count != 0 ? d.resident_count : 1 : 1)
            }
        });

        const averageData = custom_data.slice(-1)[0];

        return (
            <div className='program-part-container'>
                <div className="hr-divider">
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        {'EPAs Acquired and Expired' + (normalizeByResident ? ' (Per resident)' : '')}
                        <InfoTip info={infoTooltipReference.comparePrograms.EPAsAcquiredAndExpired} />
                        <span
                            className='switch-container'
                            style={printModeON ? { display: 'none' } : undefined}>
                            <div className='switch-inner'>
                                <label htmlFor="material-switch-norm">
                                    <Switch
                                        checked={normalizeByResident}
                                        onChange={this.normalizeResidentToggle}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={16}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={12}
                                        width={35}
                                        className="react-switch"
                                        id="material-switch-norm" />
                                </label>
                            </div>
                            <span className='switch-label'>Normalize per Resident</span>
                        </span>
                    </h4>
                </div>
                <div className='chart-container'>
                    <BarChart width={width} height={600}
                        data={_.reverse(custom_data)}
                        layout="vertical"
                        barGap={0}
                        barCategoryGap={'20%'}
                        margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                        <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                            type="number" />
                        <YAxis style={{ 'fontWeight': 'bold' }}
                            width={105} tickSize={0} tickMargin={5} type="category" axisLine={false} dataKey="name" />
                        <Tooltip labelStyle={{ 'color': 'black' }}
                            wrapperStyle={{ 'fontWeight': 'bold' }}
                            formatter={(value, name, props) => {
                                if (name == 'EPAs Acquired') {
                                    return [Math.round(value) + (normalizeByResident ? ' per Resident' : '') + " (" + (props.payload.resident_count) + ' Residents)', name];
                                }
                                else {
                                    return [Math.round(value) + (normalizeByResident ? ' per Resident' : ''), name];
                                }
                            }} />
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        <Bar dataKey="EPAs Acquired" fill="#82ca9d" />
                        <Bar dataKey="EPAs Expired" fill="#8884d8" />
                        {normalizeByResident && <ReferenceLine x={averageData["EPAs Acquired"]} stroke="#82ca9d" strokeWidth='2' strokeDasharray="3 3" />}
                        {normalizeByResident && <ReferenceLine x={averageData["EPAs Expired"]} stroke="#8884d8" strokeWidth='2' strokeDasharray="3 3" />}
                    </BarChart>
                </div>
            </div>
        );
    }
}


