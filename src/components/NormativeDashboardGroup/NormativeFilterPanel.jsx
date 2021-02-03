import React, { Component } from 'react';
import { STAGES_LIST } from '../../utils/programInfo';
import ReactSelect from 'react-select';

export default class NormativeFilterPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { currentStage, removeNoRecords = false,
            onStageChange, onNoRecordChange } = this.props;

        const trainingStageList = getTrainingStageList(),
            currentStageEntry = _.find(trainingStageList, (d) => d.value == currentStage) || trainingStageList[0];

        return (
            <div className='filter-panel'>
                <div className='text-xs-left advanced-filter-box normative-filter-box'>

                    <div className='react-select-root-filter'>
                        <ReactSelect
                            placeholder='Select Training Stage...'
                            value={currentStageEntry}
                            options={trainingStageList}
                            styles={{
                                option: (styles) => ({
                                    ...styles, color: 'black',
                                    textAlign: 'left',
                                    textTransform:'capitalize'
                                })
                            }}
                            onChange={onStageChange} />
                    </div>

                    <div className="checkbox custom-control text-center custom-checkbox">
                        <label className='filter-label'>
                            {"Active Residents only"}
                            <input id='filter-dateFilterActive' type="checkbox" checked={removeNoRecords} onChange={onNoRecordChange} />
                            <span className="custom-control-indicator"></span>
                        </label>
                    </div>
                </div>
            </div>)
    }

}

function getTrainingStageList() {
    // create a clone  
    let stageListCopy = _.clone(STAGES_LIST);
    // and then add an extra option all to the list
    stageListCopy.unshift('All-Training-Stages');
    return _.map(stageListCopy, (d) => {
        return {
            value: d,
            label: d.split('-').join(' '),
        };
    })
}
