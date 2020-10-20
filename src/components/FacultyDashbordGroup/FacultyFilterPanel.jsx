import React, { Component } from 'react';
import moment from 'moment';
import ReactSelect from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { InfoTip } from '../';

const defaultDateValue = moment().format('MM/DD/YYYY');

export default class FacultyFilterPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { rotationList, facultyList, currentRotation,
            currentFaculty, onRotationSelect, onFacultySelect,
            sliderValue = 5, onSliderChange,
            onSubmit, onCheckboxChange, dateFilterActive } = this.props;

        // Process rotations so they match the react select format
        const rotationOptions = _.map(rotationList, (d) => ({ 'label': d.label, 'value': d.label }));
        const currentRotationValue = _.find(rotationOptions, (d) => d.label == currentRotation) || null;

        // Process faculty names so they match the react select format
        const facultyOptions = _.map(facultyList, (d) => ({ 'label': d.label, 'value': d.label }));
        const currentFacultyValue = _.find(facultyOptions, (d) => d.label == currentFaculty) || null;


        return (
            <div className='filter-panel faculty-filter'>
                <div className='text-xs-left advanced-filter-box normative-filter-box'>

                    <div className='react-select-root'>
                        <label className='filter-label'>Rotation</label>
                        <ReactSelect
                            placeholder='Select Rotation...'
                            isSearchable={true}
                            value={currentRotationValue}
                            options={rotationOptions}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                            onChange={onRotationSelect} />
                    </div>

                    <div className='react-select-root'>
                        <label className='filter-label'>Faculty</label>
                        <ReactSelect
                            placeholder='Select Faculty...'
                            isSearchable={true}
                            value={currentFacultyValue}
                            options={facultyOptions}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                            onChange={onFacultySelect} />
                    </div>


                    <div className="checkbox custom-control text-center custom-checkbox">
                        <label className='filter-label'>
                            {"Filter by Date"}
                            <input id='filter-FCdateFilterActive' type="checkbox" checked={dateFilterActive} onChange={onCheckboxChange} />
                            <span className="custom-control-indicator"></span>
                        </label>
                    </div>

                    {dateFilterActive && <span>
                        <div className='date-box'>
                            <label className='filter-label'> Start Date</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='faculty-filter-startDate' defaultValue={defaultDateValue} disabled={!dateFilterActive} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                        <div className='date-box'>
                            <label className='filter-label'> End Date</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='faculty-filter-endDate' defaultValue={defaultDateValue} disabled={!dateFilterActive} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                    </span>}

                    <div className='text-xs-left button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={onSubmit} title={infoTooltipReference.facultyDevlopment.getRecords}>
                            GET RECORDS
                        </button>
                    </div>

                    <div className='slider-container'>
                        <label className='filter-label'>Filter out Faculty with &lt; </label>
                        <h2>{sliderValue}</h2>
                        <label className='filter-label'>records</label>
                        <InfoTip info={infoTooltipReference.facultyDevlopment.filterOutFacultyWithMinimumRecords} />
                        <Slider min={0} max={25} step={1} defaultValue={sliderValue} onAfterChange={onSliderChange} />
                    </div>
                </div>

            </div>)
    }

}

