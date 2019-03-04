import React, { Component } from 'react';

export default class HeaderRow extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {

        const { onEPALabelClick, innerKey, isCurrentSubRootVisible, epaSourceMap, residentData, isEMDepartment } = this.props;
        let requiredEPACount = 0, completedEPACount = 0;

        _.map(epaSourceMap[innerKey].maxObservation, (count, epaID) => {
            requiredEPACount += count;
            // reset the completed to max amount
            completedEPACount += Math.min(residentData[epaID] ? residentData[epaID].length : 0, count);
        })

        let percentageComplete = Math.round((completedEPACount * 100) / requiredEPACount),
            statusLabel, iconLabel;

        if (completedEPACount == 0) {
            iconLabel = 'icon-warning';
            statusLabel = 'Not Started';
            percentageComplete = '';
        }
        else if (completedEPACount == requiredEPACount) {
            iconLabel = 'icon-shield';
            statusLabel = 'COMPLETE ';
            percentageComplete = '';
        }
        else {
            iconLabel = 'icon-hour-glass';
            statusLabel = 'In Progress';
            percentageComplete += '%';
        }

        return (
            <div className={'text-xs-center text-sm-left inner-epa-head' + (isCurrentSubRootVisible ? ' bottom-line ' : ' ') + 'label-index-' + innerKey} onClick={onEPALabelClick}>
                {isCurrentSubRootVisible ? <span className="icon icon-chevron-down"></span> : <span className="icon icon-chevron-right"></span>}
                <span className='epa-label' >{innerKey + " - " + epaSourceMap[innerKey].topic}</span>
                {isEMDepartment && <span className='epa-label-status' >{statusLabel}<span className={"icon " + iconLabel}></span> {percentageComplete}</span>}
            </div>
        );
    }
}

