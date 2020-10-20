import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
import ReactSelect from 'react-select';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';

export default class RotationSpecificEPA extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRotation: { 'label': '', 'option': '' }
        };
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onSelectChange(selectedRotation) {
        this.setState({ selectedRotation });
    }

    render() {

        const { filteredRecords, width, rotationList, epaSourceMap } = this.props,
            { selectedRotation } = this.state,
            modifiedRotationList = _.map(rotationList, (d) => ({ 'label': d, 'value': d }));

        let templateEpaSourceMap = _.cloneDeep(epaSourceMap);
        let EPAList = [];

        // remove special assessment EPAs if any
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
        });


        // filter by tag and also remove non SA epas
        let subFilteredRecords = _.filter(filteredRecords, (d) => ((d.rotationTag == selectedRotation.label) && (EPAList.indexOf(d.epa) > -1)));

        // group all the records by their rotation tag
        let groupedRecords = _.groupBy(subFilteredRecords, (d) => d.epa);
        // Count records for each group and normalize by epa MAX observation count for that group
        let dataList = _.map(groupedRecords, (group, groupKey) => {
            return { label: groupKey, value: group.length };
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
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                pointColor: "#43b98e",
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(dataList, (d) => d.value)
            }]
        }

        let lineOptions = {
            scaleBeginAtZero: true,
            customTooltips: (tooltip) => { customToolTip(tooltip, 'chartjs-tooltip-rotation-specific', templateEpaSourceMap) }
        };

        return (
            <div className='col-sm-6 col-xs-12  epa-specific reel-in-left'>
                <div className='m-a program-vis-box row'>
                    <h3 className='text-left m-b'>
                        Rotation Specific EPA Distribution
                        <InfoTip info={infoTooltipReference.programEvaluation.rotationSpecificEPADistribution} />
                    </h3>
                    <div className="epa-select m-a text-left">
                        <span className='inner-span'>Select Rotation</span>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={selectedRotation}
                                options={modifiedRotationList}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectChange} />
                        </div>
                    </div>

                    <div className='col-xs-12'>
                        {lineData.labels.length > 0 ? <Bar
                            options={lineOptions}
                            data={lineData}
                            width={width} height={350}
                            redraw={true} /> :
                            <h3 className='error-code text-left m-b'>No Records</h3>
                        }
                        <div className='chart-tooltip' id="chartjs-tooltip-rotation-specific"></div>
                    </div>
                </div>
            </div>)


    }
}

// This is a custom tool that uses bootstrap and works in hand with ChartJS standards
// could be replaced in future with custom tooltip
function customToolTip(tooltip, elementId, templateEpaSourceMap) {

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