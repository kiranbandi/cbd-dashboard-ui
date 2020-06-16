import React, { Component } from 'react';
import { XYPlot, HorizontalBarSeries } from 'react-vis';
import { PHASES_LIST } from '../../utils/programInfo';

const fivePointColorScale = ["#f28e2c", "#76b7b2", "#4e79a7", "#59a14f"];

export default class ProgramCountPlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hoverValue: '',
            HoverX: 0,
            HoverY: 0
        }
    }


    render() {
        const { programData, width } = this.props, { hoverValue, HoverX, HoverY } = this.state;

        const processedDataList = _.map(programData, (d) => {
            const total = _.sum(d.current_phase_group);
            return {
                'yLabel': d.programName,
                'data': _.map(d.current_phase_group, (d) => total == 0 ? 0 : ((d / total) * 100))
            }
        });

        return (
            <div className='program-part-container'>
                <div>
                    <XYPlot yType="ordinal" stackBy='x'
                        width={width} height={500}
                        margin={{ left: 20, right: 20, top: 10, bottom: 40 }}>
                        {_.map(fivePointColorScale, (colorShade, idx) => {

                            const phaseName = capitalize(PHASES_LIST[+idx].split('-').join(' '));

                            return <HorizontalBarSeries
                                key={'bar-graph-' + idx}
                                color={colorShade}
                                onValueMouseOut={(datapoint) => { this.setState({ 'hoverValue': null }) }}
                                onValueMouseOver={(datapoint, { event }) => {
                                    this.setState({
                                        'hoverValue': datapoint.yLabel,
                                        'HoverX': event.pageX - 10,
                                        'HoverY': event.pageY - 50
                                    });
                                }}
                                data={_.map(processedDataList, (d, i) => ({
                                    'x': d.data[idx],
                                    y: i + 1,
                                    'yLabel': d.yLabel + ', ' + phaseName + ', ' + Math.round(d.data[idx]) + '%'
                                }))} />
                        })}
                    </XYPlot>
                    <h2 className='chart-title'>Resident Training Phase</h2>
                    {hoverValue &&
                        <div className='graph-tooltip' style={{ 'left': HoverX, 'top': HoverY }}>
                            <span>{hoverValue}</span>
                        </div>}
                </div>
            </div >
        );
    }
}

const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
