import React, { Component } from 'react';
import _ from 'lodash';

export default class TrackLegend extends Component {

    render() {
        const { legends } = this.props;
        return (
            <g className='tracksLegendContainer'>
                {_.map(legends, (legend) =>
                    <g key={legend.labelID}>
                        <circle r={10} cx={legend.x - 3} cy={legend.y}><title>{legend.label}</title></circle>
                        <text x={legend.x - 7} y={legend.y + 5}>{legend.labelID}<title>{legend.label}</title></text>
                    </g>)}
            </g>
        );
    }
}

