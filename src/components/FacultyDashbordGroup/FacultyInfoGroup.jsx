import React from 'react';
import FacultyStatCardSet from './FacultyStatCardSet';
import infoTooltipReference from '../../utils/infoTooltipReference';


export default (props) => {

    const { currentFaculty, dateFilterActive, processedRecords, currentFacultyRecords } = props;

    return <div className='text-center'>
        <div className='print-info' style={{ 'display': 'inline-block', 'width': '1100px' }}>
            <FacultyStatCardSet
                tooltipRef={infoTooltipReference.facultyDevlopment.acquisitionMetricsForAllFaculty}
                tooltipID={'faculty-acq-all-infotip'}
                title={"Acquisition Metrics for All Assessors in Program"}
                processedRecords={processedRecords}
                dateFilterActive={dateFilterActive} />
            {(currentFaculty !== 'ALL' && currentFaculty !== '') && <FacultyStatCardSet
                tooltipRef={infoTooltipReference.facultyDevlopment.acquisitionMetricsForSingleFaculty}
                tooltipID={'faculty-acq-selected-infotip'}
                title={"Acquisition Metrics for Assessor - " + currentFaculty}
                showNA={currentFaculty == 'ALL'}
                processedRecords={currentFaculty == 'ALL' ? [] : currentFacultyRecords}
                dateFilterActive={dateFilterActive} />}
        </div>
    </div>
}
