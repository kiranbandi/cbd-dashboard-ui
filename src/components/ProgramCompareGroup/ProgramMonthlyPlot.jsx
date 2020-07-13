import React, { Component } from 'react';
import { Line } from 'react-chartjs';

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

        return (
            <div className='text-center compare-monthly-container printable-content'
                style={{ paddingTop: printModeON ? '200px' : '' }}
            >
                <div className="hr-divider">
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        Monthly Distribution by Program
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



