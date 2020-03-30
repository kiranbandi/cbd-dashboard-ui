import React, { Component } from 'react';
import { XYPlot, XAxis, HorizontalBarSeries, LabelSeries } from 'react-vis';

const fivePointColorScale = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f"];

export default class ProgramCountPlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: false
        }
    }


    render() {
        const { programData, width } = this.props;

        const processedDataList = _.map(programData, (d) => {
            const total = _.sum(d.rating_group);
            return _.map(d.rating_group, (d) => total == 0 ? 0 : ((d / total) * 100));
        });

        return (
            <div className='program-part-container'>
                <div>
                    <XYPlot yType="ordinal" stackBy='x'
                        width={width} height={500}
                        margin={{ left: 20, right: 20, top: 10, bottom: 40 }}>
                        {_.map(fivePointColorScale, (colorShade, idx) => {
                            return <HorizontalBarSeries
                                key={'bar-graph-' + idx}
                                color={colorShade}
                                data={_.map(processedDataList, (d, i) => ({ 'x': d[idx], y: i + 1 }))} />
                        })}
                    </XYPlot>
                    <h2 className='chart-title'>EPA Rating Distribution</h2>
                </div>
            </div >
        );
    }
}


