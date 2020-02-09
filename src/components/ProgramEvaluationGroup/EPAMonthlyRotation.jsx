import React, { Component } from 'react';
import { Line } from 'react-chartjs';
import moment from 'moment';
import ReactSelect from 'react-select';

const monthList = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export default class EPAMonthlyRotation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAcademicYears: [props.defaultAcademicYear]
        };
        this.onSelectChange = this.onSelectChange.bind(this);
    }


    onSelectChange(selectedAcademicYears) {
        this.setState({ selectedAcademicYears });
    }

    render() {
        const { filteredRecords, width, possibleAcademicYears } = this.props;

        const lineData = {
            labels: monthList,
            datasets: []
        }

        const colors = [
            '#43b98e',
            '#8db600',
            '#fbceb1',
            '#00ffff',
            '#7fffd4',
            '#4b5320',
            '#e9d66b',
            '#ff9966',
            '#a52a2a',
            '#fdee00'
        ];

        for (const academicYear of this.state.selectedAcademicYears) {
            // Create empty map for all months
            let monthCount = {};
            // Count records for each month
            const records = academicYear ?
                filteredRecords.filter(d => moment(d.observation_date, 'YYYY-MM-DD').isBetween(moment('07/01/' + Number(academicYear.value), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear.value) + 1), 'MM/DD/YYYY'), 'days', '[]')) :
                filteredRecords;
            _.map(records, (d) => {
                let monthKey = moment(d.observation_date, 'YYYY-MM-DD').format('MMM');
                if (monthCount.hasOwnProperty(monthKey)) {
                    monthCount[monthKey] += 1;
                }
                else {
                    monthCount[monthKey] = 1;
                }
            });

            lineData.datasets.push({
                label: "Rotations",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: colors[lineData.datasets.length],
                pointColor: colors[lineData.datasets.length],
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(monthList, (d) => monthCount[d] || 0)
            });
        }

        let lineOptions = {
            scaleBeginAtZero: true
        };

        return (
            <div className='col-sm-6 col-xs-12 reel-in-left epa-specific'>
                <div className='m-a program-vis-box row'>
                    <h3 className='text-left m-b'>EPA Monthly Distribution</h3>
                    <div className="epa-select m-a text-left">
                        <span className='inner-span'>Select EPA</span>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={this.state.selectedAcademicYears}
                                options={possibleAcademicYears}
                                isMulti={true}
                                styles={{
                                    option: (styles) => ({
                                        ...styles,
                                        color: 'black',
                                        textAlign: 'left'
                                    })
                                }}
                                onChange={this.onSelectChange} />
                        </div>
                    </div>

                    <div className='col-xs-12'>
                        <Line
                            options={lineOptions}
                            data={lineData}
                            width={width} height={350}
                            redraw={true} />
                    </div>
                </div>
            </div>)
    }
}

