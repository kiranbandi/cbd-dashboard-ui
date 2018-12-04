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











