import React, { Component } from 'react';
import { STAGES_LIST } from '../../utils/programInfo';
import {
    BarChart, Bar, XAxis, YAxis,
    Tooltip, Legend
} from 'recharts';
import { customBackgroundBorder } from './customBackground';

import _ from 'lodash';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';

const capitalizeStr = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
const moddedPhaseList = _.map(STAGES_LIST, (d) => capitalizeStr(d.split('-').join(' ')));
const multiColorScale = ["#f28e2c", "#76b7b2", "#4e79a7", "#59a14f"];

export default class ProgramCountPlot extends Component {

    render() {

        const { programData, width, printModeON } = this.props;

        const processedDataList = _.map(programData, (d) => {
            const total = _.sum(d.current_phase_group);
            let dataPoint = { 'name': d.programName, 'isActiveProgram': d.isActiveProgram };
            _.map(moddedPhaseList, (phase_name, index) => {
                dataPoint[phase_name] = total == 0 ? 0 : (d.current_phase_group[index] / total) * 100;
            });
            return dataPoint;
        });

        return (
            <div className='program-part-container'>
                <div className="hr-divider">
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        Resident Training Stage Distribution
                        <InfoTip info={infoTooltipReference.comparePrograms.ResidentTrainingStageDistribution} />
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
                        {_.map(moddedPhaseList, (phase_name, index) => {
                            return <Bar background={(index == 0) ? customBackgroundBorder : null}
                                isAnimationActive={false} key={'stacked-phase-' + index} stackId='a' dataKey={phase_name} fill={multiColorScale[index]} />
                        })}
                    </BarChart>
                </div>
            </div>
        );
    }
}

