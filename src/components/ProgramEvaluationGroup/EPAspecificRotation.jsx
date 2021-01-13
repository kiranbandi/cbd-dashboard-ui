import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
import ReactSelect from 'react-select';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { NumberToEPAText } from "../../utils/convertEPA";

export default class EPASpecRotation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedEPA: { 'label': 'D1', 'value': '1.1' }
        };
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onSelectChange(selectedEPA) {
        this.setState({ selectedEPA });
    }

    render() {

        const { filteredRecords, width, epaSourceMap } = this.props,
            { selectedEPA } = this.state;

        let templateEpaSourceMap = _.cloneDeep(epaSourceMap);
        // remove references to special assessments if any
        _.map(templateEpaSourceMap, (epaSource, key) => {
            _.map(epaSource.subRoot, (epa, epaKey) => {
                if (epa.indexOf('(SA)') > -1) {
                    delete templateEpaSourceMap[key].subRoot[epaKey];
                    delete templateEpaSourceMap[key].maxObservation[epaKey];
                }
            })
        });


        const groupedEPAList = _.map(templateEpaSourceMap, (d) => ({
            'label': d.topic,
            'options': _.map(d.subRoot, (sub, subKey) => {
                return {
                    'label': NumberToEPAText(subKey) + " - " + sub,
                    'value': subKey
                };
            })
        }));

        let subFilteredRecords = _.filter(filteredRecords, (d) => d.epa == selectedEPA.value);

        // group all the records by their rotation tag
        let groupedRecords = _.groupBy(subFilteredRecords, (d) => d.rotationTag);
        // Count records for each group and normalize by rotation count for that group
        _.map(groupedRecords, (group, groupKey) => {
            groupedRecords[groupKey] = Math.ceil(group.length);
        });

        let lineData = {
            labels: _.map(groupedRecords, (d, key) => key),
            datasets: [{
                label: "Rotations",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                pointColor: "#43b98e",
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(groupedRecords, (d) => d)
            }]
        }

        let lineOptions = {
            scaleBeginAtZero: true
        };

        return (
            <div className='col-sm-6 col-xs-12 epa-specific'>
                <div className='m-a program-vis-box row'>
                    <h3 className='text-left m-b'>
                        EPA Specific Rotation Distribution
                        <InfoTip info={infoTooltipReference.programEvaluation.EPASpecificRotationDistribution} />
                    </h3>
                    <div className="epa-select m-a text-left">
                        <span className='inner-span'>Select EPA</span>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={selectedEPA}
                                options={groupedEPAList}
                                styles={{
                                    option: (styles) => ({
                                        ...styles,
                                        color: 'black',
                                        textAlign: 'left'
                                    })
                                }}
                                onChange={this.onSelectChange} />
                        </div>
                    </div>

                    <div className='col-xs-12'>
                        {lineData.labels.length > 0 ? <Bar
                            options={lineOptions}
                            data={lineData}
                            width={width} height={350}
                            redraw={true} /> :
                            <h3 style={{ width }} className='error-code text-left m-b'>No Records</h3>
                        }

                    </div>
                </div>
            </div>)


    }

}