import React, { Component } from 'react';
import { Radar } from 'react-chartjs';
import templateEpaSourceMapOriginal from '../../utils/epaSourceMap';
let templateEpaSourceMap = _.cloneDeep(templateEpaSourceMapOriginal);
let EPAList = [];

_.map(templateEpaSourceMap, (epaSource, key) => {
    _.map(epaSource.subRoot, (epa, epaKey) => {
        if (epa.indexOf('(SA)') > -1) {
            delete templateEpaSourceMap[key].subRoot[epaKey];
            delete templateEpaSourceMap[key].maxObservation[epaKey];
        }
        else {
            EPAList.push(epaKey);
        }
    })
    epaSource.maxRequired = _.reduce(epaSource.maxObservation, (acc, d) => (acc + d), 0);
});



export default class EPACompletionRate extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        const { allRecords, width } = this.props;

        // filter and remove non SA epas
        let subFilteredRecords = _.filter(allRecords, (d) => (EPAList.indexOf(d.epa) > -1));

        // group all the records by their rotation tag
        let groupedRecords = _.groupBy(subFilteredRecords, (d) => d.epa);
        //  group by EPA PHASE
        let phaseGroupedRecords = _.groupBy(subFilteredRecords, (d) => d.epa.split(".")[0]);

        // Count records for each group and normalize by epa MAX observation count for that group
        let dataList = _.map(groupedRecords, (group, groupKey) => {

            let epaMajorKey = groupKey.split(".")[0];
            //  maximum required observations for the EPA
            const maxEPARequired = templateEpaSourceMap[epaMajorKey].maxObservation[groupKey];
            // maximum required observations for the entire PHASE to which the EPA belongs
            const maxEPAPhaseRequired = templateEpaSourceMap[epaMajorKey].maxRequired;
            // find the maximum required ratio 
            const maxRequiredRatio = maxEPARequired / maxEPAPhaseRequired;

            // current records calucation
            const currentEPAcount = group.length;
            const currentPHASECount = phaseGroupedRecords[epaMajorKey].length;
            const currentRatio = currentEPAcount / currentPHASECount;

            let value = Math.ceil((currentRatio / maxRequiredRatio) * 100);

            if (value > 100) {
                value = 100;
            }

            return { label: groupKey, value };
        });

        // sorted datalist
        dataList.sort((a, b) => {
            const aParts = a.label.split("."), bParts = b.label.split(".");
            if (aParts[0] == bParts[0]) {
                return aParts[1] - bParts[1];
            }
            else {
                return aParts[0] - bParts[0];
            }
        });

        let lineData = {
            labels: _.map(dataList, (d) => d.label),
            datasets: [{
                label: "Rotations",
                fillColor: "rgba(255,141,115,0.2)",
                strokeColor: "rgba(255,141,115,1)",
                pointColor: "rgba(255,141,115,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointRadius: 5,
                pointHighlightStroke: "rgba(255,141,115,1)",
                data: _.map(dataList, (d) => d.value)
            }]
        }

        var radarOptions = {
            angleLineWidth: 0.5,
            pointLabelFontSize: 15,
            scaleOverride: true,
            scaleBeginAtZero: true,
            scaleSteps: 10,
            scaleStepWidth: 10,
            scaleStartValue: 0,
            customTooltips: (tooltip) => { customToolTip(tooltip, 'chartjs-tooltip-rate-under') }
        };

        return (
            <div className='col-sm-6 col-xs-12  epa-specific'>
                <div className='m-a program-vis-box row'>
                    <h3 className='text-left m-b'>EPA Completion Distribution to Identify Under Performing EPAs</h3>
                    <p className='text-left text-warn'>* over performing EPAs are capped at 100 and this chart is independent of Resident Phase</p>
                    <div className='col-xs-12'>
                        {lineData.labels.length > 0 ?
                            <Radar
                                options={radarOptions}
                                data={lineData}
                                width={width} height={350}
                                redraw={true} /> :
                            <h3 className='error-code text-left m-b'>No Records</h3>
                        }
                        <div className='chart-tooltip' id="chartjs-tooltip-rate-under"></div>
                    </div>
                </div>
            </div>)
    }
}



// This is a custom tool that uses bootstrap and works in hand with ChartJS standards
// could be replace in future with custom tooltip
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

    let epaId = tooltip.text.split(":")[0],
        epaRootId = epaId.split(".")[0];

    // Set caret Position
    tooltipEl.removeClass('above below');
    tooltipEl.addClass(tooltip.yAlign);
    // Set Text
    tooltipEl.html(tooltip.text + ", " + templateEpaSourceMap[epaRootId].subRoot[epaId]);
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