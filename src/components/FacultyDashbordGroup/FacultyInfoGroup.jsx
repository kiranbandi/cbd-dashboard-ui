import React from 'react';
import FacultyStatCardSet from './FacultyStatCardSet';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import programInfo from '../../utils/programInfo/programs/EM';

const data = [
    {
        subject: 'Math', A: 120, B: 110,
    },
    {
        subject: 'Chinese', A: 98, B: 130,
    },
    {
        subject: 'English', A: 86, B: 130,
    },
    {
        subject: 'Geography', A: 99, B: 100,
    },
    {
        subject: 'Physics', A: 85, B: 90,
    },
    {
        subject: 'History', A: 65, B: 85,
    },
];


export default (props) => {

    const { isUG = false, width, currentRotation, currentFaculty, dateFilterActive,
        processedRecords, currentFacultyRecords, programInfo } = props;

    const radarChartWidth = width - 1100 > 400 ? 400 : width - 110,
        radarRadius = (radarChartWidth / 2) - 30;

    let epaList = getEPAList(programInfo.epaSourceMap),
        overallepaGroupList = _.map(processedRecords, (d) => d.epaGroup),
        currentFacultyepaGroupList = currentFacultyRecords.length > 0 ? currentFacultyRecords[0].epaGroup : [],
        overallepaGroupSummed = sumArrays(...overallepaGroupList),
        totalMax = _.sumBy(epaList, (e) => e.max),
        currentFacultySumCount = _.sum(currentFacultyepaGroupList) == 0 ? 1 : _.sum(currentFacultyepaGroupList),
        totalSumCount = _.sum(overallepaGroupSummed),
        newData = _.map(epaList, (epa, epaIndex) => {
            return {
                'label': epa.label,
                'overall': (+overallepaGroupSummed[epaIndex] / totalSumCount) / (+epa.max / totalMax),
                'currentFaculty': ((currentFacultyepaGroupList[epaIndex] || 0) / currentFacultySumCount) / (+epa.max / totalMax),
                'max': epa.max
            };
        });

    return <div className='text-center'>
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
        <div className='faculty-radar-chart'>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> EPA Distribution </h4>
            </div>

            {overallepaGroupSummed.length > 0 &&
                <RadarChart cx={radarRadius + 35} cy={radarRadius + 25}
                    outerRadius={radarRadius}
                    width={radarChartWidth} height={500} data={newData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="label" />
                    {currentFacultyRecords.length > 0
                        && <Radar name="CurrentFaculty" dataKey="currentFaculty" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />}
                    <Radar name="Overall" dataKey="overall" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>}

        </div>
    </div>

}


function getEPAList(epaSourceMap) {
    // create a epa list to map epa distribution
    let templateEpaSourceMap = _.cloneDeep(epaSourceMap),
        EPAList = [];
    // remove special assessment EPAs if any
    _.map(templateEpaSourceMap, (epaSource, key) => {
        _.map(epaSource.subRoot, (epa, epaKey) => {
            if (epa.indexOf('(SA)') == -1) {
                EPAList.push({ 'label': epaKey, 'max': epaSource['maxObservation'][epaKey] });
            }
        })
    });
    return EPAList;
}

function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}
