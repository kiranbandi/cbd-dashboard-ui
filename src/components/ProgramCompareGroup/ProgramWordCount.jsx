import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    HorizontalBarSeries
} from 'react-vis';


export default class ProgramCountPlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hoverValue: '',
            HoverX: 0,
            HoverY: 0
        };
    }

    render() {
        const { programData, width } = this.props,
            { hoverValue, HoverX, HoverY } = this.state,
            data = _.map(programData, (d, i) => ({
                'x': d.words_per_comment,
                'y': i + 1,
                'yLabel': d.programName + ', ' + d.words_per_comment + ' words'
            }));

        return (
            <div className='program-part-container'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content"> EPA Feedback Word Count </h4>
                </div>
                <div className='chart-container'>
                    <XYPlot yType="ordinal"
                        width={width} height={500}
                        margin={{ left: 20, right: 20, top: 10, bottom: 40 }}>
                        <XAxis />
                        <HorizontalBarSeries data={data}
                            onValueMouseOut={() => { this.setState({ 'hoverValue': null }) }}
                            onValueMouseOver={(datapoint, { event }) => {
                                this.setState({
                                    'hoverValue': datapoint.yLabel,
                                    'HoverX': event.pageX - 10,
                                    'HoverY': event.pageY - 50
                                });
                            }} />
                    </XYPlot>
                    {hoverValue &&
                        <div className='graph-tooltip' style={{ 'left': HoverX, 'top': HoverY }}>
                            <span>{hoverValue}</span>
                        </div>}
                </div>
            </div >
        );
    }
}


