import React, { Component } from 'react';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import _ from 'lodash';
import Select from 'react-select';

export default class SlideInFilter extends Component {

    constructor(props) {
        super(props);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.createSelect = this.createSelect.bind(this);
    }

    onSelectChange(option, selectRef) {
        const { clinicalFilter, patientDemographicFilter } = this.props;
        if (selectRef.name == 'cp') {
            this.props.onHighlightChange(selectRef.action == 'clear' ? '' : option.value, patientDemographicFilter);
        }
        else {
            this.props.onHighlightChange(clinicalFilter, selectRef.action == 'clear' ? '' : option.value);
        }
    }

    createSelect(label, optionArray = [], filterKey, defaultValue) {

        let { data = [], clinicalFilter, patientDemographicFilter } = this.props,
            // create a count map that is then merged with the text at the end
            optionCountMap = _.times(optionArray.length, () => 0);

        // The filter shows count on its labels which need to work synchronously with each other
        // so if filter A is active then labels in filter B are modified based on value selected in A
        //  and the same if B is active , but if both are active then count resets to original count
        if (clinicalFilter.length > 0 && patientDemographicFilter.length == 0 && filterKey == 'dm') {
            data = _.filter(data, (d) => d.highlight);
        }
        else if (patientDemographicFilter.length > 0 && clinicalFilter.length == 0 && filterKey == 'cp') {
            data = _.filter(data, (d) => d.highlight);
        }

        _.map(data, (record) => {
            const context = record.pureData.Situation_Context.split(",").map((val_0) => val_0.trim());
            context.map((contextType, contextIndex) => {
                // if a particular value is in the array then find its position and 
                //  increase the count in that position by 1
                if (optionArray.indexOf(contextType) > -1) {
                    // if the option is other then make sure it is not in the first place since 
                    //  the first place is normally for situation and there is a chance this could be other too
                    if (contextType == 'other' && contextIndex == 0) { return; }
                    optionCountMap[optionArray.indexOf(contextType)] += 1;
                }
            })
        });

        // Merge the option Array text with the count of records present in each type
        const modifiedOptionArray = _.map(optionArray, (option, index) => {
            return {
                label: option + " (" + optionCountMap[index] + ") ",
                value: optionArray[index]
            }
        });

        if (modifiedOptionArray.length > 0) {

            return (
                <div className='demographic-box inner-filter-box'>
                    <label className='filter-label'>{label}</label>
                    <div className='select-container-filter'>
                        <Select
                            isClearable={true}
                            name={filterKey}
                            // react select needs a value and so we need to set it in a complicated way with a function
                            //  need to find a more elegant solution in future
                            value={(modifiedOptionArray.find(option => option.value === defaultValue)) || ''}
                            options={modifiedOptionArray}
                            styles={{ option: (styles) => ({ ...styles, color: 'black' }) }}
                            onChange={this.onSelectChange} />
                    </div>
                </div>)
        }
        else {
            return (
                <div className='demographic-box inner-filter-box'>
                    <label className='filter-label'>{label}</label>
                    <span className='no-option-text'>N/A</span>
                </div>)
        }
    }

    render() {

        const { innerKey, epaSource, width, clinicalFilter, patientDemographicFilter, onHighlightChange } = this.props,
            { clinicalPresentation, patientDemographic } = templateEpaSourceMap[innerKey];

        return (
            <div className='filter-box' style={{ width: (width * 4) - 75 }}>
                {this.createSelect('Clinical Presentation', clinicalPresentation[epaSource], 'cp', clinicalFilter)}
                {this.createSelect('Demographic', patientDemographic[epaSource], 'dm', patientDemographicFilter)}
                <div className='inner-button-box'>
                    <button type="submit"
                        className="btn btn-primary-outline icon-container"
                        onClick={() => { onHighlightChange('', '') }}>
                        RESET <span className="icon icon-ccw"></span>
                    </button>
                </div>
            </div>)
    }
}
