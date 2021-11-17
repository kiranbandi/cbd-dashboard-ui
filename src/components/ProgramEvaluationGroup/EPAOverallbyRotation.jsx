import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ReactSelect from 'react-select';

const ScheduleClassifications = [{ 'value': 'scheduleTag', 'label': 'Schedule Group' },
{ 'value': 'serviceTag', 'label': 'Service' },
{ 'value': 'siteTag', 'label': 'Site' },
{ 'value': 'rotationTag', 'label': 'Rotation Name' }];

export default class EPAOverallbyRotation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'classificationCriteria': { 'value': 'scheduleTag', 'label': 'Schedule Group' }
        }
    }

    onClassificationSelect = (option) => { this.setState({ 'classificationCriteria': option }) };

    render() {
        const { printModeON,
            allRecords, normalizeByCount = false, width } = this.props,
            { classificationCriteria } = this.state;

        let programData = _.map(_.groupBy(allRecords, (d) => d[classificationCriteria.value]), (group, groupName) => ({ 'Rotation Name': groupName, 'EPAs completed in Rotation': group.length }));
        // sort by value
        programData = _.reverse(_.sortBy(programData, (d) => d['EPAs completed in Rotation']));

        let variableHeight = programData.length * 30;
        // clamp to a minimum of 300 pixels
        variableHeight = variableHeight < 300 ? 300 : variableHeight;

        return (<div className={('program-vis-box m-b ') + (printModeON ? ' printable-content' : '')}>
            <div className='text-left'>
                <h3 className='text-left'>
                    {normalizeByCount ? 'EPAs per Rotation' : 'EPA Rotation Distribution'}
                    <i data-for={'rotationDist'} data-tip={infoTooltipReference.programEvaluation.rotationDist} className="fa fa-info-circle instant-tooltip-trigger"></i>
                    <ReactTooltip id={'rotationDist'} className='custom-react-tooltip' />
                </h3>
                <div className='react-select-root'>
                    <label className='filter-label'> Rotation Classification
                        <i data-for='rotationClassification' data-tip={infoTooltipReference.programEvaluation.rotationClassification} className="fa fa-info-circle instant-tooltip-trigger"></i>
                        <ReactTooltip id={'rotationClassification'} className='custom-react-tooltip' />
                    </label>
                    <ReactSelect
                        placeholder='Select Rotation Classification...'
                        value={classificationCriteria}
                        options={ScheduleClassifications}
                        styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                        onChange={this.onClassificationSelect} />
                </div>
            </div>
            <div className='chart-container'>
                <BarChart width={width} height={variableHeight}
                    data={programData}
                    layout="vertical"
                    barGap={0}
                    barCategoryGap={'20%'}
                    margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                    <XAxis style={{ fill: 'black', 'fontWeight': 'bolder' }}
                        type="number" />
                    <YAxis style={{ 'fontSize': '12px' }}
                        width={250} tickSize={0} tickMargin={5}
                        type="category" axisLine={false} dataKey="Rotation Name" />
                    <Tooltip labelStyle={{ 'color': 'black' }}
                        wrapperStyle={{ 'fontWeight': 'bold' }} />
                    <Bar dataKey="EPAs completed in Rotation" fill="#43b98e" />
                </BarChart>
            </div>
        </div>)
    };
};
