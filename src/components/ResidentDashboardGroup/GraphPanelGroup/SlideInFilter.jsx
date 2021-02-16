import React, { Component } from 'react';
import _ from 'lodash';
import Select from 'react-select';


export default class SlideInFilter extends Component {

    constructor(props) {
        super(props);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.createSelect = this.createSelect.bind(this);
    }

    onSelectChange(option, selectRef) {
        this.props.onHighlightChange(selectRef.name, selectRef.action === 'clear' ? '' : option.value);
    }

    createSelect(label, optionArray = [], defaultValue) {
        let { data = [] } = this.props,
            // create a count map that is then merged with the text at the end
            optionCountMap = _.times(optionArray.length, () => 0);

        data.map(record => {
            // Get all the context values for a given epa
            let context_values = record.pureData.situationContextCollection;
            // Filter out the relavent context  
            let context_value = _.find(context_values, (d) => d.item_text == label);
            // find the option index of the matching context value
            let index = optionArray.map(option => option).indexOf(context_value.text);
            if (index >= 0) { optionCountMap[index] += 1 }
        })

        // Merge the option Array text with the count of records present in each type
        const modifiedOptionArray = _.map(optionArray, (option, index) => {
            return {
                label: option + " (" + optionCountMap[index] + ") ",
                value: option
            }
        });


        if (modifiedOptionArray.length > 0) {

            const selectStyles = {
                base: styles => ({ ...styles, zIndex: 999 }),
                option: (styles) => ({ ...styles, color: 'black' })
            };

            return (
                <div className='demographic-box inner-filter-box' key={label}>
                    <label className='filter-label'>{label}</label>
                    <div className='select-container-filter'>
                        <Select
                            isClearable={true}
                            name={label}
                            value={(modifiedOptionArray.find(option => option.value === defaultValue)) || ''}
                            options={modifiedOptionArray}
                            styles={selectStyles}
                            onChange={this.onSelectChange} />
                    </div>
                </div>)
        }
        else {
            return (
                <div className='demographic-box inner-filter-box' key={label}>
                    <label className='filter-label'>{label}</label>
                    {/* if there isnt a label then no need to show even the N/A option */}
                    {label && <span className='no-option-text'>N/A</span>}
                </div>)
        }
    }

    render() {

        const { width, filterOptions, onHighlightChange } = this.props;

        return (
            <div className='filter-box' style={{ width: (width * 4) - 75 }}>
                {_.map(filterOptions, (filter) => this.createSelect(filter.label, filter.options, filter.selected))}
                <div className='inner-button-box'>
                    <button type="submit"
                        className="btn btn-primary-outline custom-icon-container"
                        onClick={() => { onHighlightChange('*', {}) }}>
                        RESET <span className="icon icon-ccw"></span>
                    </button>
                </div>
            </div>)
    }
}

//  This takes in values that are comma seperated and splits them into an array
// and also trims any leading or trailing whitespaces, additionally it also ignores commas in brackets
// because the comma in that case is part of the option itself and not a seperator.
function splitAndTrim(string) {
    var regex = /,(?![^(]*\)) /;
    return string.split(regex).map((s) => s.trim());
}