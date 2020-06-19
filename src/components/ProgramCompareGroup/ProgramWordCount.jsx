import React, { Component } from 'react';
import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, ReferenceLine, Legend
} from 'recharts';


export default class ProgramCountPlot extends Component {


    render() {
        const { programData, width } = this.props,
            custom_data = _.map(programData, (d, i) => ({ 'name': d.programName, 'Words Per Comment': d.words_per_comment }));

        const averageData = custom_data.slice(-1)[0];

        return (
            <div className='program-part-container'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content"> EPA Feedback Word Count </h4>
                </div>
                <div className='chart-container'>

                    <BarChart width={width} height={600}
                        data={_.reverse(custom_data)}
                        layout="vertical"
                        margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                        <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                            type="number" />
                        <YAxis style={{ 'fontWeight': 'bold' }}
                            width={105} tickSize={0} tickMargin={5} type="category" axisLine={false} dataKey="name" />
                        <Tooltip labelStyle={{ 'color': 'black' }}
                            wrapperStyle={{ 'fontWeight': 'bold' }} />
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        <Bar dataKey="Words Per Comment" fill="#82ca9d" />
                        <ReferenceLine x={averageData["Words Per Comment"]} stroke="#82ca9d" strokeWidth='2' strokeDasharray="3 3" />
                    </BarChart>
                </div>
            </div >
        );
    }
}


