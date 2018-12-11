import * as types from './actionTypes';
import _ from 'lodash';
import { hashHistory } from 'react-router';


export function loginSuccess() {
    let { state = { nextPathname: '/Dashboard' } } = hashHistory.getCurrentLocation();
    hashHistory.push(state.nextPathname);
    return { type: types.LOG_IN_SUCCESS };
}

export function logOutUser() {
    localStorage.removeItem('jwt');
    hashHistory.push("/");
    return { type: types.LOG_OUT };
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

export function setResidentData(residentData) {
    return { type: types.SET_RESIDENT_DATA, residentData };
}


export function setTooltipVisibility(isTooltipVisible) {
    return { type: types.SET_TOOLTIP_VISIBILITY, isTooltipVisible };
}

export function setTooltipData(tooltipData) {
    return { type: types.SET_TOOLTIP_DATA, tooltipData };
}


export function showTooltip(tooltipData) {
    return dispatch => {
        dispatch(setTooltipData(tooltipData));
        dispatch(setTooltipVisibility(true));
    };
}











