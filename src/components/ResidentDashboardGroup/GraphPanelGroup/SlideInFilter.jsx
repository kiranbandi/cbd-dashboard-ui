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
        const { clinicalFilter, patientDemographicFilter, typeFilter, directVsIndirectFilter, staffObservationfilter } = this.props;
        if (selectRef.name == 'cp') {
            this.props.onHighlightChange(selectRef.action == 'clear' ? '' : option.value, patientDemographicFilter, typeFilter, directVsIndirectFilter, staffObservationfilter);
        }
        else if (selectRef.name == 'dm') {
            this.props.onHighlightChange(clinicalFilter, selectRef.action == 'clear' ? '' : option.value, typeFilter, directVsIndirectFilter, staffObservationfilter);
        }
        else if (selectRef.name == 'tp') {
            this.props.onHighlightChange(clinicalFilter, patientDemographicFilter, selectRef.action == 'clear' ? '' : option.value.substring(0, 6), directVsIndirectFilter, staffObservationfilter);
        }
        else if (selectRef.name == 'di') {
            this.props.onHighlightChange(clinicalFilter, patientDemographicFilter, typeFilter, selectRef.action == 'clear' ? '' : option.value, staffObservationfilter);
        }
        else if (selectRef.name == 'so') {
            this.props.onHighlightChange(clinicalFilter, patientDemographicFilter, typeFilter, directVsIndirectFilter, selectRef.action == 'clear' ? '' : option.value);
        }
    }

    createSelect(label, optionArray = [], filterKey, defaultValue) {

        let { data = [], clinicalFilter, patientDemographicFilter, typeFilter, directVsIndirectFilter, staffObservationfilter } = this.props,
            // create a count map that is then merged with the text at the end
            optionCountMap = _.times(optionArray.length, () => 0);

        // The filter shows count on its labels which need to work synchronously with each other
        // so if filter A is active then labels in filter B are modified based on value selected in A
        //  and the same if B is active , but if both are active then count resets to original count
        if (clinicalFilter.length > 0 && patientDemographicFilter.length == 0 && typeFilter.length == 0 && directVsIndirectFilter.length == 0 && staffObservationfilter.length == 0 && filterKey == 'dm') {
            data = _.filter(data, (d) => d.highlight);
        } else if (patientDemographicFilter.length > 0 && clinicalFilter.length == 0 && typeFilter.length == 0 && directVsIndirectFilter.length == 0 && staffObservationfilter.length == 0 && filterKey == 'cp') {
            data = _.filter(data, (d) => d.highlight);
        } else if (typeFilter.length > 0 && patientDemographicFilter.length == 0 && clinicalFilter.length == 0 && directVsIndirectFilter.length == 0 && staffObservationfilter.length == 0 && filterKey == 'tp') {
            data = _.filter(data, (d) => d.highlight);
        } else if (directVsIndirectFilter.length > 0 && patientDemographicFilter.length == 0 && clinicalFilter.length == 0 && typeFilter.length == 0 && staffObservationfilter.length == 0 && filterKey == 'di') {
            data = _.filter(data, (d) => d.highlight);
        } else if (staffObservationfilter.length > 0 && patientDemographicFilter.length == 0 && clinicalFilter.length == 0 && typeFilter.length == 0 && directVsIndirectFilter.length == 0 && filterKey == 'so') {
            data = _.filter(data, (d) => d.highlight);
        }

        _.map(data, (record) => {
            const context = splitAndTrim(record.pureData.Situation_Context);
            context.map((contextType, contextIndex) => {
                // if a particular value is in the array then find its position and 
                //  increase the count in that position by 1
                let index = (
                    label === 'Type' ?
                        optionArray.findIndex(d => d.substring(0, 6) === contextType) :
                        optionArray.indexOf(contextType)
                );
                if (index >= 0) {
                    // if the option is other then make sure it is not in the first place since 
                    //  the first place is normally for situation and there is a chance this could be other too
                    if (contextType == 'other' && contextIndex == 0) { return; }
                    optionCountMap[index] += 1;
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

            const selectStyles = { base: styles => ({ ...styles, zIndex: 999 }), option: (styles) => ({ ...styles, color: 'black' }) };

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
                            styles={selectStyles}
                            onChange={this.onSelectChange} />
                    </div>
                </div>)
        }
        else {
            return (
                <div className='demographic-box inner-filter-box'>
                    <label className='filter-label'>{label}</label>
                    {/* if there isnt a label then no need to show even the N/A option */}
                    {label && <span className='no-option-text'>N/A</span>}
                </div>)
        }
    }

    render() {

        const { innerKey, epaSource, width, clinicalFilter, patientDemographicFilter, typeFilter, directVsIndirectFilter, staffObservationfilter, onHighlightChange, epaSourceMap } = this.props,
            { clinicalPresentation, patientDemographic, type, filterTitles = {} } = epaSourceMap[innerKey];

        const innerTitles = filterTitles[epaSource] || ["Clinical Presentation", "Demographic"];

        const data = this.props.data.map(d => d.pureData);
        return (
            <div className='filter-box' style={{ width: (width * 4) - 75 }}>
                {this.createSelect(innerTitles[0], clinicalPresentation[epaSource], 'cp', clinicalFilter)}
                {this.createSelect(innerTitles[1], patientDemographic[epaSource], 'dm', patientDemographicFilter)}
                {innerTitles[2] && type && type[epaSource] && this.createSelect(innerTitles[2], type[epaSource], 'tp', typeFilter)}
                {innerTitles[3] && data.filter(d => splitAndTrim(d.Situation_Context).indexOf('direct') > -1).length >= +innerTitles[3].split('\t')[1] && this.createSelect(innerTitles[3].split('\t')[0], ['direct', 'indirect'], 'di', directVsIndirectFilter)}
                {innerTitles[4] && data.filter(d => splitAndTrim(d.Situation_Context).indexOf('staff') > -1).length >= +innerTitles[4].split('\t')[1] && this.createSelect(innerTitles[4].split('\t')[0], ['staff'], 'so', staffObservationfilter)}
                <div className='inner-button-box'>
                    <button type="submit"
                        className="btn btn-primary-outline icon-container"
                        onClick={() => { onHighlightChange('', '', '') }}>
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