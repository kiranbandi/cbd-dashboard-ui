import React, { Component } from 'react';
import { scaleLinear, interpolateRdYlGn } from 'd3';
import { NumberToEPAText } from "../../utils/convertEPA";
import shortid from 'shortid';

const customColorScaleList = ['#f46d43', '#fee08b', '#66bd63', '#d9ef8b'];

export default class EPACompletionChart extends Component {

    render() {

        const { epaSourceMap, epaPercentageList = [],
            height, width, printModeON } = this.props,

            margin = 10, Xoffset = 50, Yoffset = 30;

        // The size of the bar is 0.75% of the item size and rest is left as a gap
        const itemSize = epaPercentageList.length > 0 ? ((width - margin) / epaPercentageList.length) : 2;
        // The last bar would go beyond the available width by 75%
        //  so that width is removed from the scale 

        let minPercentageOffset = _.min(epaPercentageList.map(d => +d.percentageOffset));
        minPercentageOffset = Math.floor(minPercentageOffset * 10 / 5) / 10 * 5;
        let maxPercentageOffset = _.max(epaPercentageList.map(d => +d.percentageOffset));
        maxPercentageOffset = Math.min(Math.ceil(maxPercentageOffset * 10 / 5) / 10 * 5, 10);

        // create the X and Y scales and modify them based on the track type
        const scaleX = scaleLinear()
            .range([Xoffset, width - margin - 0.75 * itemSize])
            .domain([0, epaPercentageList.length - 1]),
            scaleY = scaleLinear()
                .range([height - margin - Yoffset, margin])
                .domain([minPercentageOffset, maxPercentageOffset]).clamp(true);

        // If the bar widths are small, then hide the axisTickLines
        const hideAxisTickLines = 0.75 * itemSize < 17;

        const xOne = scaleY(1);

        // Random ID generated to mount event trigger for tooltip
        // This is randomized so that the s-tooltip reattaches to 
        // new visual elements that are created if any during a rerender
        const tooltipAttachID = 'chart-bar-' + shortid();

        // create bars
        const bars = epaPercentageList.map((d, i) => (
            <rect
                className={tooltipAttachID}
                x={scaleX(i)}
                y={scaleY(d.percentageOffset) <= xOne ? scaleY(d.percentageOffset) : xOne}
                height={scaleY(d.percentageOffset) <= xOne ? xOne - scaleY(d.percentageOffset) : scaleY(d.percentageOffset) - xOne}
                fill={(() => {
                    if (d.percentageOffset < 0.25) { return customColorScaleList[0] }
                    else if (d.percentageOffset >= 0.25 && d.percentageOffset <= 0.75) { return customColorScaleList[1] }
                    else if (d.percentageOffset > 0.75 && d.percentageOffset <= 1.25) { return customColorScaleList[2] }
                    else { return customColorScaleList[3] }
                })()}
                width={0.75 * itemSize}
                stroke={d.percentageOffset > maxPercentageOffset ? 'white' : 'transparent'}
                key={d.epa}
                data-s-tooltip-text={
                    (d.percentageOffset * 100).toFixed() + '%' +
                    ' - ' + NumberToEPAText(d.epa) +
                    ' - ' + epaSourceMap[d.epa.split('.')[0]].topic +
                    ' - ' + epaSourceMap[d.epa.split('.')[0]].subRoot[d.epa]
                }
            ></rect>
        ));

        // Draw vertical lines between the different training phase groups
        // so group the list by phase and then draw a dotten line a little 
        // after the last element in each group

        const dividers = [];
        _.reduce(_.groupBy(epaPercentageList, (d) => d.epa.slice(0, 1)),
            (acc, group, groupIndex) => {

                dividers.push(<line
                    className='divider-line'
                    key={'divider-group-' + groupIndex}
                    stroke={'white'}
                    strokeWidth={3}
                    strokeDasharray={5}
                    y1={scaleY.range()[0]}
                    y2={scaleY.range()[1]}
                    x1={scaleX(acc)}
                    x2={scaleX(acc)}></line>);

                return acc + group.length;
            }, 0);


        // create the vertical tick lines 
        const axisTickLines = _.range(minPercentageOffset, maxPercentageOffset + .5, .5).map(d => <line
            x1={Xoffset}
            y1={scaleY(d)}
            x2={width - margin}
            y2={scaleY(d)}
            stroke={d === 1 ? (printModeON ? 'black' : 'white') : '#a9a1a1'}
            opacity={d === 1 ? 1 : .5}
            key={d}
        ></line>);

        const axisTexts = _.range(minPercentageOffset, maxPercentageOffset + .5, .5).map(d => <text
            x={5}
            y={scaleY(d) + 5}
            fontWeight='bold'
            fill={d === 1 ? (printModeON ? 'black' : 'white') : '#a9a1a1'}
            key={d}
        >{(d * 100).toFixed() + '%'}</text>);

        const epaTexts = epaPercentageList.map((d, i) => <text
            x={scaleX(i) + (itemSize - (0.25 * itemSize)) / 2}
            y={height - margin - Yoffset / 2}
            fill='#a9a1a1'
            key={d.epa}
            style={{ textAnchor: 'middle' }}>{NumberToEPAText(d.epa)}</text>);

        return (<div className='specific-program-chart'>
            <svg width={width} height={height}>
                <g>{axisTickLines}</g>
                <g>{axisTexts}</g>
                {/* hide EPA labels if the chart is too small  */}
                {!hideAxisTickLines && <g>{epaTexts}</g>}
                <g>{bars}</g>
                <g>{dividers}</g>
            </svg>

            <div className='color-legend-wrapper' style={{ width }}>
                <div className='inner-color-wrapper'>
                    {_.map(_.times(4), (d, colorIndex) => <span key={'color-' + colorIndex}
                        className='color-unit'
                        style={{ 'background': customColorScaleList[colorIndex] }}></span>)}
                </div>
                <div className='inner-label-wrapper'>
                    <span>0%-25% under represented</span>
                    <span>25%-75% relatively under represented</span>
                    <span>75%-125% ideal range</span>
                    <span> Over 125% over represented</span>
                </div>
            </div>

            <s-tooltip
                ref={el => el && el.forceUpdateAttachedElements()}
                follow-mouse
                orientation="top"
                border-width="1px"
                show-delay="0"
                style={{ fontFamily: 'inherit' }}
                attach-to={"." + tooltipAttachID}
            ></s-tooltip>
        </div >);
    };
}


