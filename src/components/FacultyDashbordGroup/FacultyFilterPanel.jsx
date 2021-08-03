import React, { Component } from 'react';
import ReactSelect from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class FacultyFilterPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { facultyList, currentFaculty, onFacultySelect, sliderValue = 5, onSliderChange } = this.props;

        // Process faculty names so they match the react select format
        const facultyOptions = _.map(facultyList, (d) => ({ 'label': d.label, 'value': d.value }));
        const currentFacultyValue = _.find(facultyOptions, (d) => d.value == currentFaculty) || null;

        return (
            <div className='filter-panel faculty-filter'>
                <div className='text-xs-left advanced-filter-box normative-filter-box'>
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
                    <div className='slider-container'>
                        <label className='filter-label'>Filter out Faculty with &lt; </label>
                        <h2>{sliderValue}</h2>
                        <label className='filter-label'>records</label>
                        <Slider min={0} max={25} step={1} defaultValue={sliderValue} onAfterChange={onSliderChange} />
                    </div>
                </div>
            </div>)
    }

}

