import React, { Component } from 'react';
import { Line } from 'react-chartjs';
import ReactTooltip from 'react-tooltip';
import infoTooltipReference from '../../utils/infoTooltipReference';

const monthList = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];


export default class ProgramMonthyPlot extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { programData, printModeON } = this.props,
            remappedData = _.map(programData, (d) => {
                return {
                    'title': d.programName,
                    'monthlyCount': {
                        labels: monthList,
                        datasets: [{
                            label: d.programName,
                            fillColor: "rgba(18,147,154,.03)",
                            strokeColor: 'rgba(18,147,154)',
                            pointColor: 'rgba(18,147,154)',
                            pointStrokeColor: 'rgba(18,147,154,.03)',
                            pointHighlightFill: "#e6475980",
                            pointHighlightStroke: "#e64759",
                            data: _.map(monthList, (month) => {
                                return d.monthly_count[month] ? d.monthly_count[month].length : 0;
                            })
                        },
                        {
                            label: 'Expired',
                            fillColor: "rgba(121, 199, 227,.03)",
                            strokeColor: 'rgb(121, 199, 227)',
                            pointColor: 'rgb(121, 199, 227)',
                            pointStrokeColor: 'rgba(121, 199, 227,.03)',
                            pointHighlightFill: "#e6475980",
                            pointHighlightStroke: "#e64759",
                            data: _.map(monthList, (month) => {
                                return d.monthly_count_expired[month] ? d.monthly_count_expired[month].length : 0;
                            })
                        }]
                    }
                };
            });

        const randomTooltipId = `info-tooltip-${(Math.random() * 10000).toFixed(0)}`;

        return (
            <div className='text-center compare-monthly-container printable-content'
                style={{ paddingTop: printModeON ? '200px' : '' }}
            >
                <div className="hr-divider">
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        Monthly Distribution by Program
                        <a
                            data-tip="React-tooltip"
                            data-for={randomTooltipId}
                        >
                            <img width="20" height="20" src="https://www.flaticon.com/svg/static/icons/svg/189/189664.svg"></img>
                        </a>
                        <ReactTooltip id={randomTooltipId} place="left" type="dark" effect="float">
                            <p>{infoTooltipReference.comparePrograms.MonthlyDistributionByProgram}</p>
                        </ReactTooltip>
                    </h4>
                </div>
                <div className='overall-wrapper'>
                    {_.map(remappedData, (d, i) => {
                        return <div key={'compare-monthly-' + i} className='compare-monthly-box'>
                            <Line
                                options={{ 'scaleBeginAtZero': true }}
                                data={d.monthlyCount}
                                width={350} height={300}
                                redraw={true} />
                            <h3 className='text-center text-primary'>{d.title}</h3>
                        </div>
                    })}
                </div>
            </div>

        )
    }
};



