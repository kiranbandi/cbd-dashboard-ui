import React, { Component } from 'react';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { interpolateReds, interpolateGreys, scaleLinear } from 'd3';
// The final stage is all combined together 
const training_stage_codes = ['D', 'F', 'C', 'P', 'All'];

export default class ProgramCountPlot extends Component {

    render() {
        const { programData, width, printModeON } = this.props;
        let custom_data = _.map(programData, ({ programName, epa_completion_rate }) => ({ programName, epa_completion_rate }));

        // Filter out Overall program since this metric doesnt make sense for overall
        // then flip the whole array
        custom_data = _.reverse(_.filter(custom_data, (d) => d.programName != 'Overall'));

        // Create a color scale that maxes out at 100%
        const colorScale = scaleLinear().domain([0, 100]).range([0, 1]);

        let mapped_data = _.map(custom_data, ({ programName, epa_completion_rate }) => {

            const meanOfProgram = _.mean(_.filter(epa_completion_rate, (d) => !isNaN(d)));

            return {
                'label': programName,
                'data': _.map(training_stage_codes, (stage, stageIndex) => {
                    const completionValue = stage == 'All' ? meanOfProgram : epa_completion_rate[stageIndex];
                    return {
                        stage,
                        'label': !isNaN(completionValue) ? Math.round(+completionValue) + '%' : 'N/A',
                        'background': completionValue ? interpolateReds(colorScale(completionValue)) : 'white',
                        'color': completionValue ? interpolateGreys(1 - Math.round(colorScale(completionValue))) : 'black'
                    };
                })
            };
        });

        return (
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
                </div>
            </div>
        );
    }
}


