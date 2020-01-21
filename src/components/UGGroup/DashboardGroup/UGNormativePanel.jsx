import React, { Component } from 'react';
import * as d3 from 'd3';

export default class UGNormativePanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stackByScore: true
        };

        this.onClick = this.onClick.bind(this);
        this.toggleStackFlag = this.toggleStackFlag.bind(this);
    }

    toggleStackFlag(event) {
        this.setState({ stackByScore: event.target.checked });
    }

    onClick(event) {
        const value = event.target.id.slice(3).split('_').join(' ');
        this.props.onStudentSelect({ value });
    }



    render() {

        const { stackByScore } = this.state, { rawDump = [], width, currentStudent = '' } = this.props;

        let residentGroupedRecords = _.groupBy(rawDump, (d) => d.nsid),
            // nsid , number of records , records in date period, name
            data = _.map(residentGroupedRecords, (d, key) => ([key, d.length, 0, d[0].name]));

        const height = 500, margin = 50,
            itemSize = data.length > 0 ? ((width - margin) / data.length) : 2,
            // create the X and Y scales
            scaleX = d3.scaleLinear().range([margin, width - margin - 0.75 * itemSize]).domain([0, data.length - 1]),
            scaleY = d3.scaleLinear().range([height - margin, margin]).domain([0, d3.max(data.map(d => Math.max(d[1], d[2])))]);

        // sort the data list based on the overall value
        data = data.sort((a, b) => a[1] - b[1]);

        // create bars
        const bars = data.map((d, i) => {

            const records = _.groupBy(residentGroupedRecords[d[0]], (d) => d.rating);

            const scoreShare = _.map([1, 2, 3], (d) => {
                return (records[d] ? records[d].length : 0);
            })

            if (stackByScore) {
                return [<rect
                    x={scaleX(i)}
                    y={scaleY(scoreShare[0] + scoreShare[1] + scoreShare[2])}
                    height={height - margin - scaleY(scoreShare[0] + scoreShare[1] + scoreShare[2])}
                    fill={d[3] == currentStudent ? 'yellow' : "#2ca02c"}
                    width={itemSize - (0.25 * itemSize)}
                    stroke={'transparent'}
                    key={d[0] + '-stack-1'}
                    opacity={'0.50'}>
                </rect>,
                <rect
                    x={scaleX(i)}
                    y={scaleY(scoreShare[0] + scoreShare[1])}
                    height={height - margin - scaleY(scoreShare[0] + scoreShare[1])}
                    fill={d[3] == currentStudent ? 'yellow' : "#1f77b4"}
                    width={itemSize - (0.25 * itemSize)}
                    stroke={'transparent'}
                    key={d[0] + '-stack-2'}
                    opacity={'0.50'}>
                </rect>, <rect
                    x={scaleX(i)}
                    y={scaleY(scoreShare[0])}
                    height={height - margin - scaleY(scoreShare[0])}
                    fill={d[3] == currentStudent ? 'yellow' : "#d62728"}
                    width={itemSize - (0.25 * itemSize)}
                    stroke={'transparent'}
                    key={d[0] + '-stack-3'}
                    opacity={'0.50'}>
                </rect>]
            }
            else {
                return <rect
                    x={scaleX(i)}
                    y={scaleY(d[1])}
                    height={height - margin - scaleY(d[1])}
                    fill={d[3] == currentStudent ? 'yellow' : "#1ca8dd"}
                    width={itemSize - (0.25 * itemSize)}
                    stroke={'transparent'}
                    key={d[0] + '-stack-3'}
                    opacity={'0.65'}>
                </rect>
            }


        });

        let dataMax = d3.max(data.map(d => Math.max(d[1], d[2])));

        // this fuctional automatically set the tick format based on the track type
        const axisTickTextsFormat = d => {
            return Math.round(d);
        };


        // create the 5 vertical tick lines 
        let axisTickLines = _.times(5, (index) => {
            let verticalPosition = dataMax * (index / 4);
            return d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[margin, verticalPosition], [width - margin, verticalPosition]])
        })

        // The numbers of the Y axis ticks are created and format
        let axisTickTexts = _.map(axisTickLines, (unused, index) => {
            return <text key={'axis-tick' + index} x={margin / 2}
                y={height - (margin) - (index * ((height - (2 * margin)) / 4))}
                fontWeight='bold' fill='#a9a1a1'> {axisTickTextsFormat(dataMax * (index / 4))}
            </text>
        })

        const hoverLines = data.map((d, i) => {
            return <rect
                className={'hoverable-rectangle'}
                id={'ug_' + d[3].split(' ').join('_')}
                x={scaleX(i)}
                y={margin}
                height={height - (2 * margin)}
                fill={'black'}
                width={itemSize - (0.25 * itemSize)}
                stroke={'transparent'}
                key={d[0]}
                onClick={this.onClick}
                opacity={0}>
                <title>{d[3] + '\nOverall: ' + d[1]}</title>
            </rect>
        });

        return (<div className='ug-normative-container'>
            <div className="checkbox custom-control text-center custom-checkbox">
                <label className='filter-label'>
                    {"Show Score Distribution"}
                    <input id='toggle-stack' type="checkbox"
                        checked={stackByScore} onChange={this.toggleStackFlag} />
                    <span className="custom-control-indicator"></span>
                </label>
            </div>
            <svg className='supervisor-line-chart' width={width} height={height} >
                <path d={axisTickLines} fill="none" stroke="#564d4d4d" strokeWidth="2px"></path>
                <g>{bars}</g>
                <g>{axisTickTexts}</g>
                <g>{hoverLines}</g>
            </svg >
        </div>);
    }

}





