/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import ReactSelect from 'react-select';
import { STAGES_LIST } from '../../utils/programInfo';
import {
    setResidentFilter,
    setResidentData, setNarrativeData
} from '../../redux/actions/actions';

const MODDED_PHASE_LIST = STAGES_LIST.map((phase) => phase.split('-').join(" ").toUpperCase());

class UCFilterPanel extends Component {

    constructor(props) {
        super(props);
        this.onAllDataToggle = this.onAllDataToggle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEPAToggle = this.onEPAToggle.bind(this);
        this.onVisbilityToggle = this.onVisbilityToggle.bind(this);
        this.onFilterToggleClick = this.onFilterToggleClick.bind(this);
        this.onResidentNameChange = this.onResidentNameChange.bind(this);
        this.state = {
            showUncommencedEPA: true,
            openOnlyCurrentPhase: true,
            isFilterOpen: false
        };
    }

    onResidentNameChange(option) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.username = option.value;
        actions.setResidentFilter({ ...residentFilter });
    }

    onSubmit() {
        const { showUncommencedEPA, openOnlyCurrentPhase } = this.state;
        this.props.selectResident('', showUncommencedEPA, openOnlyCurrentPhase);
    }

    onAllDataToggle(event) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.isAllData = !residentFilter.isAllData;
        actions.setResidentFilter({ ...residentFilter });
    }

    onFilterToggleClick(event) {
        this.setState({ isFilterOpen: !this.state.isFilterOpen });
    }

    onEPAToggle(event) {
        this.setState({ showUncommencedEPA: !this.state.showUncommencedEPA });
    }

    onVisbilityToggle(event) {
        this.setState({ openOnlyCurrentPhase: !this.state.openOnlyCurrentPhase });
    }

    render() {

        const { residentList = [], residentFilter = {}, } = this.props,
            {
                isAllData = false,
                username = '',
                startDate = moment().format('MM/DD/YYYY'),
                endDate = moment().format('MM/DD/YYYY')
            } = residentFilter,
            { isFilterOpen } = this.state;

        //  first convert the array into the format required by react-select 
        let modifiedResidentList = _.map(residentList, (d) => {
            return {
                label: d.fullname,
                value: d.username,
                currentPhase: d.currentPhase.split("-").join(" ").toUpperCase()
            };
        })
        // then group the array based on current phase of resident
        let groupedResidentList = _.groupBy(modifiedResidentList, (d) => d.currentPhase);

        //  then remap the array without the phase info in it 
        // and also internally sort the elements
        // so first the groups are sorted based on the order in which the resident goes 
        // through them and then the residents in each group are sorted alpabetically
        groupedResidentList = _.map(groupedResidentList, (options, label) => {
            return { label, options: options.sort((prev, cur) => prev.label.localeCompare(cur.label)) }
        }).sort((a, b) => MODDED_PHASE_LIST.indexOf(a.label) - MODDED_PHASE_LIST.indexOf(b.label));

        const currentSelectValue = _.find(modifiedResidentList, (d) => d.value == username) || null;

        return (
            <div className='filter-panel m-t center-align upload-custom'>

                <div className='text-xs-center text-sm-left root-box'>

                    <div className='react-select-root-filter'>
                        <ReactSelect
                            placeholder='Select Resident...'
                            isSearchable={true}
                            value={currentSelectValue}
                            options={groupedResidentList}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                            onChange={this.onResidentNameChange} />

                    </div>

                    <div className='filter-button-container'>
                        <button className={'btn btn-primary-outline ' + (isFilterOpen ? " active-button" : "not-active")} onClick={this.onFilterToggleClick} ><span className="icon icon-funnel"></span></button>
                    </div>

                    <div className='text-xs-left button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>FILTER</button>
                    </div>
                </div>

                {/* let the elements be hidden by css style instead of react , to prevent dead elements value problem when submitting */}

                <div className={'text-xs-left advanced-filter-box ' + (isFilterOpen ? 'show-filter' : 'hide-filter')}>

                    <div>
                        <div className="checkbox custom-control text-center custom-checkbox">
                            <label className='filter-label'>
                                {"Filter Records by Date"}
                                <input id='filter-isAllData' type="checkbox" checked={!isAllData} onChange={this.onAllDataToggle} />
                                <span className="custom-control-indicator"></span>
                            </label>
                        </div>
                        <div className='date-box'>
                            <label className='filter-label'>Period</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='filter-startDate-resident' defaultValue={startDate} disabled={isAllData} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                        <span className='inner-splice'>-</span>
                        <div className='date-box trailing'>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='filter-endDate-resident' disabled={isAllData} defaultValue={endDate} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                    </div>
                    <div className='filter-row-2'>
                        <div className="checkbox custom-control text-center custom-checkbox">
                            <label className='filter-label'>
                                {"Hide Uncommenced EPAs"}
                                <input id='filter-hide-epa' type="checkbox" checked={!this.state.showUncommencedEPA} onChange={this.onEPAToggle} />
                                <span className="custom-control-indicator"></span>
                            </label>
                        </div>
                        <div className="checkbox custom-control text-center custom-checkbox">
                            <label className='filter-label'>
                                {"Open All Training Stages"}
                                <input id='filter-hide-phases' type="checkbox" checked={!this.state.openOnlyCurrentPhase} onChange={this.onVisbilityToggle} />
                                <span className="custom-control-indicator"></span>
                            </label>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setResidentFilter,
            setResidentData,
            setNarrativeData
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UCFilterPanel);
