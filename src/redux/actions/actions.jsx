import * as types from './actionTypes';
import _ from 'lodash';
import { hashHistory } from 'react-router';


export function loginSuccess(userDetails) {
    sessionStorage.setItem('jwt', userDetails.token);
    sessionStorage.setItem('username', userDetails.username);
    sessionStorage.setItem('accessType', userDetails.accessType);
    let { state = { nextPathname: '/Dashboard' } } = hashHistory.getCurrentLocation();
    hashHistory.push(state.nextPathname);
    return { type: types.LOG_IN_SUCCESS };
}

export function logOutUser() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessType');
    hashHistory.push("/");
    return { type: types.LOG_OUT };
}

export function setLevelVisibilityStatus(visibilityOpenStatus) {
    return { type: types.SET_VISIBILITY_OPEN_STATUS, visibilityOpenStatus }
}

export function toggleLoader() {
    return { type: types.TOGGLE_LOADER };
}

export function toggleFilterLoader() {
    return { type: types.TOGGLE_FILTER_LOADER };
}

export function setResidentList(residentList) {
    return { type: types.SET_RESIDENT_LIST, residentList };
}

export function setResidentFilter(residentFilter) {
    return { type: types.SET_RESIDENT_FILTER, residentFilter };
}

export function setResidentData(residentData, residentInfo = false) {

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
        };
    }
    // if not simply dispatch the change to residentData alone
    return { type: types.SET_RESIDENT_DATA, residentData };

}

export function setTooltipVisibility(isTooltipVisible) {
    return { type: types.SET_TOOLTIP_VISIBILITY, isTooltipVisible };
}

export function setTooltipData(tooltipData) {
    return { type: types.SET_TOOLTIP_DATA, tooltipData };
}

export function setUserDetails(userDetails) {
    return { type: types.SET_USER_DATA, userDetails };
}

export function setLoginData(userDetails) {
    return dispatch => {
        dispatch(setUserDetails(userDetails));
        dispatch(loginSuccess(userDetails));
    };
}

export function setLogoutData() {
    return dispatch => {
        dispatch(setUserDetails({}));
        dispatch(logOutUser());
    };
}

export function showTooltip(tooltipData) {
    return dispatch => {
        dispatch(setTooltipData(tooltipData));
        dispatch(setTooltipVisibility(true));
    };
}












