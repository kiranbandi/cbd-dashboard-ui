import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';


export default class ProgramCountPlot extends Component {

    render() {
        const { programData, width } = this.props;

        // remove the overall count at the end of the array since that 
        // data distorts the graph
        const custom_data = _.map(programData, (d, i) => {
            return {
                'name': d.programName,
                'resident_count': d.resident_count,
                'EPAs Acquired': d.epa_count,
                'EPAs Expired': d.expired_count
            }
        }).slice(0, -1);

        return (
            <div className='program-part-container'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content">
                        {'EPAs Acquired and Expired'}
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
                                    return [Math.round(value) + " (" + (props.payload.resident_count) + ' Residents)', name];
                                }
                                else { return [Math.round(value), name] }
                            }} />
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        <Bar background={() => {

                            return 'red'

                        }} isAnimationActive={false} dataKey="EPAs Acquired" fill="#82ca9d" />
                        <Bar isAnimationActive={false} dataKey="EPAs Expired" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
        );
    }
}


