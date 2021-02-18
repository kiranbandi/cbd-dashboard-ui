import * as types from './actionTypes';
import _ from 'lodash';
import { getLearnerData } from '../../utils/requestServer';


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

export function setResidentList(residentList) {
    return { type: types.SET_RESIDENT_LIST, residentList };
}

export function setResidentFilter(residentFilter) {
    return { type: types.SET_RESIDENT_FILTER, residentFilter };
}

export function updateResidentData(residentData) {
    return { type: types.SET_RESIDENT_DATA, residentData };
}

export function setResidentData(residentData, residentInfo = false, programInfo) {

    let visibilityOpenStatus = {
        1: false,
        2: false,
        3: false,
        4: false
    }, currentPhaseIndex = 0;

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
                case 'core-discipline': currentPhaseIndex = 3; break;
                case 'transition-to-practice': currentPhaseIndex = 4; break;
            }
            visibilityOpenStatus[currentPhaseIndex] = true;
        }

        return dispatch => {
            dispatch(setLevelVisibilityStatus(visibilityOpenStatus));
            dispatch({ type: types.SET_PROGRAM_INFO, programInfo });
            dispatch({ type: types.SET_RESIDENT_DATA, residentData });
        };
    }
    // if not simply dispatch the change to residentData alone
    return dispatch => {
        dispatch({ type: types.SET_RESIDENT_DATA, residentData });
    };

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

// Not so elegant solution  but its needed when a user needs to be automatically switched between dashboards
export function switchToResidentDashboard(residentInfo, residentFilter) {

    return dispatch => {
        dispatch(setActiveDashboard('resident'));
        // set all the parameters in the resident filter
        dispatch(setResidentFilter({ ...residentFilter }))
        // then clear any previously selected residents data
        dispatch(setResidentData(null))
        // then start the loading filter
        dispatch(toggleFilterLoader());
        // fetch data from server based on the filter params
        getLearnerData(residentFilter.username, residentInfo)
            .then((processedData) => {
                const { programInfo, residentData } = processedData;
                // mark records to so no record is set in a date period filter
                var markedResidentData = _.map(residentData, (d) => ({ ...d, mark: false }));
                // group data on the basis of EPA
                var groupedResidentData = _.groupBy(markedResidentData, (d) => d.EPA);
                // if uncommenced EPAs are needed to be seen then sub in empty records and 
                // sort records by Date --force
                _.map(programInfo.epaSourceMap, (source) => {
                    _.map(source.subRoot, (epa, innerKey) => {
                        groupedResidentData[innerKey] = _.sortBy(groupedResidentData[innerKey] || [], (d) => d.Date);
                    })
                })
                // store the info of visibility of phase into resident info
                residentInfo.openOnlyCurrentPhase = true;
                dispatch(setResidentData(groupedResidentData, residentInfo, programInfo));
            })
            .finally(() => { dispatch(toggleFilterLoader()); });
    };
}








