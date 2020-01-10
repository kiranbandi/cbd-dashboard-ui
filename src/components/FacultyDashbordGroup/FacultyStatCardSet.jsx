import React from 'react';
import { MicroStatCard } from '..';

export default (props) => {

    const { dateFilterActive = false, processedRecords = [], title, showNA = false } = props;

    const EPACount = !showNA ? _.sumBy(processedRecords, (d) => d.epa_count) : 'N/A',
        EPACountPeriod = !showNA ? _.sumBy(processedRecords, (d) => d.epa_count_period) : 'N/A',
        averageEPApercentage = !showNA ? Math.round(_.meanBy(processedRecords, (d) => d.expired_epa_percentage) || 0) : 'N/A',
        averageEPApercentagePeriod = !showNA ? Math.round(_.meanBy(processedRecords, (d) => d.expired_epa_percentage_period) || 0) : 'N/A',
        averageEPAScore = !showNA ? Math.round((_.meanBy(processedRecords, (d) => d.entrustment_score) || 0) * 100) / 100 : 'N/A',
        averageEPAScorePeriod = !showNA ? Math.round((_.meanBy(processedRecords, (d) => d.entrustment_score_period) || 0) * 100) / 100 : 'N/A',
        averageWords = !showNA ? Math.round(_.meanBy(processedRecords, (d) => d.words_per_comment) || 0) : 'N/A',
        averageWordsPeriod = !showNA ? Math.round(_.meanBy(processedRecords, (d) => d.words_per_comment_period) || 0) : 'N/A';


    const percentageSymbol = !showNA ? '%' : '';

    return <div className='faculty-MicroStatCard-group'>
        <div className="hr-divider">
            <h4 className="hr-divider-content"> {title} </h4>
        </div>
        {
            (dateFilterActive) ?
                <div>
                    <MicroStatCard dual={true} title='Total EPAs observed' type='info' metric={EPACount} secondMetric={EPACountPeriod} />
                    <MicroStatCard dual={true} title='Percentage of EPAs Expired' type='success' metric={averageEPApercentage + percentageSymbol} secondMetric={averageEPApercentagePeriod + percentageSymbol} />
                    <MicroStatCard dual={true} title='Average EPA Score' type='primary' metric={averageEPAScore} secondMetric={averageEPAScorePeriod} />
                    <MicroStatCard dual={true} title='Average words per comment' type='danger' metric={averageWords} secondMetric={averageWordsPeriod} />
                </div> :
                <div>
                    <MicroStatCard title='Total EPAs observed' type='info' metric={EPACount} />
                    <MicroStatCard title='Percentage of EPAs Expired' type='success' metric={averageEPApercentage + percentageSymbol} />
                    <MicroStatCard title='Average EPA Score' type='primary' metric={averageEPAScore} />
                    <MicroStatCard title='Average words per comment' type='danger' metric={averageWords} />
                </div>
        }
    </div>

}
