import React, { Component } from 'react';
import { connect } from 'react-redux';

class HeaderRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { onEPALabelClick, innerKey, isCurrentSubRootVisible,
            epaSourceMap, residentList, residentFilter } = this.props;
        let requiredEPACount = 0, achievedEPACount = 0, residentInfo, currentPhase;

        _.map(epaSourceMap[innerKey].maxObservation, (count, epaID) => {
            requiredEPACount += count;
            const achievedCount = +epaSourceMap[innerKey].achieved[epaID];
            // reset the completed to max amount
            achievedEPACount += Math.min(achievedCount ? achievedCount : 0, count);
        });

        // If all the sub EPAs in a stage are marked complete,
        // then mark the stage as complete
        let allSubEPAsComplete = _.reduce(epaSourceMap[innerKey].completed, (acc, d) => acc && d, true);

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

        // TODO remap stages as sequential array instead of object so ordering doesnt screw things up
        let currentStageStatus = _.map(residentInfo.stageProgress)[+innerKey - 1];

        let percentageComplete = Math.round((achievedEPACount * 100) / requiredEPACount),
            statusLabel, iconLabel;

        // remap NaN values to 0
        percentageComplete = isNaN(percentageComplete) ? 0 : percentageComplete;

        if (currentStageStatus.completed || allSubEPAsComplete) {
            iconLabel = 'fa-check-circle';
            statusLabel = 'COMPLETE ';
            percentageComplete = '';
        }
        else if (currentStageStatus.in_progress || percentageComplete > 0) {
            iconLabel = 'fa-hourglass-half';
            statusLabel = 'In Progress';
            percentageComplete += '%';
        }
        else {
            iconLabel = 'fa-flag-checkered';
            statusLabel = 'Not Started';
            percentageComplete = '';
        }

        return (
            <div className={'text-xs-center text-sm-left inner-epa-head' + (isCurrentSubRootVisible ? ' bottom-line ' : ' ') + 'label-index-' + innerKey} onClick={onEPALabelClick}>
                {isCurrentSubRootVisible ? <span className="fa fa-chevron-down"></span> : <span className="fa fa-chevron-right"></span>}
                <span className='epa-label' >{epaSourceMap[innerKey].topic}</span>
                <span className='epa-label-status' >{statusLabel}<span className={"fa " + iconLabel}></span> {percentageComplete}</span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList,

    };
}

export default connect(mapStateToProps, null)(HeaderRow);