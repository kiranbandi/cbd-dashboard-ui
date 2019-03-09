import React, { Component } from 'react';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import _ from 'lodash';
import Select from 'react-select';

export default class SlideInFilter extends Component {

    constructor(props) {
        super(props);
        this.onSelectSubmit = this.onSelectSubmit.bind(this);
    }

    onSelectSubmit(event) {

        let clinicalPresentationValue = '', patientDemographicValue = '';

        if (event.target.id.indexOf('highlight') > -1) {
            clinicalPresentationValue = document.getElementById('filter-demographic-cp') ? document.getElementById('filter-demographic-cp').value : '';
            patientDemographicValue = document.getElementById('filter-demographic-cp') ? document.getElementById('filter-demographic-dm').value : '';
        }

        this.props.onHighlightChange(clinicalPresentationValue, patientDemographicValue);
    }


    createSelect(label, optionArray = [], filterKey, records, defaultValue) {

        // create a count map that is then merged with the text at the end
        const optionCountMap = _.times(optionArray.length, () => 0);

        _.map(records, (record) => {
            const context = record.Situation_Context.split(",").map((val_0) => val_0.trim());
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
        const modifiedOptionArray = _.map(optionArray, (option, index) => option + "(" + optionCountMap[index] + ")");

        if (modifiedOptionArray.length > 0) {

            // insert a fake option 
            modifiedOptionArray.unshift("Select");

            return (
                <div className='demographic-box inner-filter-box'>
                    <label className='filter-label'>{label}</label>
                    <select onChange={this.onSelectChange} id={'filter-demographic-' + filterKey} defaultValue={defaultValue} className="custom-select">
                        {_.map(modifiedOptionArray, (val, index) => { return <option key={index} value={index == 0 ? '' : optionArray[index - 1]}> &nbsp; {val} &nbsp;</option> })}
                    </select>
                </div>)
        }
        else {
            (<div className='demographic-box inner-filter-box'>
                <label className='filter-label'>{label}</label>
                <span className='no-option-text'>N/A</span>
            </div>)
        }
    }

    render() {

        const { innerKey, epaSource, width, data = [], clinicalFilter, patientDemographicFilter } = this.props,
            { clinicalPresentation, patientDemographic } = templateEpaSourceMap[innerKey];

        return (
            <div className='filter-box' style={{ width: (width * 4) - 75 }}>
                {this.createSelect('Clinical Presentation', clinicalPresentation[epaSource], 'cp', data, clinicalFilter)}
                {this.createSelect('Demographic', patientDemographic[epaSource], 'dm', data, patientDemographicFilter)}
                <div className='inner-button-box'>
                    <button type="submit" id='filter-highlight-button' className="btn btn-primary-outline" onClick={this.onSelectSubmit}>HIGHLIGHT</button>
                </div>
                <div className='inner-button-box'>
                    <button type="submit" id='filter-reset-button' className="btn btn-primary-outline icon-container" onClick={this.onSelectSubmit}><span className="icon icon-ccw"></span></button>
                </div>
            </div>)
    }
}
