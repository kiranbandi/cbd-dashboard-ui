import React, { Component } from 'react';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import _ from 'lodash';

export default class SlideInFilter extends Component {

    constructor(props) {
        super(props);
        this.onSelectSubmit = this.onSelectSubmit.bind(this);
    }

    onSelectSubmit() {
        //     const  residentFilter.startDate = document.getElementById('filter-demographic-cp') ? document.getElementById('filter-demographic-cp').value : '',
        //     residentFilter.endDate = document.getElementById('filter-demographic-cp') ? document.getElementById('filter-demographic-dm').value : '';
    }


    createSelect(label, optionArray = [], filterKey, records) {

        const optionCountMap = _.times(optionArray.length, () => 0);

        _.map(records, (record) => {
            const context = record.Situation_Context.split(",").map((val_0)=>val_0.trim());
            debugger;
        })


        return <div className='demographic-box inner-filter-box'>
            <label className='filter-label'>{label}</label>
            {optionArray.length > 0 ?
                <select id={'filter-demographic-' + filterKey} defaultValue={''} className="custom-select">
                    {_.map(optionArray, (val, index) => { return <option key={index} value={val}> {val}</option> })}
                </select> :
                <span className='no-option-text'>N/A</span>}
        </div>



    }

    render() {

        const { innerKey, epaSource, width, data = [] } = this.props,
            { clinicalPresentation, patientDemographic } = templateEpaSourceMap[innerKey];


        return (
            <div className='filter-box' style={{ width: (width * 4) - 75 }}>
                {this.createSelect('Clinical Presentation', clinicalPresentation[epaSource], 'cp', data)}
                {this.createSelect('Demographic', patientDemographic[epaSource], 'dm', data)}
                <div className='inner-button-box'>
                    <button type="submit" className="btn btn-primary-outline">HIGHLIGHT</button>
                </div>
                <div className='inner-button-box'>
                    <button type="submit" className="btn btn-primary-outline icon-container"><span className="icon icon-ccw"></span></button>
                </div>
            </div>)
    }
}
