import React, { Component } from 'react';
import _ from 'lodash';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { customBackgroundBorder } from './customBackground';

const sixPointColorScale = ["#bab0ab", "#e15759", "#f28e2c", "#76b7b2", "#4e79a7", "#59a14f"];
var POSSIBLE_FEEDBACK = ["No Feedback Available", "Inactive", "Not Progressing", "Not as Expected", "As Expected", "Accelerated"];


export default class ProgramScoreDist extends Component {

    render() {
        const { programData, width } = this.props;

        const processedDataList = _.map(programData, (d) => {
            const total = _.sum(d.feedback_group);
            let dataPoint = { 'name': d.programName, 'isActiveProgram': d.isActiveProgram };
            _.map(POSSIBLE_FEEDBACK, (rating, index) => {
                dataPoint[rating] = total == 0 ? 0 : (d.feedback_group[index] / total) * 100;
            });
            return dataPoint;
        });



        return (
            <div className='program-part-container'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content">
                        Resident Progress
                        <InfoTip info={infoTooltipReference.comparePrograms.ProgramFeedbackDistribution} />
                    </h4>
                </div>
                <div className='chart-container'>
                    <BarChart width={width} height={600}
                        data={_.reverse(processedDataList)}
                        layout="vertical"
                        barGap={0}
                        barCategoryGap={'20%'}
                        margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                        <XAxis tickFormatter={(value) => Math.round(value)} style={{ fill: 'black', 'fontWeight': 'bolder' }} type="number" domain={[0, 100]} />
                        <YAxis style={{ 'fontWeight': 'bold' }} width={105} tickSize={0} tickMargin={5} type="category" axisLine={false} dataKey="name" />
                        <Tooltip labelStyle={{ 'color': 'black' }} wrapperStyle={{ 'fontWeight': 'bold' }}
                            formatter={(value, name) => ([(Math.round(value * 10) / 10) + '%', name])} />
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        {_.map(POSSIBLE_FEEDBACK, (rating, index) => {
                            return <Bar background={customBackgroundBorder}
                                isAnimationActive={false} key={'stacked-rating-' + index} stackId='a' dataKey={rating} fill={sixPointColorScale[index]} />
                        })}
                    </BarChart>
                </div>
            </div >
        );
    }
}


