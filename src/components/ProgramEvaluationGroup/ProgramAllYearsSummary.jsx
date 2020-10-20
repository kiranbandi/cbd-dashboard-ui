import React, { Component } from 'react';
import processSingleProgramRecords from '../../utils/processSingleProgramRecords';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';

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
            <div className='yearall-summary-wrapper'>
                <div className="hr-divider">
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        Overall Acquisition Metrics By Year
                        <InfoTip info={infoTooltipReference.programEvaluation.overallAcuisitionMetricsYears} />
                    </h4>
                </div>
                <div className='program-part-container'>
                    <h3 className="part-year-title"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        {'# Residents with Records'}
                    </h3>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={250}
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
                            <Bar dataKey="Residents with Records" fill="#43b98e" />
                        </BarChart>
                    </div>
                </div>
                <div className='program-part-container'>
                    <h3
                        className="part-year-title"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        {'Total EPAs Observed'}
                    </h3>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={250}
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
                            <Bar dataKey="Total EPAs Observed" fill="#43b98e" />
                        </BarChart>
                    </div>
                </div>
                <div className='program-part-container'>
                    <h3
                        className="part-year-title"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        {'Percentage of EPAs Expired'}
                    </h3>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={250}
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
                            <Bar dataKey="Percentage of EPAs Expired" fill="#43b98e" />
                        </BarChart>
                    </div>
                </div>
                <div className='program-part-container'>
                    <h3
                        className="part-year-title"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        {'Average Words Per Comment'}
                    </h3>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={250}
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
                            <Bar dataKey="Average Words Per Comment" fill="#43b98e" />
                        </BarChart>
                    </div>
                </div>
            </div>
        );
    }
}



