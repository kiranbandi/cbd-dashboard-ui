import React from 'react';
import FacultyStatCardSet from './FacultyStatCardSet';
import FacultyRadarChart from './FacultyRadarChart';

export default (props) => {

    const { isUG = false, width, currentRotation, currentFaculty, dateFilterActive,
        processedRecords, currentFacultyRecords, programInfo } = props;

    return <div className='text-center'>
        <div className='print-info' style={{ 'display': 'inline-block', 'width': '1120px' }}>
            <FacultyStatCardSet
                isUG={isUG}
                title={"Acquisition Metrics for All Faculty in Rotation - " + currentRotation}
                processedRecords={processedRecords}
                dateFilterActive={dateFilterActive} />
            <FacultyStatCardSet
                isUG={isUG}
                title={"Acquisition Metrics for Faculty - " + currentFaculty}
                showNA={currentFaculty == 'ALL'}
                processedRecords={currentFaculty == 'ALL' ? [] : currentFacultyRecords}
                dateFilterActive={dateFilterActive} />
        </div>
        {/* <FacultyRadarChart
            isUG={isUG}
            width={width}
            processedRecords={processedRecords}
            currentFacultyRecords={currentFacultyRecords}
            programInfo={programInfo} /> */}
    </div>
}
