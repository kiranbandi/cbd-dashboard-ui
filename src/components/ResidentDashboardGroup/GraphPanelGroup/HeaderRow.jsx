import React, { Component } from 'react';
import { connect } from 'react-redux';

class HeaderRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        const { onEPALabelClick, innerKey, isCurrentSubRootVisible,
            epaSourceMap, residentData, residentList,
            hidePercentages, residentFilter } = this.props;
        let requiredEPACount = 0, completedEPACount = 0, residentInfo, currentPhase;

        _.map(epaSourceMap[innerKey].maxObservation, (count, epaID) => {
            requiredEPACount += count;
            // reset the completed to max amount
            completedEPACount += Math.min(residentData[epaID] ? residentData[epaID].length : 0, count);
        })

        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);
            if (residentInfo.currentPhase) {
                switch (residentInfo.currentPhase) {
                    case 'transition-to-discipline': currentPhase = 1; break;
                    case 'foundations-of-discipline': currentPhase = 2; break;
                    case 'core-discipline': currentPhase = 3; break;
                    case 'transition-to-practice': currentPhase = 4; break;
                }
            }
        }

        // TODO remap stages as sequential array instead of object so ordering doesnt
        // screw things up
        let currentStageStatus = _.map(residentInfo.stageProgress)[+innerKey - 1];

        let percentageComplete = Math.round((completedEPACount * 100) / requiredEPACount),
            statusLabel, iconLabel;

        if (currentStageStatus.completed) {
            iconLabel = 'icon-check';
            statusLabel = 'COMPLETE ';
            percentageComplete = '';
        }
        else if (currentStageStatus.in_progress) {
            iconLabel = 'icon-hour-glass';
            statusLabel = 'In Progress';
            percentageComplete += '%';
        }
        else if (percentageComplete > 0) {
            iconLabel = 'icon-hour-glass';
            statusLabel = 'In Progress';
            percentageComplete += '%';
        }
        else {
            iconLabel = 'icon-traffic-cone';
            statusLabel = 'Not Started';
            percentageComplete = '';
        }

        return (
            <div className={'text-xs-center text-sm-left inner-epa-head' + (isCurrentSubRootVisible ? ' bottom-line ' : ' ') + 'label-index-' + innerKey} onClick={onEPALabelClick}>
                {isCurrentSubRootVisible ? <span className="icon icon-chevron-down"></span> : <span className="icon icon-chevron-right"></span>}
                <span className='epa-label' >{epaSourceMap[innerKey].topic}</span>
                <span className='epa-label-status' >{statusLabel}<span className={"icon " + iconLabel}></span> {percentageComplete}</span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentData: state.oracle.residentData,
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList,

    };
}

export default connect(mapStateToProps, null)(HeaderRow);