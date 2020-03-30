import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    HorizontalBarSeries
} from 'react-vis';


export default class ProgramCountPlot extends Component {

    render() {
        const { programData, width } = this.props,
            epa_count_data = _.map(programData, (d, i) => ({ 'x': d.epa_count, 'y': i + 1 })),
            epa_expired_data = _.map(programData, (d, i) => ({ 'x': d.expired_count, 'y': i + 1 }));

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
                    <h2 className='chart-title'>EPAs Acquired and Expired</h2>
                </div>
            </div>
        );
    }
}


