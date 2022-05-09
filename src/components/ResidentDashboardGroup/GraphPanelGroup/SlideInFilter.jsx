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

    createSelect(
        label,
        optionArray = [],
        defaultValue
    ) {
        let { data = [] } = this.props,
            // create a count map that is then merged with the text at the end
            optionCountMap = _.times(optionArray.length, () => 0);


        data.map(record => {
            const context = splitAndTrimAndRemoveSpaces(record.pureData.Situation_Context);
            context.map((contextType, contextIndex) => {
                // if a particular value is in the array then find its position and 
                //  increase the count in that position by 1
                let index = optionArray.map(option => splitAndTrimAndRemoveSpaces(option)[0]).indexOf(contextType);

                if (index >= 0) {
                    // if the option is other then make sure it is not in the first place since 
                    //  the first place is normally for situation and there is a chance this could be other too
                    if (contextType == 'other' && contextIndex == 0) { return; }
                    optionCountMap[index] += 1;
                }
            });
        })

        // Merge the option Array text with the count of records present in each type
        const modifiedOptionArray = _.map(optionArray, (option, index) => {
            return {
                label: option + " (" + optionCountMap[index] + ") ",
                value: option
            }
        });


        if (modifiedOptionArray.length > 0) {

            const selectStyles = { base: styles => ({ ...styles, zIndex: 999 }), option: (styles) => ({ ...styles, color: 'black' }) };

            return (
                <div className='demographic-box inner-filter-box' key={label}>
                    <label className='filter-label'>{label}</label>
                    <div className='select-container-filter'>
                        <Select
                            isClearable={true}
                            name={label}
                            // react select needs a value and so we need to set it in a complicated way with a function
                            //  need to find a more elegant solution in future
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

        const { innerKey, epaSource, width, filterDict, onHighlightChange, epaSourceMap } = this.props;

        const innerTitles = Object.keys(epaSourceMap[innerKey]['filterValuesDict'][epaSource]) || ["Clinical Presentation", "Demographic"];
        

        return (
            <div className='filter-box' style={{ width: (width * 4) - 75 }}>
                {innerTitles.map(title => {
                    if (title == 'Type' && epaSourceMap[innerKey]['filterValuesDict'][epaSource][title].length == 1) {
                        return null;
                    }
                    else {
                        return this.createSelect(
                            title,
                            epaSourceMap[innerKey]['filterValuesDict'][epaSource][title],
                            filterDict[title]
                        );
                    }
                })}
                <div className='inner-button-box'>
                    <button type="submit"
                        className="btn btn-primary-outline icon-container"
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
function splitAndTrimAndRemoveSpaces(string) {
    var regex = /,(?![^(]*\)) /;
    return string.split(regex).map((s) => s.split(' ').join(''));
}