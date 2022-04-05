import React, { Component } from 'react';
import ReactSelect from 'react-select';
import getTrainingStages from '../../utils/getTrainingStages';
import infoTooltipReference from '../../utils/infoTooltipReference';


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
            <div className='filter-panel text-left p-b'>
                <div className='text-left advanced-filter-box normative-filter-box'>

                    <div className='react-select-root-filter'>
                        <ReactSelect
                            placeholder='Select Training Stage...'
                            value={currentStageEntry}
                            options={trainingStageList}
                            styles={{
                                option: (styles, { isSelected }) => ({
                                    ...styles,
                                    color: isSelected ? 'white' : 'black',
                                    textAlign: 'left',
                                    textTransform: 'capitalize'
                                }),
                                singleValue: (styles) => ({
                                    ...styles,
                                    textTransform: 'capitalize'
                                })
                            }}
                            onChange={onStageChange} />
                    </div>

                    <div className="checkbox custom-control text-center custom-checkbox">
                        <label className='filter-label'>
                            {"Filter Residents with No records"}
                            <input id='filter-dateFilterActive' type="checkbox"
                                checked={removeNoRecords} onChange={onNoRecordChange} />
                            <span className="custom-control-indicator"></span>
                        </label>
                        <i data-for='normative-instant-info' data-tip={infoTooltipReference.normativeAssessment.stages} className="fa fa-info-circle instant-tooltip-trigger"></i>
                    </div>
                </div>
            </div>)
    }

}

function getTrainingStageList() {
    // access the training stages 
    // TODO training stages only for one level not multiple
    let stageListCopy = getTrainingStages();
    // and then add an extra option all to the list
    stageListCopy.unshift('All-Training-Stages');
    return _.map(stageListCopy, (d) => {
        return {
            value: d,
            label: d.split('-').join(' '),
        };
    })
}
