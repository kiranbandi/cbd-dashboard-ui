import React, { Component } from 'react';
import { Line } from 'react-chartjs';

const monthList = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];


export default class ProgramMonthyPlot extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { programData } = this.props,
            remappedData = _.map(programData, (d) => {
                return {
                    'title': d.programName,
                    'lineData': {
                        labels: monthList,
                        datasets: [{
                            label: d.programName,
                            fillColor: "rgba(28,168,221,.03)",
                            strokeColor: '#43b98e',
                            pointColor: '#43b98e',
                            pointStrokeColor: 'rgba(28,168,221,.03)',
                            pointHighlightFill: "rgba(28,168,221,.03)",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: _.map(monthList, (month) => {
                                return d.monthly_count[month] ? d.monthly_count[month].length : 0;
                            })
                        }]
                    }
                };
            });

        return (
            <div className='text-center compare-monthly-container'>
                <h3 className='text-center'>{'Monthly Distribution by Program'}</h3>
                <div className='overall-wrapper'>
                    {_.map(remappedData, (d, i) => {
                        return <div key={'compare-monthly-' + i} className='compare-monthly-box'>
                            <Line
                                options={{ 'scaleBeginAtZero': true }}
                                data={d.lineData}
                                width={350} height={350}
                                redraw={true} />
                            <h3 className='text-center text-primary'>{d.title}</h3>
                        </div>
                    })}
                </div>
            </div>

        )
    }
};



