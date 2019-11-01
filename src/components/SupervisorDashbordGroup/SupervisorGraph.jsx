import React, { Component } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

import { RadioButton } from '../';

export default class SupervisorGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trackType: 'expired_epa_percentage',
            startDate: null,
            endDate: null
        };
        this.radioChange = this.radioChange.bind(this);
        this.filterDate = this.filterDate.bind(this);
        this.render = this.render.bind(this);
    }

    radioChange(event) {
        this.setState({ trackType: event.target.value });
    }

    filterDate() {
        const startDate = this._filterStartDateInput ? this._filterStartDateInput.value : null;
        const endDate = this._filterEndDateInput ? this._filterEndDateInput.value : null;
        this.setState({
            startDate,
            endDate
        });
    }

    render() {
        let filteredObserverDataList = this.props.observerDataList.filter(d => d.data.filter(dd => !dd.isExpired).length > 5);

        let data = filteredObserverDataList.map(d => {
            let dataInDateRange;
            if (this.state.startDate && this.state.endDate) {
                dataInDateRange = d.data.filter(dd =>
                    moment(dd.observation_date, 'YYYY-MM-DD').isBetween(
                        moment(this._filterStartDateInput.value, 'MM/DD/YYYY'),
                        moment(this._filterEndDateInput.value, 'MM/DD/YYYY')
                    )
                );
            }

            switch (this.state.trackType) {
                case 'expired_epa_percentage':
                    return [
                        d.name,
                        Math.round(d.data.filter(dd => dd.isExpired).length / d.data.length * 100),
                        dataInDateRange ? Math.round(dataInDateRange.filter(dd => dd.isExpired).length / dataInDateRange.length * 100) : Number.NaN
                    ];
                case 'entrustment_score':
                    return [
                        d.name,
                        Math.round((d3.mean(d.data.filter(dd => !dd.isExpired).map(dd => +dd.rating || 0)) || 0) * 100) / 100,
                        dataInDateRange ? Math.round((d3.mean(dataInDateRange.filter(dd => !dd.isExpired).map(dd => +dd.rating || 0)) || 0) * 100) / 100 : Number.NaN
                    ];
                case 'words_per_comment':
                    return [
                        d.name,
                        Math.round(d3.mean(d.data.filter(dd => !dd.isExpired).map(dd => dd.feedback.split(" ").length) || 0)),
                        dataInDateRange ? Math.round(d3.mean(dataInDateRange.filter(dd => !dd.isExpired).map(dd => dd.feedback.split(" ").length) || 0)) : Number.NaN
                    ];
            }
        }).sort((a, b) => a[1] - b[1]);
        data.forEach(d => {
            if (Number.isNaN(d[2])) {
                d[2] = 0;
            }
        });

        const width = document.body.getBoundingClientRect().width - 40;
        const height = 300;

        const scaleX = d3.scaleLinear().range([50, width - 10]).domain([0, data.length - 1]);
        const scaleY = d3.scaleLinear().range([height - 10, 10]).domain([0, d3.max(data.map(d => Math.max(d[1], d[2])))]);

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
                <title>{d[0] + '\nOverall: ' + (this.state.trackType == 'expired_epa_percentage' ? d[1] + '%' : d[1]) + '\nPeriod: ' + (this.state.trackType == 'expired_epa_percentage' ? d[2] + '%' : d[2])}</title>
            </circle>
        });

        let lineInDateRange;
        let circlesInDateRange;

        if (this.state.startDate && this.state.endDate) {
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
                >
                    <title>{d[0] + '\nOverall: ' + (this.state.trackType == 'expired_epa_percentage' ? d[1] + '%' : d[1]) + '\nPeriod: ' + (this.state.trackType == 'expired_epa_percentage' ? d[2] + '%' : d[2])}</title>
                </circle>
            });
        }

        const axisTickLines = [
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, 0], [width - 10, 0]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => Math.max(d[1], d[2]))) * .25], [width - 10, d3.max(data.map(d => Math.max(d[1], d[2]) * .25))]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => Math.max(d[1], d[2]))) * .5], [width - 10, d3.max(data.map(d => Math.max(d[1], d[2]) * .5))]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => Math.max(d[1], d[2]))) * .75], [width - 10, d3.max(data.map(d => Math.max(d[1], d[2]) * .75))]]),
            d3.line().x(d => d[0]).y(d => scaleY(d[1]))([[50, d3.max(data.map(d => Math.max(d[1], d[2])))], [width - 10, d3.max(data.map(d => Math.max(d[1], d[2])))]])
        ];
        const axisTickTextsFormat = d => {
            switch (this.state.trackType) {
                case 'expired_epa_percentage':
                    return d + '%';
                case 'entrustment_score':
                    return d.toFixed(2);
                case 'words_per_comment':
                    return Math.round(d);
            }
        }
        const axisTickTexts = [
            <text x={0} y={scaleY(0) + 5} fill={'white'}>{axisTickTextsFormat(0)}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => Math.max(d[1], d[2]))) * .25) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => Math.max(d[1], d[2]))) * .25))}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => Math.max(d[1], d[2]))) * .5) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => Math.max(d[1], d[2]))) * .5))}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => Math.max(d[1], d[2]))) * .75) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => Math.max(d[1], d[2]))) * .75))}</text>,
            <text x={0} y={scaleY(d3.max(data.map(d => Math.max(d[1], d[2])))) + 5} fill={'white'}>{axisTickTextsFormat((d3.max(data.map(d => Math.max(d[1], d[2])))))}</text>
        ]

        return (
            <div className='supervisor-graph'>
                <div className='date-box'>
                    <label className='filter-label'>Period</label>
                    <div className="input-group col-sm-2">
                        <span className="input-group-addon">
                            <span className="icon icon-calendar"></span>
                        </span>
                        <input type="text" id='filter-startDate' className="form-control" data-provide="datepicker" ref={r => this._filterStartDateInput = r} />
                    </div>
                </div>
                <span className='inner-splice'>-</span>
                <div className='date-box trailing'>
                    <div className="input-group col-sm-2">
                        <span className="input-group-addon">
                            <span className="icon icon-calendar"></span>
                        </span>
                        <input type="text" id='filter-endDate' className="form-control" data-provide="datepicker" ref={r => this._filterEndDateInput = r} />
                    </div>
                </div>
                <button className="btn btn-primary-outline m-t-0 m-a" type="submit" onClick={this.filterDate}>
                    <span className='download-span'>{"Filter Dates"} </span>
                </button>
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
                    <path d={lineInDateRange} fill="none" stroke="rgba(151,187,205,1)" strokeWidth="2px"></path>
                    <g>{circlesInDateRange}</g>
                    <g>{axisTickTexts}</g>
                </svg>
            </div >
        );
    }
}