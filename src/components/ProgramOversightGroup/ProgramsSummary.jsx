import React, { Component } from 'react';
import processOversightRecords from '../../utils/processOversightRecords';
import { Line, LineChart, ReferenceLine, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import infoTooltipReference from '../../utils/infoTooltipReference';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

const SCORE_LIST = [{ "scoreID": "1", "label": "1 - I had to do" },
{ "scoreID": "2", "label": "2 - I had to talk them through" },
{ "scoreID": "3", "label": "3 - I needed to prompt" },
{ "scoreID": "4", "label": "4 - I needed to be there just in case" },
{ "scoreID": "5", "label": "5 - I didn't need to be there" }
];;
const fivePointColorScale = ["#e15759", "#f28e2c", "#76b7b2", "#4e79a7", "#59a14f"];
const moddedRatingList = _.map(fivePointColorScale, (d, i) => SCORE_LIST[i].label);
const monthList = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];


export default class ProgramsSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            summaryData: []
        }
    }

    componentDidMount() {
        const { programList, academicYear } = this.props;
        let summaryData = [];
        _.map(programList,
            (program) => summaryData.push(processOversightRecords(window.global_summary[program.value], academicYear)['summaryData']));
        this.setState({ summaryData });
    }

    render() {
        const { width, programList } = this.props,
            { summaryData } = this.state,
            custom_data = _.map(summaryData, (d, programIndex) => {
                return {
                    'program': programList[programIndex].label,
                    'resident_count': d.resident_count,
                    'rating_group': d.rating_group,
                    'EPAs Acquired': d.epa_count,
                    'EPAs Expired': d.expired_count,
                    'EPAs Acquired/Resident': d.epa_count / (d.resident_count != 0 ? d.resident_count : 1),
                    'EPAs Expired/Resident': d.expired_count / (d.resident_count != 0 ? d.resident_count : 1),
                    'Mean Words Per Comment': d.words_per_comment,
                    'month_count': d.month_count,
                    'expired_month_count': d.expired_month_count,
                }
            });

        const averegeEPAperResident = _.meanBy(custom_data, d => d['EPAs Acquired/Resident']),
            averegeWordsPerComment = _.meanBy(custom_data, d => d['Mean Words Per Comment']);

        const ratingDataList = _.map(custom_data, (d) => {
            const total = _.sum(d.rating_group);
            let dataPoint = { 'program': d.program };
            _.map(moddedRatingList, (rating, index) => {
                dataPoint[rating] = total == 0 ? 0 : (d.rating_group[index] / total) * 100;
            });
            return dataPoint;
        });

        return (
            <div
                className={'yearall-summary-wrapper m-b'}>
                <div className="hr-divider">
                    <h4 className="hr-divider-content">
                        Overall Acquisition Metrics
                        <i data-for={'overallAcuisitionMetricsYears'} data-tip={infoTooltipReference.programEvaluation.overallAcuisitionMetricsYears} className="fa fa-info-circle instant-tooltip-trigger"></i>
                    </h4>
                    <ReactTooltip id={'overallAcuisitionMetricsYears'} className='custom-react-tooltip' />
                </div>
                <div className='program-part-container p-b'>
                    <h3 className="part-year-title">
                        EPAs Acquired
                        <i data-for={'EPAsAcquiredAndExpired'} data-tip={infoTooltipReference.programOversight.EPAsAcquiredAndExpired} className="fa fa-info-circle instant-tooltip-trigger"></i>
                        <ReactTooltip id={'EPAsAcquiredAndExpired'} className='custom-react-tooltip' />
                    </h3>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={675}
                            data={custom_data}
                            layout="vertical"
                            barGap={0}
                            barCategoryGap={'8%'}
                            margin={{ left: 25, right: 30, top: 10, bottom: 30 }}>
                            <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                                type="number" />
                            <YAxis width={125} tickSize={0} tickMargin={5} type="category" axisLine={false} dataKey="program" />
                            <Tooltip labelStyle={{ 'color': 'black' }}
                                wrapperStyle={{ 'fontWeight': 'bold' }}
                                formatter={(value, name, props) => {
                                    return [Math.round(value), name];
                                }} />
                            <Legend wrapperStyle={{ bottom: 0 }} height={32} />
                            <Bar dataKey="EPAs Acquired" fill="#82ca9d" />
                            <Bar dataKey="EPAs Expired" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>

                <div className='program-part-container p-b'>
                    <h3 className="part-year-title">
                        EPAs Acquired Per Resident
                        <i data-for={'EPAsAcquiredAndExpired'} data-tip={infoTooltipReference.programOversight.EPAsAcquiredAndExpiredPerResident} className="fa fa-info-circle instant-tooltip-trigger"></i>
                        <ReactTooltip id={'EPAsAcquiredAndExpired'} className='custom-react-tooltip' />
                    </h3>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={675}
                            data={custom_data}
                            layout="vertical"
                            barGap={0}
                            barCategoryGap={'8%'}
                            margin={{ left: 25, right: 30, top: 10, bottom: 30 }}>
                            <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                                type="number" />
                            <YAxis width={125} tickSize={0} tickMargin={5} type="category" axisLine={false} dataKey="program" />
                            <Tooltip labelStyle={{ 'color': 'black' }}
                                wrapperStyle={{ 'fontWeight': 'bold' }}
                                formatter={(value, name, props) => {
                                    return [Math.round(value) + ' per Resident' + " (" + (props.payload.resident_count) + ' Residents)', name];
                                }} />
                            <Legend wrapperStyle={{ bottom: 0 }} height={32} />
                            <Bar dataKey="EPAs Acquired/Resident" fill="#82ca9d" />
                            <Bar dataKey="EPAs Expired/Resident" fill="#8884d8" />
                            <ReferenceLine x={averegeEPAperResident} stroke="#82ca9d" strokeWidth='2' strokeDasharray="3 3" />
                        </BarChart>
                    </div>
                </div>
                <div className='program-part-container p-b'>
                    <h3 className="part-year-title">
                        EPA Rating Distribution
                        <i data-for={'EPARatingDistribution'} data-tip={infoTooltipReference.programEvaluation.EPARatingDistribution} className="fa fa-info-circle instant-tooltip-trigger"></i>
                        <ReactTooltip id={'EPARatingDistribution'} className='custom-react-tooltip' />
                    </h3>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={675}
                            data={ratingDataList}
                            layout="vertical"
                            barGap={0}
                            barCategoryGap={'8%'}
                            margin={{ left: 25, right: 30, top: 10, bottom: 30 }}>
                            <XAxis tickFormatter={(value) => Math.round(value)} style={{ fill: 'black', 'fontWeight': 'bolder' }} type="number" domain={[0, 100]} />
                            <YAxis style={{ 'fontWeight': 'light' }} width={125} tickSize={0} tickMargin={5} type="category" axisLine={false} dataKey="program" />
                            <Tooltip labelStyle={{ 'color': 'black' }} wrapperStyle={{ 'fontWeight': 'bold' }}
                                formatter={(value, name) => ([(Math.round(value * 10) / 10) + '%', name])} />
                            <Legend wrapperStyle={{ bottom: 0 }} height={32} />
                            {_.map(moddedRatingList, (rating, index) => {
                                return <Bar key={'stacked-rating-' + index} stackId='a' dataKey={rating} fill={fivePointColorScale[index]} />
                            })}
                        </BarChart>
                    </div>
                </div>
                <div
                    className='program-part-container p-b'>
                    <h3 className="part-year-title">
                        Mean Words Per Comment
                        <i data-for={'EPAFeedbackWordCount'} data-tip={infoTooltipReference.programOversight.EPAFeedbackWordCount} className="fa fa-info-circle instant-tooltip-trigger"></i>
                        <ReactTooltip id={'EPAFeedbackWordCount'} className='custom-react-tooltip' />
                    </h3>
                    <div className='chart-container'>
                        <BarChart width={width / 2} height={675}
                            data={custom_data}
                            layout="vertical"
                            barGap={0}
                            barCategoryGap={'8%'}
                            margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                            <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                                type="number" />
                            <YAxis width={125} tickSize={0} tickMargin={5}
                                type="category" axisLine={false} dataKey="program" />
                            <Tooltip labelStyle={{ 'color': 'black' }}
                                wrapperStyle={{ 'fontWeight': 'bold' }} />
                            <Bar dataKey="Mean Words Per Comment" fill="#43b98e" />
                            <ReferenceLine x={averegeWordsPerComment} stroke="#82ca9d" strokeWidth='2' strokeDasharray="3 3" />
                        </BarChart>
                    </div>
                </div>


                <div className="hr-divider p-t-lg">
                    <h4 className="hr-divider-content">
                        Monthly Metrics
                        <i data-for={'overallAcuisitionMetricsYears'} data-tip={infoTooltipReference.programOversight.monthlyMetrics} className="fa fa-info-circle instant-tooltip-trigger"></i>
                    </h4>
                </div>
                {_.map(custom_data, (p, pID) => {

                    const monthCountList = _.map(monthList, (month) => {
                        let dataPoint = { month };
                        dataPoint['EPAs Acquired'] = p.month_count[month] || 0
                        dataPoint['EPAs Expired'] = p.expired_month_count[month] || 0
                        return dataPoint;
                    });

                    return <div key={'monthly-chart-wrapper-' + pID} className='program-part-container p-b' >
                        <div className='chart-container'>
                            <h4 className='p-a text-center'>{p.program}</h4>
                            <LineChart width={(width / 3) * 0.95}
                                height={300} data={monthCountList}
                                margin={{ left: 25, right: 30, top: 15, bottom: 30 }}>
                                <XAxis style={{ 'fontWeight': 'bolder' }}
                                    width={10} tickSize={0} tickMargin={10}
                                    type="category" dataKey="month" />
                                <YAxis width={15} />
                                <Tooltip labelStyle={{ 'color': 'black' }} wrapperStyle={{ 'fontWeight': 'bold' }} />
                                <Legend wrapperStyle={{ bottom: 0 }} height={32} />
                                <Line
                                    type="monotone"
                                    key={'monthly-program-' + pID}
                                    dataKey={'EPAs Acquired'}
                                    stroke={fivePointColorScale[0]}
                                    strokeWidth={3} />
                                <Line
                                    type="monotone"
                                    key={'monthly-program-expired-' + pID}
                                    dataKey={'EPAs Expired'}
                                    stroke={fivePointColorScale[1]}
                                    strokeWidth={3} />
                            </LineChart>
                        </div>
                    </div>;
                })}

            </div >
        );
    }
}



