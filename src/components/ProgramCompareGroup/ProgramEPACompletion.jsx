import React, { Component } from 'react';
import { InfoTip } from '..';
import infoTooltipReference from '../../utils/infoTooltipReference';
import SpecificEPACompletionDistribution from '../ProgramEvaluationGroup/EPACompletionChart';
import { interpolateRdYlGn, scaleLinear } from 'd3';
// The final stage is all combined together 
const training_stage_codes = ['D', 'F', 'C', 'P', 'All'];

export default class ProgramCountPlot extends Component {

    render() {
        const { programData, width, printModeON } = this.props;
        let custom_data = _.map(programData, ({ programName, epa_completion_rate, epa_percentage_list }) => ({ programName, epa_completion_rate, epa_percentage_list }));

        // Filter out Overall program since this metric doesnt make sense for overall
        // then flip the whole array
        custom_data = _.reverse(_.filter(custom_data, (d) => d.programName != 'Overall'));

        // Create a color scale that maxes out at 100%
        const colorScale = scaleLinear().domain([0, 100]).range([0, 1]);

        let mapped_data = _.map(custom_data, ({ programName, epa_completion_rate }) => {

            const meanOfProgram = _.mean(_.filter(epa_completion_rate, (d) => d != -1));

            return {
                'label': programName,
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

        console.log(custom_data);

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
                        style={{ width, 'height': '600' + 'px' }}>
                        {_.map(mapped_data, (program, programIndex) => {
                            return <div key={'proram-rate-key-' + programIndex}
                                className='program-rate-wrapper'>
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
                </div>
                <div className='program-part-container'>
                    <div className="hr-divider">
                        <h4
                            className="hr-divider-content"
                            style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                            EPA Completion Divergence
                        <InfoTip info={infoTooltipReference.comparePrograms.programEPAcompletionDivergence} />
                        </h4>
                    </div>
                    {/* <SpecificEPACompletionDistribution
                        epaSourceMap={epaSourceMap}
                        epaPercentageList={epaPercentageList}
                        averageDivergence={averageDivergence}
                        width={width} /> */}
                </div>
            </div>
        );
    }
}


