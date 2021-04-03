import React from 'react';
import { MicroStatCard } from '..';
import FacultyScorePie from '../FacultyDashbordGroup/FacultyScorePie';
import PhaseSummaryPie from '../ProgramEvaluationGroup/PhaseSummaryPie';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';

export default (props) => {

    const { programData = {}, printModeON } = props,

        { epa_count = 'No Data', programName,
            expired_epa_percentage = '0', entrustment_score = 'N/A',
            words_per_comment = 'N/A', rating_group = [], current_phase_group = []
        } = programData;


    return <div className='program-MicroStatCard-group  m-b container-fluid  printable-content'>
        <div className="hr-divider">
            <h4 className="hr-divider-content"
                style={printModeON ? { background: 'white', color: 'black' } : {}}>
                Overall Acquisition Metrics for {programName}
                <InfoTip info={infoTooltipReference.comparePrograms.OverallAcquisitionMetricsForOneProgram} />
            </h4>
        </div>
        <div className='text-center'>
            <MicroStatCard style={{ display: 'inline' }} title='Total EPAs observed' type='success' metric={epa_count} />
            <MicroStatCard style={{ display: 'inline' }} title='Percentage of EPAs Expired' type='info' metric={expired_epa_percentage + '%'} />
            <MicroStatCard style={{ display: 'inline' }} title='Average EPA Score' type='primary' metric={entrustment_score} />
            <MicroStatCard style={{ display: 'inline' }} title='Average words per comment' type='danger' metric={words_per_comment} />
            <FacultyScorePie dateFilterActive={false} data={rating_group} />
            <PhaseSummaryPie data={current_phase_group} />
        </div>
    </div>

}
