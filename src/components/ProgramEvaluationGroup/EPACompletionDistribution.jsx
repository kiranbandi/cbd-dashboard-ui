import React, { Component } from 'react';
import ReactSelect from 'react-select';
import moment from 'moment';
import { scaleLinear, interpolateRdYlGn } from 'd3';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { NumberToEPAText } from "../../utils/convertEPA";
// The final stage is all combined together 
const training_stage_codes = ['D', 'F', 'C', 'P', 'All'];

export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            academicYear: { 'label': '2020-2021', 'value': '2020' },
        };
    }

    render() {

        const { programInfo: { epaSourceMap },
            records, width, possibleAcademicYears, printModeON } = this.props,
            { academicYear } = this.state;

        const epaObservationMap = {};

        // process base source map
        const nonSAEPAs = Object.values(epaSourceMap)
            .map(d => Object.entries(d.maxObservation).map(dd => ({ epa: dd[0], maxObservation: dd[1] })))
            .flat()
            .filter(d => epaSourceMap[d.epa.split('.')[0]].subRoot[d.epa].substring(0, 4) !== '(SA)');

        nonSAEPAs
            .forEach(d => epaObservationMap[d.epa] = { max: d.maxObservation, total: 0 });

        // process records 
        // for some programs such as anesthesia there are records with EPA numbers 
        // which dont exist in the original source map
        // these are selectively checked and filtered out by using the original source map in program info
        const filteredRecords = records
            .filter(d => {
                // get the records in the selected year
                return matchAcademicYear(d.observation_date, academicYear.value) &&
                    (_.findIndex(nonSAEPAs, (inner_d) => inner_d.epa == d.epa) > -1)
            });

        filteredRecords
            .forEach(d => epaObservationMap[d.epa].total++);

        const epaGroupObservationMap = Object.entries(epaObservationMap)
            .reduce((map, currentEntry) => {
                const epaGroup = currentEntry[0].split('.')[0];
                if (!map[epaGroup]) {
                    map[epaGroup] = { max: 0, total: 0 };
                }
                map[epaGroup].max += currentEntry[1].max;
                map[epaGroup].total += currentEntry[1].total;
                return map;
            }, {});

        let epaPercentageList = Object.entries(epaObservationMap).map(d => {
            const result = {
                epa: d[0],
                percentageMax: roundTo2Decimal(d[1].max / epaGroupObservationMap[d[0].split('.')[0]].max),
                percentageTotal: roundTo2Decimal(d[1].total / epaGroupObservationMap[d[0].split('.')[0]].total),
            };
            // sometimes some EPAs might not even have started and so their percentage remains at 0
            // for them to avoid NaN problem due to zero in denominator, use or case with 1.
            result.percentageOffset = roundTo2Decimal((result.percentageTotal || 0) / (result.percentageMax || 1));

            return result;
        });


        // group by the training state 
        let groupedByTrainingStage = _.groupBy(epaPercentageList, (d) => d.epa[0]);

        let completionByStageList = _.map([1, 2, 3, 4], (stageID) => {
            let allDivergencesInStage = _.map(groupedByTrainingStage[stageID], (e) => {
                // if the percentage offset is 1, divergence is zero
                if (e.percentageOffset == 1) {
                    return 0;
                }
                else if (e.percentageOffset > 1) {
                    return (e.percentageOffset - 1) * 100
                }
                // if offset is less than 1 , get by how much it diverges from 1
                return (1 - e.percentageOffset) * 100
            });

            let allTotalsInStage = _.map(groupedByTrainingStage[stageID], (e) => e.percentageTotal);

            // Check for insufficient data in stage
            // if all the EPAs are NaN itmeans all the totals were zero
            let insufficientDataEh = _.countBy(allTotalsInStage, (d) => !isNaN(d)).false == allTotalsInStage.length;

            // Take an average of all the divergences in a training stage
            return insufficientDataEh || allDivergencesInStage.length == 0 ? -1 : _.mean(allDivergencesInStage);
        });

        let meanOfAllStages = _.mean(_.filter(completionByStageList, (d) => d != -1));

        // Create a color scale that maxes out at 100%
        const averageColorScale = scaleLinear().domain([0, 100]).range([0, 1]);


        const height = 350, margin = 10, Xoffset = 50, Yoffset = 30;

        // The size of the bar is 0.75% of the item size and rest is left as a gap
        const itemSize = epaPercentageList.length > 0 ? ((width - margin) / epaPercentageList.length) : 2;
        // The last bar would go beyond the available width by 75%
        //  so that width is removed from the scale 

        let minPercentageOffset = _.min(epaPercentageList.map(d => +d.percentageOffset));
        minPercentageOffset = Math.floor(minPercentageOffset * 10 / 5) / 10 * 5;
        let maxPercentageOffset = _.max(epaPercentageList.map(d => +d.percentageOffset));
        maxPercentageOffset = Math.ceil(maxPercentageOffset * 10 / 5) / 10 * 5;
        if (maxPercentageOffset > 10) {
            maxPercentageOffset = 10;
        }

        // create the X and Y scales and modify them based on the track type
        const scaleX = scaleLinear().range([Xoffset, width - margin - 0.75 * itemSize]).domain([0, epaPercentageList.length - 1]);
        let scaleY = scaleLinear().range([height - margin - Yoffset, margin]).domain([minPercentageOffset, maxPercentageOffset]).clamp(true);

        const xOne = scaleY(1);
        // create bars
        const bars = epaPercentageList.map((d, i) => (
            <rect
                className="epa-completion-distribution-chart-bar"
                x={scaleX(i)}
                y={scaleY(d.percentageOffset) <= xOne ? scaleY(d.percentageOffset) : xOne}
                height={scaleY(d.percentageOffset) <= xOne ? xOne - scaleY(d.percentageOffset) : scaleY(d.percentageOffset) - xOne}
                fill={(() => {
                    switch (+d.epa.split('.')[0]) {
                        case 1:
                            return '#7FFFD4';
                        case 2:
                            return '#FFE4C4';
                        case 3:
                            return '#008B8B';
                        case 4:
                            return '#8FBC8F';
                        default:
                            return '#DC143C';
                    }
                })()}
                width={itemSize - (0.25 * itemSize)}
                stroke={d.percentageOffset > maxPercentageOffset ? 'white' : 'transparent'}
                key={d.epa}
                data-s-tooltip-text={
                    (d.percentageOffset * 100).toFixed() + '%' +
                    ' - ' + NumberToEPAText(d.epa) +
                    ' - ' + epaSourceMap[d.epa.split('.')[0]].topic +
                    ' - ' + epaSourceMap[d.epa.split('.')[0]].subRoot[d.epa]
                }
            ></rect>
        ));

        // create the vertical tick lines 
        const axisTickLines = _.range(minPercentageOffset, maxPercentageOffset + .5, .5).map(d => <line
            x1={Xoffset}
            y1={scaleY(d)}
            x2={width - margin}
            y2={scaleY(d)}
            stroke={d === 1 ? (printModeON ? 'black' : 'white') : '#a9a1a1'}
            opacity={d === 1 ? 1 : .5}
            key={d}
        ></line>);

        const axisTexts = _.range(minPercentageOffset, maxPercentageOffset + .5, .5).map(d => <text
            x={5}
            y={scaleY(d) + 5}
            fontWeight='bold'
            fill={d === 1 ? (printModeON ? 'black' : 'white') : '#a9a1a1'}
            key={d}
        >{(d * 100).toFixed() + '%'}</text>);

        const epaTexts = epaPercentageList.map((d, i) => <text
            x={scaleX(i) + (itemSize - (0.25 * itemSize)) / 2}
            y={height - margin - Yoffset / 2}
            fill='#a9a1a1'
            key={d.epa}
            style={{ textAnchor: 'middle' }}>{NumberToEPAText(d.epa)}</text>);

        return (<div className={('program-vis-box') + (printModeON ? ' printable-content' : '')}>
            <div>
                <h3 className='text-left m-a-0 pull-left'>
                    EPA Completion Distribution
                            <InfoTip info={infoTooltipReference.programEvaluation.EPACompletionDistribution} />
                </h3>
                <div className='year-selection-box pull-right'>
                    <h2 className='header'>Academic Year: </h2>
                    <div className='react-select-root'>
                        <ReactSelect
                            value={academicYear}
                            options={possibleAcademicYears}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                            onChange={(academicYear) => this.setState({ academicYear })} />
                    </div>
                </div>
            </div>

            <div className='col-xs-12 m-t'>
                {filteredRecords.length > 0 ?
                    <div>
                        <div className='stage-average-wrapper'>
                            <span>Training Stage Average : </span>
                            {_.map(training_stage_codes, (stage, stageIndex) => {

                                let stageValue = Math.round(stage == 'All' ? meanOfAllStages : completionByStageList[stageIndex]),
                                    background = interpolateRdYlGn(1 - averageColorScale(stageValue)),
                                    color = averageColorScale(stageValue) >= 0.25 && averageColorScale(stageValue) <= 0.75 ? 'black' : 'white';

                                if (stageValue != -1) {
                                    return <span
                                        style={{ background, color }}
                                        key={'stage-average-' + stage}
                                        className='stage-average'>
                                        {stage} - {stageValue}%
                                        </span>
                                }
                                return;
                            })}
                        </div>
                        <svg width={width} height={350}>
                            <g>{axisTickLines}</g>
                            <g>{axisTexts}</g>
                            <g>{epaTexts}</g>
                            <g>{bars}</g>
                        </svg>
                    </div>
                    : <h3 style={{ width }} className='error-code text-left m-b'>No Records</h3>
                }
                <div className='chart-tooltip' id="chartjs-tooltip-completion-distribution"></div>
            </div>

            <s-tooltip follow-mouse orientation="top" border-width="1px" show-delay="0" style={{ fontFamily: 'inherit' }} attach-to=".epa-completion-distribution-chart-bar"></s-tooltip>
        </div>);
    };
}

function matchAcademicYear(recordDate, academicYear) {
    var timeObj = moment(recordDate, 'YYYY-MM-DD');
    return (timeObj.isBetween(moment('07/01/' + Number(academicYear), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]'))
}


let roundTo2Decimal = (d) => (Math.round(d * 100) / 100);