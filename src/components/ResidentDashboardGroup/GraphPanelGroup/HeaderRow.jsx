import React, { Component } from 'react';
import { connect } from 'react-redux';

class HeaderRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        const { onEPALabelClick, innerKey, isCurrentSubRootVisible,
            epaSourceMap, residentData, residentList,
            hidePercentages, residentFilter, nonDemoMode } = this.props;
        let requiredEPACount = 0, completedEPACount = 0,
            residentInfo, currentPhase, completionStatus = {};


        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);
            completionStatus = residentInfo.completionStatus || {};
            if (residentInfo.currentPhase) {
                switch (residentInfo.currentPhase) {
                    case 'transition-to-discipline': currentPhase = 1; break;
                    case 'foundations-of-discipline': currentPhase = 2; break;
                    case 'core-of-discipline': currentPhase = 3; break;
                    case 'transition-to-practice': currentPhase = 4; break;
                }
            }
        }

        _.map(epaSourceMap[innerKey].maxObservation, (maxCount, epaID) => {
            // cap the completed to max amount, if the resident has done more than max required
            let currentCompletedCount = Math.min(residentData[epaID] ? residentData[epaID].length : 0, maxCount);
            requiredEPACount += maxCount;
            // if an EPA has been marked complete then max out the completed count.
            completedEPACount += !!completionStatus[epaID] ? maxCount : currentCompletedCount;
        })

        let percentageComplete = Math.round((completedEPACount * 100) / requiredEPACount),
            statusLabel, iconLabel;

        if (completedEPACount == 0) {
            iconLabel = 'icon-warning';
            statusLabel = 'Not Started';
            percentageComplete = '';
        }
        else if (completedEPACount == requiredEPACount) {
            iconLabel = 'icon-check';
            statusLabel = 'COMPLETE ';
            percentageComplete = '';
        }
        else {
            iconLabel = 'icon-hour-glass';
            statusLabel = 'In Progress';
            percentageComplete += '%';
        }

        //  last minute addition - if a resident is through a phase then 
        // make the badge look completed
        if (+innerKey < currentPhase) {
            statusLabel = 'Promoted';
            iconLabel = 'icon-check';
            percentageComplete = '';
        }

        if (hidePercentages) {
            percentageComplete = '';
            iconLabel = iconLabel == 'icon-hour-glass' ? '' : iconLabel;
        }

        return (
            <div className={'text-xs-center text-sm-left inner-epa-head' + (isCurrentSubRootVisible ? ' bottom-line ' : ' ') + 'label-index-' + innerKey} onClick={onEPALabelClick}>
                {isCurrentSubRootVisible ? <span className="icon icon-chevron-down"></span> : <span className="icon icon-chevron-right"></span>}
                <span className='epa-label' >{epaSourceMap[innerKey].topic}</span>
                {nonDemoMode && <span className='epa-label-status' >{statusLabel}<span className={"icon " + iconLabel}></span> {percentageComplete}</span>}
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