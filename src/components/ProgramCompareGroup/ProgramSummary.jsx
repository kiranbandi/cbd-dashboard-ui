import React from 'react';
import { MicroStatCard } from '..';
import FacultyScorePie from '../FacultyDashbordGroup/FacultyScorePie';
import PhaseSummaryPie from '../ProgramEvaluationGroup/PhaseSummaryPie';
import ReactTooltip from 'react-tooltip';
import infoTooltipReference from '../../utils/infoTooltipReference';

export default (props) => {

    const { programData = [], showNA = false, printModeON } = props;

    let EPACount = !showNA ? _.sumBy(programData, (d) => d.epa_count) : 'N/A',
        averageEPApercentage = !showNA ? Math.round(_.meanBy(programData, (d) => d.expired_epa_percentage) || 0) : 'N/A';

    // for the following values if a faculty has all expired EPAs then these values might be biased 
    // as these values are simply set to zero bringing the total mean down 
    // so we selectively ignore them and them perform all caclulations as is

    let refinedProgramList = _.filter(programData, (d) => d.epa_count != 0);

    let averageEPAScore = !showNA ? Math.round((_.meanBy(refinedProgramList, (d) => d.entrustment_score) || 0) * 100) / 100 : 'N/A',
        averageWords = !showNA ? Math.round(_.meanBy(refinedProgramList, (d) => d.words_per_comment) || 0) : 'N/A',
        ratingGroupSet = !showNA ? _.reduce(refinedProgramList, (acc, d) => _.map(acc, (inner_d, i) => (inner_d + d.rating_group[i])), [0, 0, 0, 0, 0]) : [],
        phaseGroupSet = !showNA ? _.reduce(refinedProgramList, (acc, d) => _.map(acc, (inner_d, i) => (inner_d + d.current_phase_group[i])), [0, 0, 0, 0]) : [];

    const percentageSymbol = !showNA ? '%' : '';

    const randomTooltipId = `info-tooltip-${(Math.random() * 10000).toFixed(0)}`;

    return <div className='faculty-MicroStatCard-group  m-b container-fluid  printable-content'>
        <div className="hr-divider">
            <h4
                className="hr-divider-content"
                style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                Overall Acquisition Metrics for all Programs
                <a
                    data-tip="React-tooltip"
                    data-for={randomTooltipId}
                >
                    <img width="20" height="20" src="https://www.flaticon.com/svg/static/icons/svg/189/189664.svg"></img>
                </a>
                <ReactTooltip id={randomTooltipId} place="left" type="dark" effect="float">
                    <p>{infoTooltipReference.comparePrograms.OverallAcquisitionMetricsForAllPrograms}</p>
                </ReactTooltip>
            </h4>
        </div>
        <div className='text-center'>
            <MicroStatCard style={{ display: 'inline' }} title='Total Programs' type='primary' metric={programData.length} />
            <MicroStatCard style={{ display: 'inline' }} title='Total EPAs observed' type='success' metric={EPACount} />
            <MicroStatCard style={{ display: 'inline' }} title='Percentage of EPAs Expired' type='info' metric={averageEPApercentage + percentageSymbol} />
            <MicroStatCard style={{ display: 'inline' }} title='Average EPA Score' type='primary' metric={averageEPAScore} />
            <MicroStatCard style={{ display: 'inline' }} title='Average words per comment' type='danger' metric={averageWords} />
            <FacultyScorePie dateFilterActive={false} data={ratingGroupSet} />
            <PhaseSummaryPie data={phaseGroupSet} />
        </div>
    </div>

}
