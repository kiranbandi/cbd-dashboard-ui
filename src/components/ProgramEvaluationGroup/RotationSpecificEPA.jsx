import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
import ReactSelect from 'react-select';
import templateEpaSourceMapOriginal from '../../utils/epaSourceMap';
let templateEpaSourceMap = _.cloneDeep(templateEpaSourceMapOriginal);
let EPAList = [];

_.map(templateEpaSourceMap, (epaSource, key) => {
    _.map(epaSource.subRoot, (epa, epaKey) => {
        if (epa.indexOf('(SA)') > -1) {
            delete templateEpaSourceMap[key].subRoot[epaKey];
            delete templateEpaSourceMap[key].maxObservation[epaKey];
        }
        else {
            EPAList.push(epaKey);
        }
    })
});

const possibleRotations = ["EM", "EM(REGINA)", "EM(PED)", "EM(RGNL)", "ANESTHESIA", "CARDIO", "ICU", "GIM", "GEN SURG", "NEURO", "OPTHO", "ORTHO", "PLASTICS", "SELECTIVE", "TOXICOLOGY", "TRAUMA", "OBS/GYN", "OTHER"];


export default class MarketBrand extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedRotation: { 'label': 'EM', 'option': 'EM' }
        };
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onSelectChange(selectedRotation) {
        this.setState({ selectedRotation });
    }

    render() {

        const { filteredRecords, width } = this.props,
            { selectedRotation } = this.state,
            rotationList = _.map(possibleRotations, (d) => ({ 'label': d, 'value': d }));

        // filter by tag and also remove non SA epas
        let subFilteredRecords = _.filter(filteredRecords, (d) => ((d.rotationTag == selectedRotation.label) && (EPAList.indexOf(d.epa) > -1)));

        // group all the records by their rotation tag
        let groupedRecords = _.groupBy(subFilteredRecords, (d) => d.epa);
        // Count records for each group and normalize by epa MAX observation count for that group
        let dataList = _.map(groupedRecords, (group, groupKey) => {
            return { label: groupKey, value: group.length };
        });

        // sorted datalist
        dataList.sort((a, b) => {
            const aParts = a.label.split("."), bParts = b.label.split(".");
            if (aParts[0] == bParts[0]) {
                return aParts[1] - bParts[1];
            }
            else {
                return aParts[0] - bParts[0];
            }
        });

        let lineData = {
            labels: _.map(dataList, (d) => d.label),
            datasets: [{
                label: "Rotations",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                pointColor: "#43b98e",
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(dataList, (d) => d.value)
            }]
        }

        let lineOptions = {
            scaleBeginAtZero: true
        };

        return (
            <div className='col-sm-6 col-xs-12  epa-specific reel-in-left'>
                <div className='m-a program-vis-box row'>
                    <h3 className='text-left m-b'>Rotation Specific EPA Distribution</h3>
                    <div className="epa-select m-a text-left">
                        <span className='inner-span'>Select Rotation</span>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={selectedRotation}
                                options={rotationList}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectChange} />
                        </div>
                    </div>

                    <div className='col-xs-12'>
                        {lineData.labels.length > 0 ? <Bar
                            options={lineOptions}
                            data={lineData}
                            width={width} height={350}
                            redraw={true} /> :
                            <h3 className='error-code text-left m-b'>No Records</h3>
                        }

                    </div>
                </div>
            </div>)


    }

}