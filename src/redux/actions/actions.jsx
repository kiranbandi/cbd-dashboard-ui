import * as types from './actionTypes';
import _ from 'lodash';

export function setLevelVisibilityStatus(visibilityOpenStatus) {
    return { type: types.SET_VISIBILITY_OPEN_STATUS, visibilityOpenStatus }
}

export function setResidentList(residentList) {
    return { type: types.SET_RESIDENT_LIST, residentList };
}

export function setResidentFilter(residentFilter) {
    return { type: types.SET_RESIDENT_FILTER, residentFilter };
}

export function setResidentData(residentData, residentInfo = false) {

    let expiredResidentData = [];

    if (residentData) {
        _.map(residentData, (innerEPAs, index) => {
            var splitGroup = _.partition(innerEPAs, (record) => record.isExpired);
            // we split records on the basis of whether or not they have expired
            residentData[index] = splitGroup[1];
            expiredResidentData.push(...splitGroup[0]);
        })
    }

    let visibilityOpenStatus = {
        1: false,
        2: false,
        3: false,
        4: false
    },
        currentPhaseIndex = 0;

    // If there is additional information about the resident then
    // set it to the redux store and also open the respective phase panel
    if (!!residentInfo) {

        // if open all phases is clicked on then open everything
        if (!residentInfo.openOnlyCurrentPhase) {
            visibilityOpenStatus = {
                1: true,
                2: true,
                3: true,
                4: true
            }
        }
        // if not open the current phase only
        else {
            switch (residentInfo.currentPhase) {
                case 'transition-to-discipline': currentPhaseIndex = 1; break;
                case 'foundations-of-discipline': currentPhaseIndex = 2; break;
                case 'core-of-discipline': currentPhaseIndex = 3; break;
                case 'transition-to-practice': currentPhaseIndex = 4; break;
            }
            visibilityOpenStatus[currentPhaseIndex] = true;
        }

        return dispatch => {
            dispatch(setLevelVisibilityStatus(visibilityOpenStatus));
            dispatch({ type: types.SET_RESIDENT_DATA, residentData });
            dispatch({ type: types.SET_EXPIRED_RESIDENT_DATA, expiredResidentData });
        };
    }
    // if not simply dispatch the change to residentData alone
    return dispatch => {
        dispatch({ type: types.SET_RESIDENT_DATA, residentData });
        dispatch({ type: types.SET_EXPIRED_RESIDENT_DATA, expiredResidentData });
    };

}

export function setNarrativeData(narrativeData) {
    return { type: types.SET_NARRATIVE_DATA, narrativeData };
}

export function setTooltipData(tooltipData) {
    return { type: types.SET_TOOLTIP_DATA, tooltipData };
}

export function setProgramInfo(programInfo) {
    return { type: types.SET_PROGRAM_INFO, programInfo };
}

export function showTooltip(isTooltipVisible, tooltipData) {
    return dispatch => {
        if (!!tooltipData) {
            dispatch(setTooltipData(tooltipData));
        }
        dispatch({ type: types.SET_TOOLTIP_VISIBILITY, isTooltipVisible });
    };
}







