import React from 'react';
import FacultyStatCardSet from './FacultyStatCardSet';

export default (props) => {

    const { isUG = false, currentRotation, currentFaculty, dateFilterActive,
        processedRecords, currentFacultyRecords } = props;

    return <div>
        <div className='m-r-lg m-l-md print-info' style={{ 'display': 'inline-block', 'width': '1080px' }}>
            <FacultyStatCardSet
                isUG={isUG}
                title={"Acquistion Metrics for All Faculties in Rotation - " + currentRotation}
                processedRecords={processedRecords}
                dateFilterActive={dateFilterActive} />
            <FacultyStatCardSet
                isUG={isUG}
                title={"Acquistion Metrics for Faculty - " + currentFaculty}
                showNA={currentFaculty == 'ALL'}
                processedRecords={currentFaculty == 'ALL' ? [] : currentFacultyRecords}
                dateFilterActive={dateFilterActive} />
        </div>
    </div>

}
