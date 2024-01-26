import React from 'react';
import { MicroStatCard } from '..';
import FacultyScorePie from './FacultyScorePie';
import PhaseSummaryPie from '../ProgramEvaluationGroup/PhaseSummaryPie';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';

export default (props) => {

    const { dateFilterActive = false, isUG = false, processedRecords = [], title, showNA = false, qualScoreEnabled = false } = props;

    let EPACount = !showNA ? _.sumBy(processedRecords, (d) => d.epa_count) : 'N/A',
        EPACountPeriod = !showNA ? _.sumBy(processedRecords, (d) => d.epa_count_period) : 'N/A';

    let averageEPApercentage = !showNA ? Math.round(_.meanBy(processedRecords, (d) => d.expired_epa_percentage) || 0) : 'N/A',
        averageEPApercentagePeriod = !showNA ? Math.round(_.meanBy(processedRecords, (d) => d.expired_epa_percentage_period) || 0) : 'N/A';




    // for the following values if a faculty has all expired EPAs then these values might be biased 
    // as these values are simply set to zero bringing the total mean down 
    // so we selectively ignore them and them perform all caclulations as is

    let refinedFacultyList = _.filter(processedRecords, (d) => !d.all_expired),
        refinedFacultyListInPeriod = _.filter(processedRecords, (d) => !d.all_expired_period);

    let averageEPAScore = !showNA ? Math.round((_.meanBy(refinedFacultyList, (d) => d.entrustment_score) || 0) * 100) / 100 : 'N/A',
        averageEPAScorePeriod = !showNA ? Math.round((_.meanBy(refinedFacultyListInPeriod, (d) => d.entrustment_score_period) || 0) * 100) / 100 : 'N/A',
        averageWords = !showNA ? Math.round(_.meanBy(refinedFacultyList, (d) => d.words_per_comment) || 0) : 'N/A',
        averageWordsPeriod = !showNA ? Math.round(_.meanBy(refinedFacultyListInPeriod, (d) => d.words_per_comment_period) || 0) : 'N/A',
        ratingGroupSet = !showNA ? _.reduce(refinedFacultyList, (acc, d) => _.map(acc, (inner_d, i) => (inner_d + d.rating_group[i])), [0, 0, 0, 0, 0]) : [],
        phaseGroupSet = !showNA ? _.reduce(refinedFacultyList, (acc, d) => _.map(acc, (inner_d, i) => (inner_d + d.phase_group[i])), [0, 0, 0, 0]) : [];

    let averageQuALScore = 0, averageQuALScorePeriod = 0, averageEPASuggestionpercentage = 0, averageEPASuggestionpercentagePeriod = 0;
    // Calculate average QuAL score
    if (qualScoreEnabled) {
        averageQuALScore = !showNA ? Math.round((_.meanBy(refinedFacultyList, (d) => d.qual_score) || 0) * 100) / 100 : 'N/A';
        averageQuALScorePeriod = !showNA ? Math.round((_.meanBy(refinedFacultyListInPeriod, (d) => d.qual_score_period) || 0) * 100) / 100 : 'N/A';
        averageEPASuggestionpercentage = !showNA ? Math.round(_.meanBy(refinedFacultyList, (d) => d.suggestion_percentage) || 0) : 'N/A';
        averageEPASuggestionpercentagePeriod = !showNA ? Math.round(_.meanBy(refinedFacultyListInPeriod, (d) => d.suggestion_percentage_period) || 0) : 'N/A';
    }

    const percentageSymbol = !showNA ? '%' : '';

    return <div className={'faculty-MicroStatCard-group ' + (qualScoreEnabled ? 'qualscore-added' : '')}>
        <div className="hr-divider">
            <h4 className="hr-divider-content">
                {title}
                <InfoTip info={title.match('Acquisition Metrics for All Faculty in Rotation') ? infoTooltipReference.facultyDevlopment.acquisitionMetricsForAllFaculty : infoTooltipReference.facultyDevlopment.acquisitionMetricsForSingleFaculty} />
            </h4>
        </div>
        {
            (dateFilterActive) ?
                <div className='text-center'>
                    <MicroStatCard style={{ display: 'inline' }} dual={true} title='Total EPAs observed' type='info' metric={EPACount} secondMetric={EPACountPeriod} />
                    {!isUG && <MicroStatCard style={{ display: 'inline' }} dual={true} title='Percentage of EPAs Expired' type='success' metric={averageEPApercentage + percentageSymbol} secondMetric={averageEPApercentagePeriod + percentageSymbol} />}
                    <MicroStatCard style={{ display: 'inline' }} dual={true} title='Average EPA Score' type='primary' metric={averageEPAScore} secondMetric={averageEPAScorePeriod} />
                    <MicroStatCard style={{ display: 'inline' }} dual={true} title='Average words per comment' type='danger' metric={averageWords} secondMetric={averageWordsPeriod} />

                    {qualScoreEnabled && <MicroStatCard style={{ display: 'inline' }} dual={true} title='Average QuAL Score' type='primary' metric={averageQuALScore} secondMetric={averageQuALScorePeriod} />}
                    {qualScoreEnabled && <MicroStatCard style={{ display: 'inline' }} dual={true} title='EPAs with Suggestions' type='info' metric={averageEPASuggestionpercentage + percentageSymbol} secondMetric={averageEPASuggestionpercentagePeriod + percentageSymbol} />}

                    <FacultyScorePie dateFilterActive={dateFilterActive} isUG={isUG} data={ratingGroupSet} />
                    {!isUG && <PhaseSummaryPie data={phaseGroupSet} />}
                </div> :
                <div className='text-center'>
                    <MicroStatCard style={{ display: 'inline' }} title='Total EPAs observed' type='info' metric={EPACount} />
                    {!isUG && <MicroStatCard style={{ display: 'inline' }} title='Percentage of EPAs Expired' type='success' metric={averageEPApercentage + percentageSymbol} />}
                    <MicroStatCard style={{ display: 'inline' }} title='Average EPA Score' type='primary' metric={averageEPAScore} />
                    <MicroStatCard style={{ display: 'inline' }} title='Average words per comment' type='danger' metric={averageWords} />

                    {qualScoreEnabled && <MicroStatCard style={{ display: 'inline' }} title='Average QuAL Score' type='primary' metric={averageQuALScore} />}
                    {qualScoreEnabled && <MicroStatCard style={{ display: 'inline' }} title='EPAs with Suggestions' type='info' metric={averageEPASuggestionpercentage + percentageSymbol} />}
                    <FacultyScorePie dateFilterActive={dateFilterActive} isUG={isUG} data={ratingGroupSet} />
                    {!isUG && <PhaseSummaryPie data={phaseGroupSet} />}
                </div>
        }
    </div >

}
