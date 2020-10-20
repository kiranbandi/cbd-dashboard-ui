import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, } from 'recharts';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { InfoTip } from '../';

export default (props) => {

    const { width, processedRecords, currentFacultyRecords, programInfo } = props;

    let radarChartWidth = width - 1100 > 400 ? 400 : width / 2,
        radarRadius = (radarChartWidth / 2) - 30;

    let epaList = getEPAList(programInfo.epaSourceMap),
        overallepaGroupList = _.map(processedRecords, (d) => d.epaGroup),
        currentFacultyepaGroupList = currentFacultyRecords.length > 0 ? currentFacultyRecords[0].epaGroup : [];

    let trainingStageGroupMax = {};
    // For every training stage get the corresponding maximum count
    // from EPA list then from overall list and current faculty list 
    _.map(epaList, (d, epaListIndex) => {
        const trainingStageKey = d.label[0];
        if (trainingStageGroupMax.hasOwnProperty(trainingStageKey)) {
            const currentKey = trainingStageGroupMax[trainingStageKey];
            // update each individual epa value into count
            currentKey.max.push(d.max);
            currentKey.epaCount.push(_.sumBy(overallepaGroupList, (d) => +d[epaListIndex]) || 0),
                currentKey.currentFacultyCount.push(currentFacultyepaGroupList[epaListIndex] || 0)
        }
        else {
            trainingStageGroupMax[trainingStageKey] = {
                max: [d.max],
                epaCount: [_.sumBy(overallepaGroupList, (d) => +d[epaListIndex]) || 0],
                currentFacultyCount: [currentFacultyepaGroupList[epaListIndex] || 0]
            }
        }
    });

    // Now for every training stage calculate the overall sum
    _.map(trainingStageGroupMax, (t) => {
        t.max = _.sum(t.max);
        t.epaCount = _.sum(t.epaCount);
        t.currentFacultyCount = _.sum(t.currentFacultyCount);
    })

    let overallepaGroupSummed = sumArrays(...overallepaGroupList);


    let newData = _.map(epaList, (epa, epaIndex) => {

        let trainingStageMax = trainingStageGroupMax[epa.label[0]];

        return {
            'label': epa.label,
            'overall': (+overallepaGroupSummed[epaIndex] / trainingStageMax.epaCount) / (+epa.max / trainingStageMax.max),
            'currentFaculty': ((currentFacultyepaGroupList[epaIndex] || 0) / trainingStageMax.currentFacultyCount) / (+epa.max / trainingStageMax.max)
        };
    });

    return <div className='faculty-radar-chart'>
        <div className="hr-divider">
            <h4 className="hr-divider-content"> EPA Distribution </h4>
            <InfoTip info={infoTooltipReference.facultyDevlopment.EPADistribution} />
        </div>
        {overallepaGroupSummed.length > 0 &&
            <RadarChart cx={radarRadius + 35} cy={radarRadius + 25}
                outerRadius={radarRadius}
                width={radarChartWidth} height={radarChartWidth} data={newData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <Radar name="Overall" dataKey="overall" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                {currentFacultyRecords.length > 0
                    && <Radar name="CurrentFaculty" dataKey="currentFaculty" stroke="#1ca8dd" fill="#1ca8dd" fillOpacity={0.6} />}
            </RadarChart>}
    </div>
}


function getEPAList(epaSourceMap) {
    // create a epa list to map epa distribution
    let templateEpaSourceMap = _.cloneDeep(epaSourceMap),
        EPAList = [];

    // if sub root is available on first level then its UG
    //  so do a shallow loop
    if (templateEpaSourceMap.hasOwnProperty('subRoot')) {
        _.map(templateEpaSourceMap.subRoot, (epa, epaKey) => {
            EPAList.push({ 'label': epaKey, 'max': templateEpaSourceMap['maxObservation'][epaKey] });
        });
    } else {
        // remove special assessment EPAs if any
        _.map(templateEpaSourceMap, (epaSource, key) => {
            _.map(epaSource.subRoot, (epa, epaKey) => {
                if (epa.indexOf('(SA)') == -1) {
                    EPAList.push({ 'label': epaKey, 'max': epaSource['maxObservation'][epaKey] });
                }
            })
        });
    }
    return EPAList;
}

function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
}
