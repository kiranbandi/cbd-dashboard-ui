import React, { Component } from 'react';
import processSingleProgramRecords from '../../utils/processSingleProgramRecords';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';


export default class ProgramBasePanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            summaryData: []
        }
    }

    componentDidMount() {
        const { allRecords, possibleAcademicYears } = this.props;
        let summaryData = [];
        _.map(possibleAcademicYears,
            (academicYear) => summaryData.push(processSingleProgramRecords(allRecords, academicYear)['summaryData']));
        this.setState({ summaryData });
    }

    render() {
        const { width, printModeON, possibleAcademicYears } = this.props,
            { summaryData } = this.state,
            custom_data = _.map(summaryData, (d, yearIndex) => {
                return {
                    'year': possibleAcademicYears[yearIndex].label,
                    'Residents with Records': d.resident_count,
                    'Total EPAs Observed': d.epa_count,
                    'Percentage of EPAs Expired': d.expired_epa_percentage,
                    'Average Words Per Comment': d.words_per_comment
                }
            });

        return (
            <div>
                <div className='program-part-container'>
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        {'# Residents with Records'}
                    </h4>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={350}
                            data={custom_data}
                            layout="vertical"
                            barGap={0}
                            barCategoryGap={'20%'}
                            margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                            <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                                type="number" />
                            <YAxis style={{ 'fontWeight': 'bold' }}
                                width={105} tickSize={0} tickMargin={5}
                                type="category" axisLine={false} dataKey="year" />
                            <Tooltip labelStyle={{ 'color': 'black' }}
                                wrapperStyle={{ 'fontWeight': 'bold' }} />
                            <Bar dataKey="Residents with Records" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
                <div className='program-part-container'>
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        {'Total EPAs Observed'}
                    </h4>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={350}
                            data={custom_data}
                            layout="vertical"
                            barGap={0}
                            barCategoryGap={'20%'}
                            margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                            <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                                type="number" />
                            <YAxis style={{ 'fontWeight': 'bold' }}
                                width={105} tickSize={0} tickMargin={5}
                                type="category" axisLine={false} dataKey="year" />
                            <Tooltip labelStyle={{ 'color': 'black' }}
                                wrapperStyle={{ 'fontWeight': 'bold' }} />
                            <Bar dataKey="Total EPAs Observed" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
                <div className='program-part-container'>
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        {'Percentage of EPAs Expired'}
                    </h4>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={350}
                            data={custom_data}
                            layout="vertical"
                            barGap={0}
                            barCategoryGap={'20%'}
                            margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                            <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                                type="number" />
                            <YAxis style={{ 'fontWeight': 'bold' }}
                                width={105} tickSize={0} tickMargin={5}
                                type="category" axisLine={false} dataKey="year" />
                            <Tooltip labelStyle={{ 'color': 'black' }}
                                wrapperStyle={{ 'fontWeight': 'bold' }} />
                            <Bar dataKey="Percentage of EPAs Expired" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
                <div className='program-part-container'>
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        {'Average Words Per Comment'}
                    </h4>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={350}
                            data={custom_data}
                            layout="vertical"
                            barGap={0}
                            barCategoryGap={'20%'}
                            margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                            <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                                type="number" />
                            <YAxis style={{ 'fontWeight': 'bold' }}
                                width={105} tickSize={0} tickMargin={5}
                                type="category" axisLine={false} dataKey="year" />
                            <Tooltip labelStyle={{ 'color': 'black' }}
                                wrapperStyle={{ 'fontWeight': 'bold' }} />
                            <Bar dataKey="Average Words Per Comment" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
            </div>
        );
    }
}



