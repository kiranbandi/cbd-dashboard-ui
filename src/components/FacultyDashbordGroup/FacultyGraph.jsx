import React, { Component } from 'react';
import * as d3 from 'd3';

export default class FacultyGraph extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        // The data will be in the format [name, value, value in date period]
        // The track type can be one of the following:
        // 1) epa_count
        // 2) expired_epa_percentage
        // 3) entrustment_score 
        // 4) words_per_comment

        let { data, width, trackType, dateFilterActive, startDate, endDate } = this.props;

        // sort the data list based on the overall value
        data = data.sort((a, b) => a[1] - b[1]);

        const height = 350, margin = 10, Xoffset = 50;


        // create the X and Y scales and modify them based on the track type
        const scaleX = d3.scaleLinear().range([Xoffset, width - margin]).domain([0, data.length - 1]);
        let scaleY = d3.scaleLinear().range([height - margin, margin]).domain([0, d3.max(data.map(d => Math.max(d[1], d[2])))]);
        // epa score scale doesnt vary based on max values but its always between 0 and 5
        if (trackType == 'entrustment_score') {
            scaleY = d3.scaleLinear().range([height - margin, margin]).domain([0, 5]);
        }

        // create the line path
        const line = d3.line().x(d => scaleX(data.findIndex(dd => dd == d))).y(d => scaleY(d[1]))(data);

        // create circles
        const circles = data.map((d, i) => {
            return <circle
                cx={scaleX(i)}
                cy={scaleY(d[1])}
                fill={'#43b98e'}
                r={5}
                strokeWidth={2}
                stroke={'transparent'}
                key={d[0]}>
                <title>{d[0] + '\nOverall: ' + (trackType == 'expired_epa_percentage' ? d[1] + '%' : d[1]) + '\nPeriod: ' + (trackType == 'expired_epa_percentage' ? d[2] + '%' : d[2])}</title>
            </circle>
        });

        let lineInDateRange, circlesInDateRange;

        if (dateFilterActive && startDate && endDate) {
            lineInDateRange = d3.line().x(d => scaleX(data.findIndex(dd => dd == d))).y(d => scaleY(d[2]))(data);
            circlesInDateRange = data.map((d, i) => {
                return <circle
                    cx={scaleX(i)}
                    cy={scaleY(d[2])}
                    fill={'rgba(151,187,205,1)'}
                    r={5}
                    strokeWidth={2}
                    stroke={'transparent'}
                    key={d[0]}>
                    <title>{d[0] + '\nOverall: ' + (trackType == 'expired_epa_percentage' ? d[1] + '%' : d[1]) + '\nPeriod: ' + (trackType == 'expired_epa_percentage' ? d[2] + '%' : d[2])}</title>
                </circle>
            });
        }

        let dataMax = d3.max(data.map(d => Math.max(d[1], d[2])));


        // this fuctional automatically set the tick format based on the track type
        const axisTickTextsFormat = d => {
            switch (trackType) {
                case 'epa_count':
                    return Math.round(d);
                case 'expired_epa_percentage':
                    return d + '%';
                case 'entrustment_score':
                    return d.toFixed(0);
                case 'words_per_comment':
                    return Math.round(d);
            }
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


        // for entrustment score we have 6 lines and special axis texts
        if (trackType == 'entrustment_score') {

            axisTickLines = _.times(6, (index) => {
                let verticalPosition = index;
                return d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[Xoffset, verticalPosition], [width - margin, verticalPosition]])
            })

            axisTickTexts = _.map(axisTickLines, (unused, index) => {
                return <text key={'axis-tick' + index}
                    x={5} y={height - (margin / 2) - (index * ((height - (2 * margin)) / 5))} fontWeight='bold' fill='#a9a1a1'>
                    {axisTickTextsFormat((index))}
                </text>
            });
        }


        const hoverLines = data.map((d, i) => {
            return <rect
                key={i}
                x={scaleX(i)}
                y={0}
                height={height}
                width={15}
                opacity={0}>
                <title>{d[0] + '\nOverall: ' + (this.props.trackType == 'expired_epa_percentage' ? d[1] + '%' : d[1]) + '\nPeriod: ' + (this.props.trackType == 'expired_epa_percentage' ? d[2] + '%' : d[2])}</title>
            </rect>
        });

        return (<svg className='supervisor-line-chart' width={width} height={height} >
            <path d={axisTickLines} fill="none" stroke="#564d4d4d" strokeWidth="2px"></path>
            <path d={line} fill="none" stroke="#43b98e" strokeWidth="2px"></path>
            <g>{hoverLines}</g>
            <g>{circles}</g>
            <path d={lineInDateRange} fill="none" stroke="rgba(151,187,205,1)" strokeWidth="2px"></path>
            <g>{circlesInDateRange}</g>
            <g>{axisTickTexts}</g>
        </svg>);
    }
}