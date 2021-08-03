import React from 'react';
import FacultyStatCardSet from './FacultyStatCardSet';

export default (props) => {

    const { width, currentFaculty, dateFilterActive,
        processedRecords, currentFacultyRecords, programInfo } = props;

    return <div className='text-center'>
        <div className='print-info' style={{ 'display': 'inline-block', 'width': '1120px' }}>
            <FacultyStatCardSet
                title={"Acquisition Metrics for All Faculty in Program"}
                processedRecords={processedRecords}
                dateFilterActive={dateFilterActive} />
            <FacultyStatCardSet
                title={"Acquisition Metrics for Faculty - " + currentFaculty}
                showNA={currentFaculty == 'ALL'}
                processedRecords={currentFaculty == 'ALL' ? [] : currentFacultyRecords}
                dateFilterActive={dateFilterActive} />
        </div>
    </div>
}
