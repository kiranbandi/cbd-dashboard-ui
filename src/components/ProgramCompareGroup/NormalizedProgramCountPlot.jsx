import React, { Component } from 'react';
import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, ReferenceLine, Legend
} from 'recharts';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { customBackground } from './customBackground';

export default class NormalizedProgramCountPlot extends Component {


    render() {
        const { programData, width, printModeON } = this.props;
        const custom_data = _.map(programData, (d, i) => {
            return {
                'name': d.programName,
                'isActiveProgram': d.isActiveProgram,
                'resident_count': d.resident_count,
                'EPAs Acquired': d.epa_count / (d.resident_count != 0 ? d.resident_count : 1),
                'EPAs Expired': d.expired_count / (d.resident_count != 0 ? d.resident_count : 1)
            }
        });

        const averageData = custom_data.slice(-1)[0];

        return (
            <div className='program-part-container'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content">
                        {'EPAs Acquired and Expired (per resident)'}
                        <InfoTip info={infoTooltipReference.comparePrograms.EPAsAcquiredAndExpired} />
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
                                    return [Math.round(value) + ' per Resident' + " (" + (props.payload.resident_count) + ' Residents)', name];
                                }
                                else {
                                    return [Math.round(value) + ' per Resident', name];
                                }
                            }} />
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        <Bar background={customBackground} isAnimationActive={false} dataKey="EPAs Acquired" fill="#82ca9d" />
                        <Bar background={customBackground} isAnimationActive={false} dataKey="EPAs Expired" fill="#8884d8" />
                        <ReferenceLine x={averageData["EPAs Acquired"]} stroke="#82ca9d" strokeWidth='2' strokeDasharray="3 3" />
                        <ReferenceLine x={averageData["EPAs Expired"]} stroke="#8884d8" strokeWidth='2' strokeDasharray="3 3" />
                    </BarChart>
                </div>
            </div>
        );
    }
}


