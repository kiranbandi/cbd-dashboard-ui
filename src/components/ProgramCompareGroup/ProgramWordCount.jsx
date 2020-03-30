import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    HorizontalBarSeries
} from 'react-vis';


export default class ProgramCountPlot extends Component {

    render() {
        const { programData, width } = this.props,
            data = _.map(programData, (d, i) => ({ 'x': d.words_per_comment, 'y': i + 1 }));
            
        return (
            <div className='program-part-container'>
                <div>
                    <XYPlot yType="ordinal"
                        width={width} height={500}
                        margin={{ left: 20, right: 20, top: 10, bottom: 40 }}>
                        <XAxis />
                        <HorizontalBarSeries data={data} />
                    </XYPlot>
                    <h2 className='chart-title'>EPA Feedback Word Count</h2>
                </div>
            </div >
        );
    }
}


