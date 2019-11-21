import React, { Component } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

export default class SupervisorGraph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let filteredObserverDataList = this.props.observerDataList.filter(d => d.data.filter(dd => !dd.isExpired).length > 5);

        let data = filteredObserverDataList.map(d => {
            let dataInDateRange;
            if (this.props.dateFilterActive && this.props.startDate && this.props.endDate) {
                dataInDateRange = d.data.filter(dd =>
                    moment(dd.observation_date, 'YYYY-MM-DD').isBetween(
                        moment(this.props.startDate, 'MM/DD/YYYY'),
                        moment(this.props.endDate, 'MM/DD/YYYY')
                    )
                );
            }

            switch (this.props.trackType) {
                case 'expired_epa_percentage':
                    return [
                        d.name,
                        Math.round(d.data.filter(dd => dd.isExpired).length / d.data.length * 100),
                        (dataInDateRange && dataInDateRange.length > 0) ?
                            Math.round(dataInDateRange.filter(dd => dd.isExpired).length / dataInDateRange.length * 100) : Number.NaN
                    ];
                case 'entrustment_score':
                    return [
                        d.name,
                        Math.round((d3.mean(d.data.filter(dd => !dd.isExpired).map(dd => +dd.rating || 0)) || 0) * 100) / 100,
                        (dataInDateRange && dataInDateRange.length > 0) ?
                            Math.round((d3.mean(dataInDateRange.filter(dd => !dd.isExpired).map(dd => +dd.rating || 0)) || 0) * 100) / 100 : Number.NaN
                    ];
                case 'words_per_comment':
                    return [
                        d.name,
                        Math.round(d3.mean(d.data.filter(dd => !dd.isExpired).map(dd => dd.feedback.split(" ").length) || 0)),
                        (dataInDateRange && dataInDateRange.length > 0) ?
                            Math.round(d3.mean(dataInDateRange.filter(dd => !dd.isExpired).map(dd => dd.feedback.split(" ").length) || 0)) : Number.NaN
                    ];
            }
        }).sort((a, b) => a[1] - b[1]);
        if ((this.props.dateFilterActive && this.props.startDate && this.props.endDate)) {
            data = data.filter(d => d[2] && !Number.isNaN(d[2]));
        }
        data.forEach(d => {
            if (Number.isNaN(d[2])) {
                d[2] = 0;
            }
        });

        const width = this.props.width - 40;
        const height = 450;

        const scaleX = d3.scaleLinear().range([50, width - 10]).domain([0, data.length - 1]);
        let scaleY = d3.scaleLinear().range([height - 10, 10]).domain([0, d3.max(data.map(d => Math.max(d[1], d[2])))]);
        if (this.props.trackType == 'entrustment_score') {
            scaleY = d3.scaleLinear().range([height - 10, 10]).domain([1, 5]);
        }

        const line = d3.line().x(d => scaleX(data.findIndex(dd => dd == d))).y(d => scaleY(d[1]))(data);
        const circles = data.map((d, i) => {
            return <circle
                cx={scaleX(i)}
                cy={scaleY(d[1])}
                fill={(this.props.currentObserverName && this.props.currentObserverName.toLowerCase() == d[0].toLowerCase()) ? 'red' : '#43b98e'}
                r={5}
                strokeWidth={2}
                stroke={'transparent'}
                key={d[0]}
                onClick={() => this.props.onSelectObserver(d[0].toLowerCase())}
            >
                <title>{d[0] + '\nOverall: ' + (this.props.trackType == 'expired_epa_percentage' ? d[1] + '%' : d[1]) + '\nPeriod: ' + (this.props.trackType == 'expired_epa_percentage' ? d[2] + '%' : d[2])}</title>
            </circle>
        });

        let lineInDateRange;
        let circlesInDateRange;

        if (this.props.dateFilterActive && this.props.startDate && this.props.endDate) {
            lineInDateRange = d3.line().x(d => scaleX(data.findIndex(dd => dd == d))).y(d => scaleY(d[2]))(data);
            circlesInDateRange = data.map((d, i) => {
                return <circle
                    cx={scaleX(i)}
                    cy={scaleY(d[2])}
                    fill={(this.props.currentObserverName && this.props.currentObserverName.toLowerCase() == d[0].toLowerCase()) ? 'red' : 'rgba(151,187,205,1)'}
                    r={5}
                    strokeWidth={2}
                    stroke={'transparent'}
                    key={d[0]}
                    onClick={() => this.props.onSelectObserver(d[0].toLowerCase())}
                ></circle>
            });
        }

        let axisTickLines = [
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, 0], [width - 10, 0]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => Math.max(d[1], d[2]))) * .25], [width - 10, d3.max(data.map(d => Math.max(d[1], d[2]) * .25))]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => Math.max(d[1], d[2]))) * .5], [width - 10, d3.max(data.map(d => Math.max(d[1], d[2]) * .5))]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => Math.max(d[1], d[2]))) * .75], [width - 10, d3.max(data.map(d => Math.max(d[1], d[2]) * .75))]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => Math.max(d[1], d[2])))], [width - 10, d3.max(data.map(d => Math.max(d[1], d[2])))]])
        ];
        if (this.props.trackType == 'entrustment_score') {
            axisTickLines = [
                d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, 1], [width - 10, 1]]),
                d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, 2], [width - 10, 2]]),
                d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, 3], [width - 10, 3]]),
                d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, 4], [width - 10, 4]]),
                d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, 5], [width - 10, 5]])
            ];
        }
        const axisTickTextsFormat = d => {
            switch (this.props.trackType) {
                case 'expired_epa_percentage':
                    return d + '%';
                case 'entrustment_score':
                    return d.toFixed(0);
                case 'words_per_comment':
                    return Math.round(d);
            }
        };
        let axisTickTexts = [
            <text x={0} y={scaleY(0) + 5} fill={'white'}>{axisTickTextsFormat(0)}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => Math.max(d[1], d[2]))) * .25) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => Math.max(d[1], d[2]))) * .25))}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => Math.max(d[1], d[2]))) * .5) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => Math.max(d[1], d[2]))) * .5))}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => Math.max(d[1], d[2]))) * .75) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => Math.max(d[1], d[2]))) * .75))}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => Math.max(d[1], d[2])))) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => Math.max(d[1], d[2])))))}</text>
        ];
        if (this.props.trackType == 'entrustment_score') {
            axisTickTexts = [
                <text x={0} y={scaleY(1) + 5} fill={'white'}>{1}</text>,
                <text x={0} y={scaleY(2) + 5} fill={'white'}>{2}</text>,
                <text x={0} y={scaleY(3) + 5} fill={'white'}>{3}</text>,
                <text x={0} y={scaleY(4) + 5} fill={'white'}>{4}</text>,
                <text x={0} y={scaleY(5) + 5} fill={'white'}>{5}</text>
            ];
        }

        const hoverLines = data.map((d, i) => {
            return <rect
                x={scaleX(i)}
                y={0}
                height={height}
                width={15}
                opacity={0}
            >
                <title>{d[0] + '\nOverall: ' + (this.props.trackType == 'expired_epa_percentage' ? d[1] + '%' : d[1]) + '\nPeriod: ' + (this.props.trackType == 'expired_epa_percentage' ? d[2] + '%' : d[2])}</title>
            </rect>
        });

        return (
            <svg className='supervisor-line-chart' width={width} height={height}>
                <path d={axisTickLines} fill="none" stroke="white" strokeWidth="1px"></path>
                <path d={line} fill="none" stroke="#43b98e" strokeWidth="2px"></path>
                <g>{circles}</g>
                <path d={lineInDateRange} fill="none" stroke="rgba(151,187,205,1)" strokeWidth="2px"></path>
                <g>{circlesInDateRange}</g>
                <g>{axisTickTexts}</g>
                <g>{hoverLines}</g>
            </svg>
        );
    }
}