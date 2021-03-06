import React from 'react';
import { Radar, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, } from 'recharts';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { InfoTip } from '../';
import { NumberToEPAText, EPATextToNumber } from '../../utils/convertEPA';

export default (props) => {

    const { isUG = false, width, processedRecords, currentFacultyRecords, programInfo } = props;

    let radarChartWidth = width - 1100 > 400 ? 400 : width / 2,
        radarRadius = (radarChartWidth / 2) - 30;

    let epaList = getEPAList(programInfo.epaSourceMap),
        overallepaGroupList = _.map(processedRecords, (d) => d.epaGroup),
        currentFacultyepaGroupList = currentFacultyRecords.length > 0 ? currentFacultyRecords[0].epaGroup : [];

    let trainingStageGroupMax = {};

    // For every training stage get the corresponding maximum count
    // from EPA list then from overall list and current faculty list 
    _.map(epaList, (d, epaListIndex) => {
        const trainingStageKey = isUG ? '1' : d.label[0];
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
        let trainingStageMax = trainingStageGroupMax[isUG ? '1' : epa.label[0]];
        return {
            'label': isUG ? epa.label : NumberToEPAText(epa.label),
            'labelDescription': epa.description,
            'epaCount': +overallepaGroupSummed[epaIndex],
            'facEpaCount': +currentFacultyepaGroupList[epaIndex],
            'overall': (+overallepaGroupSummed[epaIndex] / trainingStageMax.epaCount) / (+epa.max / trainingStageMax.max),
            'currentFaculty': ((currentFacultyepaGroupList[epaIndex] || 0) / trainingStageMax.currentFacultyCount) / (+epa.max / trainingStageMax.max)
        };
    });

    const maxCap = isUG ? 1.5 : 2;

    // cap the values to a maximum of 2 or in this case 200% or the maxCap
    newData = _.map(newData, (d) => {
        if (isNaN(d.overall)) { d.overall = 0 }
        else { d.overall = d.overall > maxCap ? maxCap : d.overall }
        if (isNaN(d.currentFaculty)) { d.currentFaculty = 0 }
        else { d.currentFaculty = d.currentFaculty > maxCap ? maxCap : d.currentFaculty }
        return d;
    });

    // group the values by training phase 
    newData = isUG ? newData : _.groupBy(newData, (d) => d.label[0]);

    return <div className='faculty-radar-chart'>
        <div className="hr-divider">
            <h4 className="hr-divider-content"> EPA Distribution </h4>
            <InfoTip info={infoTooltipReference.facultyDevlopment.EPADistribution} />
        </div>
        {isUG ? <div className='radar-chart-wrapper'>
            <div className='radar-chart-inner'>
                <RadarChart cx={radarRadius + 35} cy={radarRadius + 25}
                    outerRadius={radarRadius}
                    width={radarChartWidth} height={radarChartWidth} data={newData}>
                    <PolarGrid strokeOpacity={0.1} strokeWidth={0.5} />
                    <PolarAngleAxis dataKey="label" />
                    <Radar name="Overall" dataKey="overall"
                        stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    {currentFacultyRecords.length > 0
                        && <Radar name="CurrentFaculty" dataKey="currentFaculty"
                            stroke="#1ca8dd" fill="#1ca8dd" fillOpacity={0.6} />}
                    <Tooltip labelStyle={{ 'color': 'black' }}
                        wrapperStyle={{ 'fontWeight': 'bold' }}
                        labelFormatter={(label) => {
                            // we find the epa through its label and tag on its description into the label
                            return (label + ': ' + _.find(epaList, (d) => d.label == label).description);
                        }}
                        formatter={(value, name, datapoint) => {
                            let tooltipText = Math.round(value * 100),
                                tooltipPre = name == 'Overall' ? datapoint.payload.epaCount : datapoint.payload.facEpaCount;
                            // if value is 150, let the user know its capped
                            tooltipText = tooltipText == '150' ? '>150' : tooltipText;
                            return [tooltipPre + ' EPAs, ' + tooltipText + '%', (name == 'Overall' ? 'Program' : 'Faculty') + ' EPA Filled Ratio'];
                        }} />
                </RadarChart>
            </div>
        </div>
            : <div className='radar-chart-wrapper'>
                {['D', 'F', 'C', 'P'].map((radarKey) => {
                    if (newData[radarKey]) {
                        return <div key={'radar-' + radarKey} className='radar-chart-inner'>
                            <RadarChart cx={radarRadius + 35} cy={radarRadius + 25}
                                outerRadius={radarRadius}
                                width={radarChartWidth} height={radarChartWidth} data={newData[radarKey]}>
                                <PolarGrid strokeOpacity={0.1} strokeWidth={0.5} />
                                <PolarAngleAxis dataKey="label" />
                                <Radar name="Overall" dataKey="overall"
                                    stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                {currentFacultyRecords.length > 0
                                    && <Radar name="CurrentFaculty" dataKey="currentFaculty"
                                        stroke="#1ca8dd" fill="#1ca8dd" fillOpacity={0.6} />}
                                <Tooltip labelStyle={{ 'color': '#252830' }}
                                    // zindex set high to prevent tooltip overlap issue
                                    wrapperStyle={{ 'fontWeight': 'bold', 'zIndex': 1000 }}
                                    labelFormatter={(label) => {
                                        // we find the epa through its label and tag on its description into the label
                                        return (label + ': ' + _.find(epaList, (d) => d.label == EPATextToNumber(label)).description);
                                    }}
                                    formatter={(value, name) => {
                                        let tooltipText = Math.round(value * 100);
                                        // if value is 200, let the user know its capped
                                        tooltipText = tooltipText == '200' ? '>200' : tooltipText;
                                        return [tooltipText + '%', (name == 'Overall' ? 'Program' : 'Faculty') + ' EPA Filled Ratio'];
                                    }} />
                            </RadarChart>
                        </div>
                    }
                })}
            </div>}

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
            EPAList.push({
                'label': epaKey,
                'max': templateEpaSourceMap['maxObservation'][epaKey],
                'description': epa
            });
        });
    } else {
        // remove special assessment EPAs if any
        _.map(templateEpaSourceMap, (epaSource, key) => {
            _.map(epaSource.subRoot, (epa, epaKey) => {
                if (epa.indexOf('(SA)') == -1) {
                    EPAList.push({
                        'label': epaKey,
                        'max': epaSource['maxObservation'][epaKey],
                        'description': epa
                    });
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
