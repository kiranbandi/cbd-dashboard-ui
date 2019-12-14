import * as types from './actionTypes';
import _ from 'lodash';
import { hashHistory } from 'react-router';
import { PROGRAM_INFO } from '../../utils/programInfo';
import { getResidentData, getNarratives } from '../../utils/requestServer';


export function loginSuccess() {
    let { state = { nextPathname: '/Dashboard' } } = hashHistory.getCurrentLocation();
    hashHistory.push(state.nextPathname);
    return { type: types.LOG_IN_SUCCESS };
}

export function logOutUser() {
    hashHistory.push("/");
    return { type: types.LOG_OUT };
}

export function setLevelVisibilityStatus(visibilityOpenStatus) {
    return { type: types.SET_VISIBILITY_OPEN_STATUS, visibilityOpenStatus }
}

export function toggleLoader() {
    return { type: types.TOGGLE_LOADER };
}

export function setActiveDashboard(activeDashboard) {
    return { type: types.SET_ACTIVE_DASHBOARD, activeDashboard };
}

export function toggleFilterLoader() {
    return { type: types.TOGGLE_FILTER_LOADER };
}


export function toggleModalVisbility() {
    return { type: types.TOGGLE_MODAL };
}

export function setInfoCard(infoCard) {
    // set the card and show modal
    return dispatch => {
        dispatch({ type: types.SET_INFO_CARD, infoCard });
        dispatch(toggleModalVisbility());
    };

}

export function setResidentList(residentList) {
    return { type: types.SET_RESIDENT_LIST, residentList };
}

export function setResidentFilter(residentFilter) {
    return { type: types.SET_RESIDENT_FILTER, residentFilter };
}

export function setDataDumpState(dataDumpPresent) {
    return { type: types.SET_DATA_DUMP, dataDumpPresent };
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

export function setUserDetails(userDetails) {
    return { type: types.SET_USER_DATA, userDetails };
}

export function setProgramInfo(programInfo) {
    return { type: types.SET_PROGRAM_INFO, programInfo };
}

export function toggleExamScore() {
    return { type: types.TOGGLE_EXAM_SCORE };
}

export function setLoginData(userDetails) {
    const { program = 'EM' } = userDetails, programInfo = PROGRAM_INFO[program];
    // store data that needs to be persisted in session storage
    storeDataInSessionStorage(userDetails, programInfo);
    // dispatch actions to store all user and program related data in redux store
    return dispatch => {
        // this can also be called when token is being reissued 
        // so in that case reset resident data and filter if any
        dispatch({ type: types.SET_RESIDENT_DATA, residentData: null });
        dispatch({ type: types.SET_EXPIRED_RESIDENT_DATA, expiredResidentData: [] });
        dispatch({ type: types.SET_NARRATIVE_DATA, narrativeData: [] });
        dispatch(setResidentFilter({ isAllData: true }))
        // then set user details and program information
        dispatch(setUserDetails(userDetails));
        // dispatch source map  to action 
        dispatch(setProgramInfo(programInfo));
        dispatch(loginSuccess());
    };
}

export function setLogoutData() {
    // clear data that persists in session storage
    clearSessionStorage();
    return dispatch => {
        dispatch(setUserDetails({}));
        dispatch(logOutUser());
    };
}

export function showTooltip(isTooltipVisible, tooltipData) {
    return dispatch => {
        if (!!tooltipData) {
            dispatch(setTooltipData(tooltipData));
        }
        dispatch({ type: types.SET_TOOLTIP_VISIBILITY, isTooltipVisible });
    };
}

function storeDataInSessionStorage(userDetails, programInfo) {
    sessionStorage.setItem('jwt', userDetails.token);
    sessionStorage.setItem('username', userDetails.username);
    sessionStorage.setItem('accessType', userDetails.accessType);
    sessionStorage.setItem('program', userDetails.program);
    sessionStorage.setItem('programInfo', JSON.stringify(programInfo));
}

function clearSessionStorage() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessType');
    sessionStorage.removeItem('program');
    sessionStorage.removeItem('programInfo');
}


// Not so elegant solution 
//  but is needed when a user needs to be automatically switched between dashboards
export function switchToResidentDashboard(residentInfo, residentFilter, programInfo) {

    return dispatch => {
        dispatch(setActiveDashboard('resident'));
        // set all the parameters in the resident filter
        dispatch(setResidentFilter({ ...residentFilter }))
        // then clear any previously selected residents data
        dispatch(setNarrativeData([]))
        dispatch(setResidentData(null))
        // then start the loading filter
        dispatch(toggleFilterLoader());
        // fetch data from server based on the filter params
        // Dirty solution but eventually all filtering will happen on the server so no point 
        //  in repeating this again.
        getResidentData(residentFilter.username)
            .then((residentData) => {
                // mark records to so no record is set in a date period filter
                var markedResidentData = _.map(residentData, (d) => ({ ...d, mark: false }));
                // group data on the basis of EPA
                var groupedResidentData = _.groupBy(markedResidentData, (d) => d.EPA);

                // if uncommenced EPAs are needed to be seen then sub in empty records
                _.map(programInfo.epaSourceMap, (source) => {
                    _.map(source.subRoot, (epa, innerKey) => {
                        if (!groupedResidentData.hasOwnProperty(innerKey)) {
                            groupedResidentData[innerKey] = [];
                        }
                    })
                })
                // store the info of visibility of phase into resident info
                residentInfo.openOnlyCurrentPhase = true;
                dispatch(setResidentData(groupedResidentData, residentInfo));
                // Finally get narratives for the resident
                return getNarratives(residentFilter.username);

            })
            .then((narrativeData) => {
                // mark records in the selected date range with a flag
                var markedNarrativeData = _.map(narrativeData, (d) => ({ ...d, mark: false }));
                dispatch(setNarrativeData(markedNarrativeData));
            })
            .finally(() => { dispatch(toggleFilterLoader()); });
    };
}








