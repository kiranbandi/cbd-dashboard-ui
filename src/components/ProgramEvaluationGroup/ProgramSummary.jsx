import React from 'react';
import { MicroStatCard } from '..';
import FacultyScorePie from '../FacultyDashbordGroup/FacultyScorePie';

export default (props) => {

    const { data = {
        resident_count: 0, epa_count: 0, expired_epa_percentage: 0,
        words_per_comment: 0, entrustment_score: 0
    } } = props;

    return <div className='faculty-MicroStatCard-group  m-b container printable-content'>
        <div className="hr-divider">
            <h4 className="hr-divider-content"> Overall Acquisition Metrics </h4>
        </div>
        <div className='text-center'>
            <MicroStatCard style={{ display: 'inline' }} title='Residents With Records' type='primary' metric={data.resident_count} />
            <MicroStatCard style={{ display: 'inline' }} title='Total EPAs observed' type='info' metric={data.epa_count} />
            <MicroStatCard style={{ display: 'inline' }} title='Percentage of EPAs Expired' type='success' metric={data.expired_epa_percentage + '%'} />
            <MicroStatCard style={{ display: 'inline' }} title='Average EPA Score' type='primary' metric={data.entrustment_score} />
            <MicroStatCard style={{ display: 'inline' }} title='Average words per comment' type='danger' metric={data.words_per_comment} />
            <FacultyScorePie dateFilterActive={false} data={data.rating_group} />
        </div>
    </div>

}
