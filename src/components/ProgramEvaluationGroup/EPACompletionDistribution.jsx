import React from 'react';
import { Bar } from 'react-chartjs';
import * as d3 from 'd3';

export default (props) => {

    const { programInfo: { epaSourceMap }, records, width } = props;

    const epaObservationMap = {};

    // process base source map
    const nonSAEPAs = Object.values(epaSourceMap)
        .map(d => Object.entries(d.maxObservation).map(dd => ({ epa: dd[0], maxObservation: dd[1] })))
        .flat()
        .filter(d => epaSourceMap[d.epa.split('.')[0]].subRoot[d.epa].substring(0, 4) !== '(SA)');

    nonSAEPAs
        .forEach(d => epaObservationMap[d.epa] = { max: d.maxObservation, total: 0 });

    // process records 
    // for some programs such as anesthesia there are records with EPA numbers 
    // which dont exist in the original source map
    // these are selectively checked and filtered out by using the original source map in program info
    records
        .filter(d => (_.findIndex(nonSAEPAs, (inner_d) => inner_d.epa == d.epa) > -1))
        .forEach(d => {
            epaObservationMap[d.epa].total++;
        });

    const epaGroupObservationMap = Object.entries(epaObservationMap)
        .reduce((map, currentEntry) => {
            const epaGroup = currentEntry[0].split('.')[0];
            if (!map[epaGroup]) {
                map[epaGroup] = { max: 0, total: 0 };
            }
            map[epaGroup].max += currentEntry[1].max;
            map[epaGroup].total += currentEntry[1].total;
            return map;
        }, {});

    const epaPercentageList = Object.entries(epaObservationMap).map(d => {
        const result = {
            epa: d[0],
            percentageMax: d[1].max / epaGroupObservationMap[d[0].split('.')[0]].max,
            percentageTotal: d[1].total / epaGroupObservationMap[d[0].split('.')[0]].total,
        };
        result.percentageOffset = result.percentageTotal / result.percentageMax;

        // sometimes some EPAs might not even have started and so their percentage remains at 0
        if (isNaN(result.percentageOffset)) {
            result.percentageOffset = 0;
        }
        return result;
    });

    const height = 350, margin = 10, Xoffset = 50, Yoffset = 30;

    // The size of the bar is 0.75% of the item size and rest is left as a gap
    const itemSize = epaPercentageList.length > 0 ? ((width - margin) / epaPercentageList.length) : 2;
    // The last bar would go beyond the available width by 75%
    //  so that width is removed from the scale 

    let minPercentageOffset = d3.min(epaPercentageList.map(d => +d.percentageOffset));
    minPercentageOffset = Math.floor(minPercentageOffset * 10 / 5) / 10 * 5;
    let maxPercentageOffset = d3.max(epaPercentageList.map(d => +d.percentageOffset));
    maxPercentageOffset = Math.ceil(maxPercentageOffset * 10 / 5) / 10 * 5;
    if (maxPercentageOffset > 10) {
        maxPercentageOffset = 10;
    }

    // create the X and Y scales and modify them based on the track type
    const scaleX = d3.scaleLinear().range([Xoffset, width - margin - 0.75 * itemSize]).domain([0, epaPercentageList.length - 1]);
    let scaleY = d3.scaleLinear().range([height - margin - Yoffset, margin]).domain([minPercentageOffset, maxPercentageOffset]).clamp(true);

    const xOne = scaleY(1);
    // create bars
    const bars = epaPercentageList.map((d, i) => (
        <rect
            x={scaleX(i)}
            y={scaleY(d.percentageOffset) <= xOne ? scaleY(d.percentageOffset) : xOne}
            height={scaleY(d.percentageOffset) <= xOne ? xOne - scaleY(d.percentageOffset) : scaleY(d.percentageOffset) - xOne}
            fill={(() => {
                switch (+d.epa.split('.')[0]) {
                    case 1:
                        return '#7FFFD4';
                    case 2:
                        return '#FFE4C4';
                    case 3:
                        return '#008B8B';
                    case 4:
                        return '#8FBC8F';
                    default:
                        return '#DC143C';
                }
            })()}
            width={itemSize - (0.25 * itemSize)}
            stroke={d.percentageOffset > maxPercentageOffset ? 'white' : 'transparent'}
            key={d.epa}>
            <title>{
                (d.percentageOffset * 100).toFixed() + '%' +
                ' - ' + d.epa +
                ' - ' + epaSourceMap[d.epa.split('.')[0]].topic +
                ' - ' + epaSourceMap[d.epa.split('.')[0]].subRoot[d.epa]
            }</title>
        </rect>
    ));

    // create the vertical tick lines 
    const axisTickLines = _.range(minPercentageOffset, maxPercentageOffset + .5, .5).map(d => <line
        x1={Xoffset}
        y1={scaleY(d)}
        x2={width - margin}
        y2={scaleY(d)}
        stroke={d === 1 ? 'white' : '#a9a1a1'}
        opacity={d === 1 ? 1 : .5}
        key={d}
    ></line>);

    const axisTexts = _.range(minPercentageOffset, maxPercentageOffset + .5, .5).map(d => <text
        x={5}
        y={scaleY(d) + 5}
        fontWeight='bold'
        fill={d === 1 ? 'white' : '#a9a1a1'}
        key={d}
    >{(d * 100).toFixed() + '%'}</text>);

    const epaTexts = epaPercentageList.map((d, i) => <text
        x={scaleX(i) + (itemSize - (0.25 * itemSize)) / 2}
        y={height - margin - Yoffset / 2}
        fontWeight='bold'
        fill='#a9a1a1'
        key={d.epa}
        style={{
            textAnchor: 'middle'
        }}
    >{d.epa}</text>);

    return (
        <div className='container-fluid text-center'>
            <div className='m-t m-b program-vis-box row'>
                <h3 className='text-left m-b'>EPA Completion Distribution</h3>
                <div className='col-xs-12'>
                    {epaPercentageList.length > 0 ?
                        <svg width={width} height={350}>
                            <g>{axisTickLines}</g>
                            <g>{axisTexts}</g>
                            <g>{epaTexts}</g>
                            <g>{bars}</g>
                        </svg>
                        :
                        <h3 className='error-code text-left m-b'>No Records</h3>
                    }
                    <div className='chart-tooltip' id="chartjs-tooltip-completion-distribution"></div>
                </div>
            </div>
        </div>
    );
}

// This is a custom tool that uses bootstrap and works in hand with ChartJS standards
// could be replaced in future with custom tooltip
function customToolTip(tooltip, elementId) {

    // Tooltip Element
    let tooltipEl = $('#' + elementId);
    // Hide if no tooltip
    if (!tooltip) {
        tooltipEl.css({
            opacity: 0
        });
        return;
    }
    // Set caret Position
    tooltipEl.removeClass('above below');
    tooltipEl.addClass(tooltip.yAlign);
    // Set Text
    tooltipEl.html(tooltip.text + "%");
    // Find Y Location on page
    var top;
    if (tooltip.yAlign == 'above') {
        top = tooltip.y - tooltip.caretHeight - tooltip.caretPadding;
    } else {
        top = tooltip.y + tooltip.caretHeight + tooltip.caretPadding;
    }
    // Display, position, and set styles for font
    tooltipEl.css({
        opacity: 1,
        left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
        top: tooltip.chart.canvas.offsetTop + top + 'px',
        fontFamily: tooltip.fontFamily,
        fontSize: tooltip.fontSize,
        fontStyle: tooltip.fontStyle,
    });

}