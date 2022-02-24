import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ReactSelect from 'react-select';

const ScheduleClassifications = [
    { 'value': 'rotationTag', 'label': 'Rotation Name' },
    { 'value': 'serviceTag', 'label': 'Service' },
    { 'value': 'siteTag', 'label': 'Site' }
];

export default class EPAOverallbyRotation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'removedGroups': ['No Schedule Available'],
            'classificationCriteria': { 'value': 'rotationTag', 'label': 'Rotation Name' }
        }
    }

    componentDidUpdate(prevProps) {
        // If a new set of schedule groups come in default to everything selected except no schedule
        if (!_.isEqual(this.props.scheduleGroups, prevProps.scheduleGroups)) {
            this.setState({ removedGroups: ['No Schedule Available'] });
        }
    }

    onClassificationSelect = (option) => { this.setState({ 'classificationCriteria': option }) };

    onActiveGroupsSelect = (options) => {
        // create a list of available schedule group filters 
        let scheduleGroupOptions = _.map(this.props.scheduleGroups, e => ({ 'value': e, 'label': e }));
        let activeOptions = _.map(options, e => e.value);
        let removedGroups = _.map(_.filter(scheduleGroupOptions, (g) => activeOptions.indexOf(g.value) == -1), f => f.value);
        this.setState({ removedGroups });
    };

    render() {
        const { printModeON,
            allRecords, normalizeByCount = false, width } = this.props,
            { classificationCriteria, removedGroups } = this.state;

        let recordsFilteredByGroup = _.filter(allRecords, (d) => removedGroups.indexOf(d.scheduleTag) == -1);

        let programData = _.map(_.groupBy(recordsFilteredByGroup, (d) => d[classificationCriteria.value]), (group, groupName) => ({ 'Rotation Name': groupName, 'EPAs completed': group.length }));
        // sort by value
        programData = _.reverse(_.sortBy(programData, (d) => d['EPAs completed']));


        let variableHeight = programData.length * 30;
        // clamp to a minimum of 300 pixels
        variableHeight = variableHeight < 300 ? 300 : variableHeight;

        // The first select options should be styled to overlap the select container under it
        const overLappingStyle = {
            base: styles => ({ ...styles, zIndex: 999 }),
            option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' })
        };

        const underlyingStyle = {
            base: styles => ({ ...styles, zIndex: 100 }),
            option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' })
        };


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
                        styles={underlyingStyle}
                        onChange={this.onClassificationSelect} />
                </div>
            </div>
            {recordsFilteredByGroup.length > 0 ? <div className='chart-container'>
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
                    <Bar dataKey={"EPAs completed"} fill="#43b98e" />
                </BarChart>
            </div> :
                <h2 className='text-primary text-center m-t-lg' style={{ width }}>No Data available for the selected criteria.</h2>}

        </div>)
    };
};
