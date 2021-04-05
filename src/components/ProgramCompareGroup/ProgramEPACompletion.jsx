import React, { Component } from 'react';
import { InfoTip } from '..';
import infoTooltipReference from '../../utils/infoTooltipReference';
import SpecificEPACompletionDistribution from '../ProgramEvaluationGroup/EPACompletionChart';
import { interpolateRdYlGn, scaleLinear } from 'd3';
import _ from 'lodash';
// The final stage is all combined together 
const training_stage_codes = ['D', 'F', 'C', 'P', 'All'];

export default class ProgramEPACompletion extends Component {


    onProgramWrapperClick = (event) => {
        const value = event.currentTarget.id.split('-')[1];
        this.props.onSelectProgram({ value });
    }

    render() {
        const { programData, width, printModeON, activeProgram } = this.props;

        let custom_data = _.map(programData,
            ({ programName, program, source_map, epa_completion_rate, epa_percentage_list }) => ({
                programName,
                source_map,
                program,
                epa_completion_rate,
                epa_percentage_list
            }));


        // Filter out Overall program since this metric doesnt make sense for overall
        // then flip the whole array
        custom_data = _.reverse(_.filter(custom_data, (d) => d.programName != 'Overall'));

        // Create a color scale that maxes out at 100%
        const colorScale = scaleLinear().domain([0, 100]).range([0, 1]);

        let mapped_data = _.map(custom_data, ({ programName, program, epa_completion_rate }) => {

            let meanOfProgram = _.mean(_.filter(epa_completion_rate, (d) => d != -1));
            // If all the values are N/A then the mean will be NaN so skip that
            if (isNaN(meanOfProgram)) { meanOfProgram = -1 };

            return {
                'label': programName,
                'programID': program,
                'data': _.map(training_stage_codes, (stage, stageIndex) => {
                    const completionValue = stage == 'All' ? meanOfProgram : epa_completion_rate[stageIndex];
                    return {
                        stage,
                        'label': completionValue != -1 ? Math.round(+completionValue) + '%' : 'NA*',
                        'background': completionValue != -1 ? interpolateRdYlGn(1 - colorScale(completionValue)) : 'white',
                        'color': completionValue != -1 ? (colorScale(completionValue) >= 0.25 && colorScale(completionValue) <= 0.75 ? 'black' : 'white') : 'black'
                    };
                })
            };
        });

        const activeProgramData = _.find(custom_data, (d) => d.program == activeProgram);

        return (
            <div>
                <div className='program-part-container'>
                    <div className="hr-divider">
                        <h4
                            className="hr-divider-content"
                            style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                            EPA Completion Divergence
                        <InfoTip info={infoTooltipReference.comparePrograms.programEPAcompletionDivergence} />
                        </h4>
                    </div>
                    <div className='chart-container completion-rate-chart'
                        style={{ 'width': width / 2, 'height': '630' + 'px' }}>
                        {_.map(mapped_data, (program, programIndex) => {
                            return <div key={'proram-rate-key-' + programIndex}
                                className={'program-rate-wrapper ' + (activeProgram == program.programID ? 'selected' : '')}
                                id={'pgm-' + program.programID}
                                onClick={this.onProgramWrapperClick}>
                                <span className='program-rate-label'>{program.label}</span>
                                <span className='program-rate-inner-wrapper'>
                                    {_.map(program.data, ({ stage, label, background, color }, stageIndex) =>
                                        <span
                                            key={'stage-key-' + stageIndex}
                                            style={{ background, color }}
                                            className='stage-label'>
                                            <b>{stage} </b>{label}</span>)}
                                </span>
                            </div>
                        })}
                        <p className='text-center completion-rate-label'> <b>*NA</b> - The training stage has no EPAs to complete or has insufficient data to detect a pattern.</p>
                    </div>
                    {!!activeProgramData && <SpecificEPACompletionDistribution
                        epaSourceMap={activeProgramData.source_map}
                        epaPercentageList={activeProgramData.epa_percentage_list}
                        height={600}
                        width={width / 2} />}
                </div>
            </div>
        );
    }
}


