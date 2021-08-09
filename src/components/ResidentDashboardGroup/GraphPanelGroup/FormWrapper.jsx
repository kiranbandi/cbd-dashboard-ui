import React, { Component } from 'react';
import LineChart from './LineChart';
import { scaleLinear } from 'd3';
import SlideInTable from './SlideInTable';
import SlideInFilter from './SlideInFilter';
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

        let { epaSource, widthPartition, smallScreen, epaSourceMap, formID, openFilterID, openTableID,
            residentEPAData, formTitle = '', onMouseOut, onMouseOver, onInfoClick,
            onTableExpandClick, onFilterExpandClick } = this.props;

        // margin of 10px on either side reduces the available width by 20
        let marginVertical = 20, marginHorizontal = 20,
            height = 200, innerHeight = height - 20,
            width = (smallScreen ? widthPartition : widthPartition * 2) - 20;

        // create a unique EPA ID class based on epa source and form
        const epaIDClass = 'epa-' + formID + '-' + epaSource.split('.').join('-'),
            isFilterVisible = openFilterID == epaIDClass.slice(4),
            isTableVisible = openTableID == epaIDClass.slice(4);

        // Get the record rating scale
        let scoreScale = residentEPAData.length > 0 ? residentEPAData[0].scale : oScoreReference;

        const xScale = scaleLinear().domain([0, residentEPAData.length - 1]).range([marginHorizontal + 20, width - marginHorizontal])
        const yScale = scaleLinear().domain([scoreScale.length, 1]).range([marginVertical, innerHeight - marginVertical])

        // map the form ID for the corresponding contextual variable map
        const contextual_variable_map = window.dynamicDashboard.contextual_variable_map[formID],
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

        return (
            <div className={'form-wrapper ' + 'wrapper-' + epaIDClass}>
                <LineChart
                    trackTrailPositions={trackTrailPositions}
                    legends={legends}
                    width={width}
                    data={scoreData}
                    epaIDClass={epaIDClass}
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
                {formTitle && <h5 className='chart-form-title'>{formTitle}</h5>}
                <ReactTooltip id={'epa-buttontip-' + epaIDClass} delayShow={500} className='custom-react-tooltip' />
                {!smallScreen && isTableVisible &&
                    <SlideInTable
                        data={residentEPAData}
                        width={widthPartition} />}
                {!smallScreen && isFilterVisible &&
                    <SlideInFilter
                        data={scoreData}
                        width={widthPartition}
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