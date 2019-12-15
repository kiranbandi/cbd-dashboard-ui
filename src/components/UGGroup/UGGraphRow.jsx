import React, { Component } from 'react';
import { scaleLinear } from 'd3';
import UGLineChart from './UGLineChart';
import UGSlideInTable from './UGSlideInTable';
import PieChart from '../ReusableComponents/PieChart';

export default class GraphRow extends Component {

    constructor(props) {
        super(props);
        this.state = { admission_type: '', patient_type: '' };
    }

    onHighlightChange = (admission_type, patient_type) => { this.setState({ admission_type, patient_type }) }

    render() {

        const { admission_type, patient_type } = this.state;

        let { epaSource, isTableVisible,
            widthPartition, smallScreen = false, epaSourceMap,
            studentEPAData, onMouseOut, onMouseOver,
            onTableExpandClick, onFilterExpandClick, isFilterVisible } = this.props;


        // margin of 10px on either side reduces the available width by 20
        var marginVertical = 40;
        var marginHorizontal = 40;
        var height = 180;
        var innerHeight = height - 20;
        var width = (smallScreen ? widthPartition : widthPartition * 2) - 20;

        // Get the maximum required observations for each EPA from source MAP 
        const maxObservation = +epaSourceMap.maxObservation[epaSource];

        // Get recorded observation count
        const recordedCount = studentEPAData.length;
        // Get performance for each rating type
        let lowCount = studentEPAData.filter((record) => +record.rating == 1).length;
        let mediumCount = studentEPAData.filter((record) => +record.rating == 2).length;
        let highCount = studentEPAData.filter((record) => +record.rating == 3).length;
        // Get remaining count 
        const remainingCount = Math.max((maxObservation - recordedCount), 0);
        // if the sum of any combination is more than the max , then we just max the chart out
        if (highCount >= maxObservation) {
            highCount = maxObservation;
            mediumCount = 0;
            lowCount = 0;
        }
        else if ((highCount + mediumCount) >= maxObservation) {
            mediumCount = maxObservation - highCount;
            lowCount = 0;
        }
        else if ((highCount + mediumCount + lowCount) > maxObservation) {
            lowCount = maxObservation - mediumCount - highCount;
        }
        const percentageArray = [((highCount / maxObservation) * 100),
        ((mediumCount / maxObservation) * 100), ((lowCount / maxObservation) * 100),
        ((remainingCount / maxObservation) * 100)].map((d) => ({ 'value': d }));

        const xScale = scaleLinear().domain([0, studentEPAData.length - 1]).range([marginHorizontal, width - marginHorizontal])
        const yScale = scaleLinear().domain([3, 1]).range([marginVertical, innerHeight - marginVertical])

        const scoreData = studentEPAData.map((d, i) => {

            let highlight = false;

            if (isFilterVisible) {
                if (admission_type.length > 0 && patient_type.length > 0) {
                    highlight = ((d.admission_type == admission_type) && (d.patient_type == patient_type)) ? true : false;
                }
                else if (admission_type.length > 0) {
                    highlight = (d.admission_type == admission_type);
                }
                else if (patient_type.length > 0) {
                    highlight = (d.patient_type == patient_type);
                }
            }

            return {
                x: xScale(i),
                y: yScale(d.rating),
                highlight,
                pureData: d
            };

        });

        const trackTrailPositions = _.map([...Array(3)], (d, i) => {
            return {
                x: marginHorizontal,
                dx: width - (2 * marginHorizontal),
                y: yScale(i + 1)
            }
        })

        return (
            <div className='text-xs-center'>
                {/* widthly reduced slightly by 10px to facilitate extra gap at the last */}
                <div style={{ width: widthPartition - 10 }} className='inner-cell epa-title-cell text-left' >
                    <span className='inner-offset-label text-left'>
                        <b>{"EPA " + epaSource + ": "}</b>{epaSourceMap.subRoot[epaSource]}
                    </span>
                </div>
                <div style={{ width: widthPartition }} className='inner-cell observation-cell'>
                    <div className='card-container'>

                        <div className='chart-wrapper'>
                            <PieChart
                                data={percentageArray}
                                width={150} height={150}
                                innerRadius={50} outerRadius={75} />
                            <div className='graph-card first-card'>
                                <span className='card-text'>{remainingCount}</span>
                                <span className='card-title remaining-title'>TO GO</span>
                            </div>
                        </div>

                    </div>

                </div>
                <div style={{ width: smallScreen ? widthPartition : widthPartition * 2 }} className='inner-cell score-cell'>
                    <UGLineChart
                        trackTrailPositions={trackTrailPositions}
                        width={width}
                        data={scoreData}
                        epaSource={epaSource}
                        smallScreen={smallScreen}
                        innerHeight={innerHeight}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut} />
                    <span className={"icon table-icon icon-open-book " + epaSource + (isTableVisible ? ' open-table' : ' ')} onClick={onTableExpandClick}></span>
                </div>
                {!smallScreen && isTableVisible &&
                    <UGSlideInTable
                        data={studentEPAData}
                        width={widthPartition} />}
            </div>
        );
    }
}
