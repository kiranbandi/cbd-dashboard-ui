import React, { Component } from 'react';
import * as d3 from 'd3';

export default class UGNormativePanel extends Component {

    constructor(props) {
        super(props);
    }



    render() {

        const { rawDump = [], width, currentStudent = '' } = this.props;

        let residentGroupedRecords = _.groupBy(rawDump, (d) => d.name);

        let data = _.map(residentGroupedRecords, (d, key) => ([key, d.length, 0]));

        // sort the data list based on the overall value
        data = data.sort((a, b) => a[1] - b[1]);

        const height = 350, margin = 10, Xoffset = 50;

        const itemSize = data.length > 0 ? ((width - margin - Xoffset) / data.length) : 2;

        // create the X and Y scales
        const scaleX = d3.scaleLinear().range([Xoffset, width - margin - Xoffset]).domain([0, data.length - 1]);
        let scaleY = d3.scaleLinear().range([height - margin, margin]).domain([0, d3.max(data.map(d => Math.max(d[1], d[2])))]);


        // create bars
        const bars = data.map((d, i) => {
            return <rect
                x={scaleX(i)}
                y={scaleY(d[1])}
                height={height - margin - scaleY(d[1])}
                fill={d[0] == currentStudent ? 'red' : '#43b98e'}
                width={itemSize - (0.25 * itemSize)}
                stroke={'transparent'}
                key={d[0]}
                opacity={'0.50'}>
            </rect>
        });

        let dataMax = d3.max(data.map(d => Math.max(d[1], d[2])));

        // this fuctional automatically set the tick format based on the track type
        const axisTickTextsFormat = d => {
            return Math.round(d);
        };


        // create the 5 vertical tick lines 
        let axisTickLines = _.times(5, (index) => {
            let verticalPosition = dataMax * (index / 4);
            return d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[Xoffset, verticalPosition], [width - margin, verticalPosition]])
        })

        // The numbers of the Y axis ticks are created and format
        let axisTickTexts = _.map(axisTickLines, (unused, index) => {
            return <text key={'axis-tick' + index} x={5}
                y={height - (margin / 2) - (index * ((height - (2 * margin)) / 4))}
                fontWeight='bold' fill='#a9a1a1'> {axisTickTextsFormat(dataMax * (index / 4))}
            </text>
        })

        const hoverLines = data.map((d, i) => {
            return <rect
                className={'hoverable-rectangle '}
                x={scaleX(i)}
                y={margin}
                height={height - (2 * margin)}
                fill={'black'}
                width={itemSize - (0.25 * itemSize)}
                stroke={'transparent'}
                key={d[0]}
                opacity={0}>
                <title>{d[0] + '\nOverall: ' + d[1]}</title>
            </rect>
        });

        return (<svg className='supervisor-line-chart' width={width} height={height} >
            <path d={axisTickLines} fill="none" stroke="#564d4d4d" strokeWidth="2px"></path>
            <g>{bars}</g>
            <g>{axisTickTexts}</g>
            <g>{hoverLines}</g>
        </svg >);
    }

}





