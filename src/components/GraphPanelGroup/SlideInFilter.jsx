import React, { Component } from 'react';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import _ from 'lodash';

export default class SlideInFilter extends Component {

    constructor(props) {
        super(props);
    }


    createSelect(label, optionArray = []) {
        return <div className='demographic-box inner-filter-box'>
            <label className='filter-label'>{label}</label>
            {optionArray.length > 0 ?
                <select id='filter-demographic' defaultValue={''} className="custom-select">
                    {_.map(optionArray, (val, index) => { return <option key={index} value={val}> {val}</option> })}
                </select> :
                <span className='no-option-text'>N/A</span>}
        </div>
    }

    render() {

        const { innerKey, epaSource, width } = this.props,
            { clinicalPresentation, patientDemographic } = templateEpaSourceMap[innerKey];


        return (
            <div className='filter-box' style={{ width: (width * 4) - 75 }}>
                {this.createSelect('Clinical Presentation', clinicalPresentation[epaSource])}
                {this.createSelect('Demographic', patientDemographic[epaSource])}
                <div className='inner-button-box'>
                    <button type="submit" className="btn btn-primary-outline">HIGHLIGHT</button>
                </div>
                <div className='inner-button-box'>
                    <button type="submit" className="btn btn-primary-outline icon-container"><span className="icon icon-ccw"></span></button>
                </div>
            </div>)
    }
}
