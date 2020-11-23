import React, { Component } from 'react';
import LineChart from './LineChart';
import BulletChart from './BulletChart';
import { scaleLinear } from 'd3';
import SlideInTable from './SlideInTable';
import SlideInFilter from './SlideInFilter';
import infoTooltipReference from "../../../utils/infoTooltipReference";

export default class GraphRow extends Component {

    constructor(props) {
        super(props);
        this.state = { filterDict: {} };
        this.onHighlightChange = this.onHighlightChange.bind(this);

    }

    onHighlightChange(filterKey, filterValue) {
        if (filterKey === '*') {
            this.setState({ filterDict: filterValue });
        } else {
            this.state.filterDict[filterKey] = filterValue;
            const filterDict = this.state.filterDict;
            this.setState({ filterDict });
        }
    }

    render() {

        const { filterDict } = this.state;

        let { epaSource, isTableVisible, isPlanVisible, innerKey,
            widthPartition, smallScreen, epaSourceMap,
            residentEPAData, expiredResidentEPAData,
            onMouseOut, onMouseOver, hideTogoNumbers,
            onTableExpandClick, onFilterExpandClick,
            onAssessmentPlanClick,
            nonDemoMode, isFilterVisible } = this.props;

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
        // Get remaining count 
        const remainingCount = Math.max((maxObservation - recordedCount), 0)

        const firstMeasure = Math.min((recordedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);

        const xScale = scaleLinear().domain([0, residentEPAData.length - 1]).range([marginHorizontal, width - marginHorizontal])
        const yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])

        const scoreData = residentEPAData.map((d, i) => {

            let highlight = false;

            if (isFilterVisible) {
                const context = splitAndTrim(d.Situation_Context);
                highlight = true;
                for (const filter of Object.values(filterDict)) {
                    if (filter) {
                        highlight = highlight && context.indexOf(filter) > -1;
                    }
                }
            }

            return {
                x: xScale(i),
                y: yScale(d.Rating),
                highlight,
                pureData: d,
                concern: (d.Professionalism_Safety != '' && d.Professionalism_Safety != "No")
            };

        });

        const trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: marginHorizontal,
                dx: width - (2 * marginHorizontal),
                y: yScale(i + 1)
            }
        });

        const isAnyFilterAvailable = Object.keys((epaSourceMap[innerKey].filterValuesDict[epaSource]) || {}).length > 0;
        const isAssessmentPlanAvailable = epaSourceMap[innerKey].assessmentInfo && epaSourceMap[innerKey].assessmentInfo[epaSource];

        return (
            <div className='text-xs-center'>
                {/* widthly reduced slightly by 10px to facilitate extra gap at the last */}
                <div style={{ width: widthPartition - 10 }} className='inner-cell epa-title-cell'>
                    <span className='inner-offset-label'>
                        {epaSource + " - " + epaSourceMap[innerKey].subRoot[epaSource]}
                        {isAssessmentPlanAvailable &&
                            <span className={"icon plan-icon icon-layers " + epaSource + (isPlanVisible ? ' open-plan' : ' ')} onClick={onAssessmentPlanClick}>
                                <s-tooltip border-width="1px" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.residentMetrics.showEPAPlan}</s-tooltip>
                            </span>}
                    </span>
                    {isPlanVisible && isAssessmentPlanAvailable &&
                        <div className="assessment-plan-box">
                            <div> <b>Assessment Plan</b></div>
                            <div className='assessment-plan-content'>
                                {epaSourceMap[innerKey].assessmentInfo[epaSource] || ''}
                            </div>
                        </div>}
                </div>
                <div style={{ width: widthPartition }} className='inner-cell observation-cell'>
                    <BulletChart
                        widthPartition={widthPartition}
                        bulletInnerWidth={bulletInnerWidth}
                        firstMeasure={firstMeasure} />

                    <div className='card-container'>
                        {!hideTogoNumbers &&
                            <div className='graph-card first-card'>
                                <span className='card-text'>{remainingCount}</span>
                                <span className='card-title remaining-title'>TO GO</span>
                            </div>}
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
                    {!smallScreen && nonDemoMode &&
                        <span className={"icon table-icon icon-open-book " + epaSource + (isTableVisible ? ' open-table' : ' ')} onClick={onTableExpandClick}>
                            <s-tooltip border-width="1px" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.residentMetrics.showEPATable}</s-tooltip>
                        </span>
                    }
                    {!smallScreen && nonDemoMode && isAnyFilterAvailable &&
                        <span className={"icon filter-icon icon-sound-mix " + epaSource + (isFilterVisible ? ' open-filter' : ' ')} onClick={onFilterExpandClick}>
                            <s-tooltip border-width="1px" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.residentMetrics.showEPAFilter}</s-tooltip>
                        </span>
                    }

                </div>
                {!smallScreen && isTableVisible && nonDemoMode &&
                    <SlideInTable
                        data={residentEPAData}
                        width={widthPartition} />}
                {!smallScreen && isFilterVisible && nonDemoMode &&
                    <SlideInFilter
                        data={scoreData}
                        width={widthPartition}
                        innerKey={innerKey}
                        epaSource={epaSource}
                        epaSourceMap={epaSourceMap}
                        onHighlightChange={this.onHighlightChange}
                        filterDict={filterDict} />}
            </div>
        );
    }
}

//  This takes in values that are comma seperated and splits them into an array
// and also trims any leading or trailing whitespaces, additionally it also ignores commas in brackets
// because the comma in that case is part of the option itself and not a seperator.
function splitAndTrim(string) {
    var regex = /,(?![^(]*\)) /;
    return string.split(regex).map((s) => s.trim());
}