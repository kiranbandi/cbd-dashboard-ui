import React, { Component } from 'react';
import LineChart from './LineChart';
import BulletChart from './BulletChart';
import { scaleLinear } from 'd3';
import SlideInTable from './SlideInTable';
import SlideInFilter from './SlideInFilter';
import { NumberToEPAText } from "../../../utils/convertEPA";
import oScoreReference from "../../../utils/oScoreReference";
import infoTooltipReference from '../../../utils/infoTooltipReference';
import ReactTooltip from 'react-tooltip';

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

        let { epaSource, isTableVisible, innerKey,
            widthPartition, smallScreen, epaSourceMap,
            residentEPAData,
            onMouseOut, onMouseOver, onInfoClick,
            onTableExpandClick, onFilterExpandClick,
            isFilterVisible } = this.props;

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

        const isEPAComplete = remainingCount == 0 || +epaSourceMap[epaSource.split(".")[0]].completed[epaSource];

        let firstMeasure = Math.min((recordedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);
        let secondMeasure = Math.min((achievedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);

        // remap NaN values to 0
        firstMeasure = isNaN(firstMeasure) ? 0 : firstMeasure;
        secondMeasure = isNaN(secondMeasure) ? 0 : secondMeasure;
        // Get the record rating scale
        let scoreScale = residentEPAData.length > 0 ? residentEPAData[0].scale : oScoreReference;

        const xScale = scaleLinear().domain([0, residentEPAData.length - 1]).range([marginHorizontal + 20, width - marginHorizontal])
        const yScale = scaleLinear().domain([scoreScale.length, 1]).range([marginVertical, innerHeight - marginVertical])

        // Get the formID for the EPA and the corresponding contextual variable map
        const formID = residentEPAData.length > 0 ? residentEPAData[0].formID : '',
            contextual_variable_map = window.dynamicDashboard.contextual_variable_map[formID],
            isAnyFilterAvailable = contextual_variable_map && contextual_variable_map.length > 0,
            filterOptions = convertToFilterDict(contextual_variable_map, filterDict);



        const scoreData = residentEPAData.map((d, i) => {

            let highlight = false;
            let hasValidFilter = false;

            if (isFilterVisible) {
                const contexts = d.situationContextCollection;
                highlight = true;
                for (const filter of Object.keys(filterDict)) {
                    if (filter && filterDict[filter] && filterDict[filter].length > 0) {
                        hasValidFilter = true;
                        let relaventContext = _.find(contexts, (d) => d.item_text == filter);

                        if (relaventContext && relaventContext.text) {
                            highlight = highlight && (filterDict[filter].indexOf(relaventContext.text) > -1);
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

        const trackTrailPositions = _.map(scoreScale, (d, i) => {
            return {
                x: marginHorizontal + 20,
                dx: width - (2 * marginHorizontal) - 20,
                y: yScale(i + 1)
            }
        });

        const legends = _.map(scoreScale, (d, i) => {
            return {
                x: marginHorizontal,
                y: yScale(i + 1),
                labelID: i + 1,
                label: d
            }
        });

        const epaIDClass = 'epa-' + epaSource.split('.').join('-');

        return (
            <div className='text-xs-center'>
                {/* widthly reduced slightly by 10px to facilitate extra gap at the last */}
                <div style={{ width: widthPartition - 10 }} className='inner-cell epa-title-cell'>
                    <span className='inner-offset-label'>
                        {NumberToEPAText(epaSource) + " - " + epaSourceMap[innerKey].subRoot[epaSource]}
                    </span>
                </div>
                <div style={{ width: widthPartition }} className='inner-cell observation-cell'>
                    <BulletChart
                        widthPartition={widthPartition}
                        bulletInnerWidth={bulletInnerWidth}
                        secondMeasure={secondMeasure}
                        firstMeasure={firstMeasure} />

                    <div className='card-container'>
                        {isEPAComplete && (maxObservation != 0) ?
                            <div className='graph-card first-card'>
                                <span className="fa fa-check-circle completed-check"></span>
                            </div> :
                            <div className='graph-card first-card'>
                                {(maxObservation != 0) && <span className='card-text'>{remainingCount}</span>}
                                {(maxObservation != 0) && <span className='card-title remaining-title'>TO GO</span>}
                            </div>}
                        <div className='graph-card'>
                            <span className='card-text'>{recordedCount}</span>
                            <span className='card-title recorded-title'>OBSERVED</span>
                        </div>
                        <div className='graph-card'>
                            <span className='card-text'>{maxObservation == 0 ? 'N/A' : maxObservation}</span>
                            <span className='card-title required-title'>REQUIRED</span>
                        </div>
                        <div className='graph-card '>
                            <span className='card-text'>{maxObservation == 0 ? 'N/A' : achievedCount}</span>
                            <span className='card-title achieved-title'>ACHIEVED</span>
                        </div>
                    </div>

                </div>
                <div style={{ width: smallScreen ? widthPartition : widthPartition * 2 }}
                    className={'inner-cell score-cell' + ' wrapper-' + epaIDClass}>
                    <LineChart
                        trackTrailPositions={trackTrailPositions}
                        legends={legends}
                        width={width}
                        data={scoreData}
                        epaSource={epaSource}
                        smallScreen={smallScreen}
                        innerHeight={innerHeight}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut} />
                    {!smallScreen &&
                        <span data-for={'epa-buttontip-' + epaIDClass} data-tip={infoTooltipReference.residentMetrics.showEPATable}
                            className={"table-icon fa fa-custom fa-book " + epaIDClass + (isTableVisible ? ' open-table' : ' ')} onClick={onTableExpandClick}>
                        </span>
                    }
                    {!smallScreen && isAnyFilterAvailable &&
                        <span data-for={'epa-buttontip-' + epaIDClass} data-tip={infoTooltipReference.residentMetrics.showEPAFilter}
                            className={"fa fa-custom filter-icon fa-sliders " + epaIDClass + (isFilterVisible ? ' open-filter' : ' ')} onClick={onFilterExpandClick}>
                        </span>
                    }
                    {!smallScreen &&
                        <span data-for={'epa-buttontip-' + epaIDClass} data-tip={infoTooltipReference.residentMetrics.showObjectiveBreakdown}
                            id={'info-' + epaIDClass} className={"fa fa-custom info-icon fa-info-circle " + epaIDClass} onClick={onInfoClick}>
                        </span>
                    }
                    <ReactTooltip id={'epa-buttontip-' + epaIDClass} delayShow={500} className='custom-react-tooltip' />
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