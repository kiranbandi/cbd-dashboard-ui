import React, { Component } from 'react';
import LineChart from './LineChart';
import BulletChart from './BulletChart';
import { scaleLinear } from 'd3';
import SlideInTable from './SlideInTable';
import SlideInFilter from './SlideInFilter';

export default class GraphRow extends Component {

    constructor(props) {
        super(props);
        this.state = { clinicalFilter: '', patientDemographicFilter: '' };
        this.onHighlightChange = this.onHighlightChange.bind(this);

    }

    onHighlightChange(clinicalFilter, patientDemographicFilter) {
        this.setState({ clinicalFilter, patientDemographicFilter });
    }

    render() {

        const { clinicalFilter, patientDemographicFilter } = this.state;

        let { epaSource, isTableVisible, innerKey,
            widthPartition, smallScreen, epaSourceMap,
            residentEPAData, expiredResidentEPAData, onMouseOut, onMouseOver,
            onTableExpandClick, onFilterExpandClick,
            isEMDepartment, isFilterVisible } = this.props;

        //  margin of 20px on either side reduces the available width by 40 
        // 15px bullet chart padding on either sides
        const bulletInnerWidth = widthPartition - 70;

        // margin of 10px on either side reduces the available width by 20
        var marginVertical = 20;
        var marginHorizontal = 20;
        var height = 200;
        var innerHeight = height - 20;
        var width = (smallScreen ? widthPartition : widthPartition * 2) - 20;

        // Get the maximum required observations for each EPA from source MAP *
        const maxObservation = +epaSourceMap[epaSource.split(".")[0]].maxObservation[epaSource];

        // Get recorded observation count
        const recordedCount = residentEPAData.length;
        //  Get expired record count 
        const expiredCount = expiredResidentEPAData.length;
        // Get high performance observations count, 4 or 5 
        const achievedCount = residentEPAData.filter((record) => +record.Rating >= 4).length;
        // Get remaining count 
        const remainingCount = Math.max((maxObservation - recordedCount), 0)

        const firstMeasure = Math.min((recordedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);

        const xScale = scaleLinear().domain([0, residentEPAData.length - 1]).range([marginHorizontal, width - marginHorizontal])
        const yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])

        const scoreData = residentEPAData.map((d, i) => {

            let highlight = false;

            if (isFilterVisible) {

                const context = d.Situation_Context.split(",").map((val_0) => val_0.trim());

                if (clinicalFilter.length > 0 && patientDemographicFilter.length > 0) {
                    highlight = (context.indexOf(clinicalFilter) > 0 && context.indexOf(patientDemographicFilter) > -1) ? true : false;
                }
                else if (clinicalFilter.length > 0) {
                    highlight = context.indexOf(clinicalFilter) > 0 ? true : false;
                }
                else if (patientDemographicFilter.length > 0) {
                    highlight = (context.indexOf(patientDemographicFilter) > -1) ? true : false;
                }
            }

            return {
                x: xScale(i),
                y: yScale(d.Rating),
                highlight,
                pureData: d
            };

        });

        const trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: marginHorizontal,
                dx: width - (2 * marginHorizontal),
                y: yScale(i + 1)
            }
        })

        return (
            <div className='text-xs-center'>
                {/* widthly reduced slightly by 10px to facilitate extra gap at the last */}
                <div style={{ width: widthPartition - 10 }} className='inner-cell epa-title-cell'>
                    <span className='inner-offset-label'>
                        {epaSource + " - " + epaSourceMap[innerKey].subRoot[epaSource]}
                    </span>
                </div>
                <div style={{ width: widthPartition }} className='inner-cell observation-cell'>
                    <BulletChart
                        widthPartition={widthPartition}
                        bulletInnerWidth={bulletInnerWidth}
                        firstMeasure={firstMeasure} />

                    <div className='card-container'>
                        <div className='graph-card first-card'>
                            <span className='card-text'>{remainingCount}</span>
                            <span className='card-title remaining-title'>TO GO</span>
                        </div>
                        <div className='graph-card'>
                            <span className='card-text'>{recordedCount}</span>
                            <span className='card-title recorded-title'>OBSERVED</span>
                        </div>
                        <div className='graph-card'>
                            <span className='card-text'>{maxObservation}</span>
                            <span className='card-title required-title'>REQUIRED</span>
                        </div>
                        <div className='graph-card '>
                            <span className='card-text'>{expiredCount}</span>
                            <span className='card-title expired-title'>EXPIRED</span>
                        </div>
                    </div>

                </div>
                <div style={{ width: smallScreen ? widthPartition : widthPartition * 2 }} className='inner-cell score-cell'>
                    <LineChart
                        trackTrailPositions={trackTrailPositions}
                        width={width}
                        data={scoreData}
                        epaSource={epaSource}
                        smallScreen={smallScreen}
                        innerHeight={innerHeight}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut} />
                    {!smallScreen && isEMDepartment && <span className={"icon table-icon icon-open-book " + epaSource + (isTableVisible ? ' open-table' : ' ')} onClick={onTableExpandClick}></span>}
                    {!smallScreen && isEMDepartment && <span className={"icon filter-icon icon-sound-mix " + epaSource + (isFilterVisible ? ' open-filter' : ' ')} onClick={onFilterExpandClick}></span>}

                </div>
                {!smallScreen && isTableVisible && isEMDepartment &&
                    <SlideInTable
                        data={residentEPAData}
                        width={widthPartition} />}
                {!smallScreen && isFilterVisible && isEMDepartment &&
                    <SlideInFilter
                        data={scoreData}
                        width={widthPartition}
                        innerKey={innerKey}
                        epaSource={epaSource}
                        onHighlightChange={this.onHighlightChange}
                        clinicalFilter={clinicalFilter}
                        patientDemographicFilter={patientDemographicFilter}
                    />}
            </div>
        );
    }
}

