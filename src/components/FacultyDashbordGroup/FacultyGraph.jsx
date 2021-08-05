import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactTooltip from 'react-tooltip';

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

        let { className, data, width, trackType, selectFaculty,
            currentFaculty, title, titleValue, tooltipRef, tooltipID } = this.props;

        // sort the data list based on the overall value
        data = data.sort((a, b) => a[1] - b[1]);

        const height = 350, margin = 10, Xoffset = 50;

        // The size of the bar is 0.75% of the item size and rest is left as a gap
        const itemSize = data.length > 0 ? ((width - margin) / data.length) : 2;
        // The last bar would go beyond the available width by 75%
        //  so that width is removed from the scale 

        // create the X and Y scales and modify them based on the track type
        const scaleX = d3.scaleLinear().range([Xoffset, width - margin - 0.75 * itemSize]).domain([0, data.length - 1]);
        let scaleY = d3.scaleLinear().range([height - margin, margin]).domain([0, d3.max(data.map(d => d[1]))]);
        // epa score scale doesnt vary based on max values but its always between 0 and 5
        if (trackType == 'entrustment_score') {
            scaleY = d3.scaleLinear().range([height - margin, margin]).domain([0, 5]);
        }

        // create bars
        const bars = data.map((d, i) => {
            return <rect
                x={scaleX(i)}
                y={scaleY(d[1])}
                height={height - margin - scaleY(d[1])}
                fill={d[0] == currentFaculty ? '#e64759' : '#43b98e'}
                width={itemSize - (0.25 * itemSize)}
                stroke={'transparent'}
                key={d[0]}
                opacity='0.50'>
            </rect>
        });

        let dataMax = d3.max(data.map(d => d[1]));

        // this fuctional automatically set the tick format based on the track type
        const axisTickTextsFormat = d => {
            switch (trackType) {
                case 'epa_count':
                    return Math.round(d);
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
                className={'hoverable-rectangle '}
                x={scaleX(i)}
                y={margin}
                height={height - (2 * margin)}
                fill={'black'}
                width={itemSize - (0.25 * itemSize)}
                stroke={'transparent'}
                id={'faculty-bar-' + d[0].split(' ').join('--')}
                key={d[0]}
                opacity={0}
                onClick={selectFaculty}>
                <title>{d[0] + ' \n ' + d[1]}</title>
            </rect>
        });

        return (<div className={'faculty-graph-box m-r m-b ' + className}>
            <h3 className="text-left m-b">
                {title}
                <b className='title-append'>{titleValue}</b>
                <i data-for={tooltipID} data-tip={tooltipRef} className="fa fa-info-circle instant-tooltip-trigger"></i>
            </h3>
            <svg className='supervisor-line-chart' width={width} height={height} >
                <path d={axisTickLines} fill="none" stroke="#564d4d4d" strokeWidth="2px"></path>
                <g>{bars}</g>
                <g>{axisTickTexts}</g>
                <g>{hoverLines}</g>
            </svg>
            <ReactTooltip id={tooltipID} className='custom-react-tooltip' />
        </div>);

    }

}