import React from 'react';
import { Bar } from 'react-chartjs';

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

    const data = {
        labels: epaPercentageList.map(d => d.epa),
        datasets: [
            {
                label: "Default",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                highlightFill: "rgba(220,220,220,.9)",
                highlightStroke: "rgba(220,220,220,.9)",
                data: epaPercentageList.map(d => Math.round(d.percentageOffset * 100))
            }
        ]
    };

    const options = {
        scaleShowGridLines: true,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: false,
        scaleGridLineColor: "rgba(86, 77, 77, 0.3)",
        scaleGridLineWidth: 2,
        scaleBeginAtZero: true,
        customTooltips: (tooltip) => { customToolTip(tooltip, 'chartjs-tooltip-completion-distribution') }
    }

    return (
        <div className='col-xs-12 reel-in-left epa-specific'>
            <div className='m-a program-vis-box row'>
                <h3 className='text-left m-b'>EPA Completion Distribution</h3>
                <div className='col-xs-12'>
                    {data.labels.length > 0 ? <Bar
                        options={options}
                        data={data}
                        width={width} height={350}
                        redraw={true} /> :
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