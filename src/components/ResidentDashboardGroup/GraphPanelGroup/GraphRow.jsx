import React, { Component } from 'react';
import LineChart from './LineChart';
import BulletChart from './BulletChart';
import { scaleLinear } from 'd3';
import SlideInTable from './SlideInTable';
import SlideInFilter from './SlideInFilter';
import infoTooltipReference from "../../../utils/infoTooltipReference";
import { NumberToEPAText } from "../../../utils/convertEPA";

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
            residentEPAData,
            onMouseOut, onMouseOver,
            onTableExpandClick, onFilterExpandClick,
            onAssessmentPlanClick, isFilterVisible } = this.props;

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
        // Get achieved count based on values set by server
        const achievedCount = +epaSourceMap[epaSource.split(".")[0]].achieved[epaSource];

        // Get remaining count 
        const remainingCount = Math.max((maxObservation - achievedCount), 0);

        let firstMeasure = Math.min((recordedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);
        let secondMeasure = Math.min((achievedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);

        // remap NaN values to 0
        firstMeasure = isNaN(firstMeasure) ? 0 : firstMeasure;
        secondMeasure = isNaN(secondMeasure) ? 0 : secondMeasure;

        const xScale = scaleLinear().domain([0, residentEPAData.length - 1]).range([marginHorizontal, width - marginHorizontal])
        const yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])

        // Get the formID for the EPA and the corresponding contextual variable map
        const formID = residentEPAData.length > 0 ? residentEPAData[0].formID : '',
            contextual_variable_map = window.saskDashboard.contextual_variable_map[formID],
            isAnyFilterAvailable = contextual_variable_map && contextual_variable_map.length > 0,
            filterOptions = convertToFilterDict(contextual_variable_map, filterDict);

        const scoreData = residentEPAData.map((d, i) => {

            let highlight = false;
            let hasValidFilter = false;

            if (isFilterVisible) {
                const contexts = d.situationContextCollection;
                highlight = true;
                for (const filter of Object.keys(filterDict)) {
                    if (filter && filterDict[filter]) {
                        hasValidFilter = true;
                        let relaventContext = _.find(contexts, (d) => d.item_text == filter);

                        if (relaventContext && relaventContext.text) {
                            highlight = highlight && (relaventContext.text == filterDict[filter]);
                        }
                        else {
                            highlight = false;
                        }

                    }
                }
            }

            highlight = highlight && hasValidFilter;

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
        const isAssessmentPlanAvailable = false;

        return (
            <div className='text-xs-center'>
                {/* widthly reduced slightly by 10px to facilitate extra gap at the last */}
                <div style={{ width: widthPartition - 10 }} className='inner-cell epa-title-cell'>
                    <span className='inner-offset-label'>
                        {NumberToEPAText(epaSource) + " - " + epaSourceMap[innerKey].subRoot[epaSource]}
                        {isAssessmentPlanAvailable &&
                            <span
                                className={"s-tooltip-assessment-plan-button plan-icon fa-file-text " + (isPlanVisible ? ' open-plan' : ' ')}
                                data-epa-source={epaSource}
                                data-s-tooltip-text={infoTooltipReference.residentMetrics.showEPAPlan}
                                onClick={onAssessmentPlanClick}>
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
                        secondMeasure={secondMeasure}
                        firstMeasure={firstMeasure} />

                    <div className='card-container'>
                        {true &&
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
                            <span className='card-text'>{achievedCount}</span>
                            <span className='card-title achieved-title'>ACHIEVED</span>
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
                    {!smallScreen &&
                        <span className={"table-icon fa fa-book " + epaSource + (isTableVisible ? ' open-table' : ' ')} onClick={onTableExpandClick}>
                            <s-tooltip border-width="1px" show-delay="1000" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.residentMetrics.showEPATable}</s-tooltip>
                        </span>
                    }
                    {!smallScreen && isAnyFilterAvailable &&
                        <span className={"fa filter-icon fa-sliders " + epaSource + (isFilterVisible ? ' open-filter' : ' ')} onClick={onFilterExpandClick}>
                            <s-tooltip border-width="1px" show-delay="1000" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.residentMetrics.showEPAFilter}</s-tooltip>
                        </span>
                    }

                </div>
                {!smallScreen && isTableVisible &&
                    <SlideInTable
                        data={residentEPAData}
                        width={widthPartition} />}
                {!smallScreen && isFilterVisible &&
                    <SlideInFilter
                        data={scoreData}
                        width={widthPartition}
                        innerKey={innerKey}
                        epaSource={epaSource}
                        epaSourceMap={epaSourceMap}
                        onHighlightChange={this.onHighlightChange}
                        filterDict={filterDict}
                        filterOptions={filterOptions} />}
            </div>
        );
    }
}

// This takes in values that are in contextual variable map format
// of elentra and converts them into a more easily consumable form needed for the dashboard
// as a array of options with a title
function convertToFilterDict(contextual_variable_map, filterDict) {
    let filterGroup = _.groupBy(contextual_variable_map, (d) => d.objective_parent_name);
    // set the options simply as the obective title
    return _.map(filterGroup, (options, filterKey) => {
        return {
            'label': filterKey,
            'options': _.map(options, (d) => d.objective_name),
            'selected': filterDict[filterKey] || ''
        };
    });
}