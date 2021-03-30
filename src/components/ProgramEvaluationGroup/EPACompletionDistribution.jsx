import React, { Component } from 'react';
import ReactSelect from 'react-select';
import moment from 'moment';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { calculateEPACompletion } from '../../utils/processMultiProgramRecords';
import EPACompletionChart from './EPACompletionChart';

export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            academicYear: { 'label': '2020-2021', 'value': '2020' },
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

        return (<div className={('program-vis-box') + (printModeON ? ' printable-content' : '')}>
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

            <div className='col-xs-12 m-t'>
                {filteredRecords.length > 0 ?
                    <EPACompletionChart
                        epaSourceMap={epaSourceMap}
                        epaPercentageList={epaPercentageList}
                        averageDivergence={averageDivergence}
                        width={width} />
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


