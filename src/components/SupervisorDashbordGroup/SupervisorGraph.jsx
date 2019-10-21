import React, { Component } from 'react';
import * as d3 from 'd3';

import { RadioButton } from '../';

export default class SupervisorGraph extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.observerDataList);
        console.log(this.props.currentObserverName);

        this.state = {
            trackType: 'expired_epa_percentage'
        };
        this.radioChange = this.radioChange.bind(this);
    }

    radioChange(event) {
        this.setState({ trackType: event.target.value });
    }

    render() {
        let data = this.props.observerDataList.filter(d => d.data.length > 10).map(d => {
            switch (this.state.trackType) {
                case 'expired_epa_percentage':
                    return [d.name, Math.round(d.data.filter(dd => dd.isExpired).length / d.data.length * 10000) / 100];
                case 'entrustment_score':
                    return [d.name, Math.round((d3.mean(d.data.filter(dd => !dd.isExpired).map(dd => +dd.rating || 0)) || 0) * 100) / 100];
                case 'words_per_comment':
                    return [d.name, Math.round(d3.mean(d.data.filter(dd => !dd.isExpired).map(dd => dd.feedback.split(" ").length) || 0))];
            }
        }).sort((a, b) => a[1] - b[1]);

        const width = document.body.getBoundingClientRect().width - 40;
        const height = 300;

        const scaleX = d3.scaleLinear().range([50, width - 10]).domain([0, data.length - 1]);
        const scaleY = d3.scaleLinear().range([height - 10, 10]).domain([0, d3.max(data.map(d => d[1]))]);

        const line = d3.line().x(d => scaleX(data.findIndex(dd => dd == d))).y(d => scaleY(d[1]))(data);
        const circles = data.map((d, i) => {
            return <circle
                cx={scaleX(i)}
                cy={scaleY(d[1])}
                fill={(this.props.currentObserverName && this.props.currentObserverName.toLowerCase() == d[0].toLowerCase()) ? 'red' : '#43b98e'}
                r={5}
                key={d[0]}
                onClick={() => this.props.onSelectObserver(d[0].toLowerCase())}
            >
                <title>{d[0] + ': ' + (this.state.trackType == 'expired_epa_percentage' ? d[1] + '%' : d[1])}</title>
            </circle>
        });

        const axisTickLines = [
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, 0], [width - 10, 0]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => d[1])) * .25], [width - 10, d3.max(data.map(d => d[1] * .25))]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => d[1])) * .5], [width - 10, d3.max(data.map(d => d[1] * .5))]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => d[1])) * .75], [width - 10, d3.max(data.map(d => d[1] * .75))]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => d[1]))], [width - 10, d3.max(data.map(d => d[1]))]])
        ];
        const axisTickTextsFormat = d => {
            switch (this.state.trackType) {
                case 'expired_epa_percentage':
                    return d.toFixed(2) + '%';
                case 'entrustment_score':
                    return d.toFixed(2);
                case 'words_per_comment':
                    return Math.round(d);
            }
        }
        const axisTickTexts = [
            <text x={0} y={scaleY(0) + 5} fill={'white'}>{axisTickTextsFormat(0)}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => d[1])) * .25) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => d[1])) * .25))}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => d[1])) * .5) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => d[1])) * .5))}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => d[1])) * .75) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => d[1])) * .75))}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => d[1]))) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => d[1]))))}</text>
        ]

        return (
            <div className='supervisor-graph'>
                <div className='sub-filter'>
                    <div className='radio-button-container'>
                        <RadioButton value={'expired_epa_percentage'} id={'track_expired_epa_ratio'} className='track-radio' name='track-select'
                            label={"Expired EPA Percentage"}
                            onChange={this.radioChange}
                            checked={this.state.trackType == 'expired_epa_percentage'} />
                        <RadioButton value={'entrustment_score'} id={'track_entrustment_score'} className='track-radio' name='track-select'
                            label={"Entrustment Score"}
                            onChange={this.radioChange}
                            checked={this.state.trackType == 'entrustment_score'} />
                        <RadioButton value={'words_per_comment'} id={'track_words_per_comment'} className='track-radio' name='track-select'
                            label={"Words Per Comment"}
                            onChange={this.radioChange}
                            checked={this.state.trackType == 'words_per_comment'} />
                    </div>
                </div>
                <svg className='supervisor-line-chart' width={width} height={height}>
                    <path d={axisTickLines} fill="none" stroke="white" strokeWidth="1px"></path>
                    <path d={line} fill="none" stroke="#43b98e" strokeWidth="2px"></path>
                    <g>{circles}</g>
                    <g>{axisTickTexts}</g>
                </svg>
            </div >
        );
    }
}