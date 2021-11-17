import React, { Component } from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs';
import ReactTooltip from 'react-tooltip';
import infoTooltipReference from '../../utils/infoTooltipReference';

export default class EPAOverallbyRotation extends Component {


    render() {
        const { residentList, printModeON, academicYear,
            allRecords, normalizeByCount = false, width } = this.props;

        let programData = _.map(_.groupBy(allRecords, (d) => d.rotationTag), (group, groupName) => ({ 'label': groupName, 'value': group.length }));
        // sort by value
        programData = _.reverse(_.sortBy(programData, (d) => d.value));

        let lineData = {
            labels: _.map(programData, (d) => d.label),
            datasets: [{
                label: "Rotations",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                pointColor: "#43b98e",
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(programData, (d) => d.value)
            }]
        }

        return (<div className={('program-vis-box m-b ') + (printModeON ? ' printable-content' : '')}>
            <div>
                <h3 className='text-left m-a-0 pull-left'>
                    {normalizeByCount ? 'EPAs per Rotation' : 'EPA Rotation Distribution'}
                    <i data-for={'rotationDist'} data-tip={infoTooltipReference.programEvaluation.rotationDist} className="fa fa-info-circle instant-tooltip-trigger"></i>
                    <ReactTooltip id={'rotationDist'} className='custom-react-tooltip' />
                </h3>
            </div>
            <div className='p-t'>
                <Bar
                    options={{ scaleBeginAtZero: true }}
                    data={lineData}
                    width={width - 50} height={415}
                    redraw={true} />
            </div>
        </div>)
    };
};
