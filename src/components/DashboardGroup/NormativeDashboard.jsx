import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { NormativeTable, NormativeFilterPanel, NormativeGraph } from '../';

class NormativeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStage: 'All-Training-Stages',
            removeNoRecords: true
        };
    }

    onStageChange = (stage) => { this.setState({ 'currentStage': stage.value }) };
    onNoRecordChange = (event) => { this.setState({ 'removeNoRecords': event.target.checked }) };

    render() {

        const { residentList } = this.props, { currentStage, removeNoRecords } = this.state;

        const residentsInPhase = (currentStage == 'All-Training-Stages') ? residentList :
            _.filter(residentList, (res) => res['currentPhase'] == currentStage);

        const filteredList = removeNoRecords ?
            _.filter(residentsInPhase, (d) => d['totalAssessments'] > 0) : residentsInPhase;

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let overallWidth = document.getElementById('visual-summary-content-mount').getBoundingClientRect().width - 125;

        return (
            <div className='normative-data-container'>
                <div className='text-center'>
                    <NormativeFilterPanel
                        currentStage={currentStage}
                        removeNoRecords={removeNoRecords}
                        onStageChange={this.onStageChange}
                        onNoRecordChange={this.onNoRecordChange} />
                    {filteredList.length > 0 ?
                        <div className='normative-inner-root'>
                            <NormativeGraph
                                width={overallWidth - (450)}
                                records={filteredList} />
                            <NormativeTable
                                width={450}
                                records={filteredList} />
                        </div> :
                        <h3 className='text-primary text-center m-t-lg'>
                            Sorry there are no {removeNoRecords ? 'active' : ''} residents in the selected training stage.
                            </h3>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList
    };
}

export default connect(mapStateToProps, {})(NormativeDashboard);