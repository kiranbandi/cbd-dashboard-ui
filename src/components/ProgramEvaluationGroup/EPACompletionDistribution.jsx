import React, { Component } from 'react';
import ReactSelect from 'react-select';
import moment from 'moment';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { calculateEPACompletion } from '../../utils/processMultiProgramRecords';
import EPACompletionChart from './EPACompletionChart';
import { scaleLinear, interpolateRdYlGn } from 'd3';
// The final stage is all combined together 
const training_stage_codes = ['D', 'F', 'C', 'P', 'All'];

export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            academicYear: { 'label': '2020-2021', 'value': '2020' }
        };
    }

    render() {

        const { programInfo: { epaSourceMap },
            records, width, possibleAcademicYears,
            yearToggleEnabled = true, printModeON } = this.props,
            { academicYear } = this.state;


        const filteredRecords = yearToggleEnabled ? records
            // get the records in the selected year
            .filter(d => matchAcademicYear(d.observation_date, academicYear.value)) : records;

        const { epaPercentageList = [], averageDivergence = [] } = calculateEPACompletion(epaSourceMap, filteredRecords);


        let meanOfAllStages = _.mean(_.filter(averageDivergence, (d) => d != -1));
        meanOfAllStages = isNaN(meanOfAllStages) ? -1 : meanOfAllStages;
        // Create a color scale that maxes out at 100%
        const averageColorScale = scaleLinear().domain([0, 100]).range([0, 1]);

        return (<div className={('program-base-panel m-t m-b text-center') + (printModeON ? ' printable-content' : '')}>
            {yearToggleEnabled && <div>
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
            </div>}

            <div className='m-t-lg'>
                {filteredRecords.length > 0 ?
                    <div>
                        <EPACompletionChart
                            height={350}
                            width={width}
                            epaSourceMap={epaSourceMap}
                            epaPercentageList={epaPercentageList} />
                    </div>
                    : <h3 style={{ width }} className='error-code text-left m-b'>No Records</h3>
                }
            </div>

        </div>);
    };
}

function matchAcademicYear(recordDate, academicYear) {
    var timeObj = moment(recordDate, 'YYYY-MM-DD');
    return (timeObj.isBetween(moment('07/01/' + Number(academicYear), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]'))
}


