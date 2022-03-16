import * as types from '../actions/actionTypes';
import initialState from './initialState';


export const SET_RESIDENT_LIST = 'SET_RESIDENT_LIST';
export const SET_RESIDENT_FILTER = 'SET_RESIDENT_FILTER';
export const SET_RESIDENT_DATA = 'SET_RESIDENT_DATA';
export const TOGGLE_FILTER_LOADER = 'TOGGLE_FILTER_LOADER';
export const SET_TOOLTIP_VISIBILITY = 'SET_TOOLTIP_VISIBILITY';
export const SET_TOOLTIP_DATA = 'SET_TOOLTIP_DATA';
export const SET_VISIBILITY_OPEN_STATUS = 'SET_VISIBILITY_OPEN_STATUS';
export const SET_EXPIRED_RESIDENT_DATA = 'SET_EXPIRED_RESIDENT_DATA';
export const SET_NARRATIVE_DATA = 'SET_NARRATIVE_DATA';
export const SET_PROGRAM_INFO = 'SET_PROGRAM_INFO';


// Perils of having a nested tree strucutre in the Redux State XD XD XD 
export default function oracleReducer(state = initialState.oracle, action) {
  switch (action.type) {
    case types.SET_RESIDENT_LIST:
      return Object.assign({}, state, { residentList: action.residentList })
    case types.SET_RESIDENT_FILTER:
      return Object.assign({}, state, { residentFilter: action.residentFilter })
    case types.SET_RESIDENT_DATA:
      return Object.assign({}, state, { residentData: { ...action.residentData } })
    case types.SET_EXPIRED_RESIDENT_DATA:
      return Object.assign({}, state, { expiredResidentData: action.expiredResidentData })
    case types.SET_NARRATIVE_DATA:
      return Object.assign({}, state, { narrativeData: action.narrativeData })
    case types.SET_TOOLTIP_VISIBILITY:
      return Object.assign({}, state, { isTooltipVisible: action.isTooltipVisible })
    case types.SET_TOOLTIP_DATA:
      return Object.assign({}, state, { tooltipData: action.tooltipData })
    case types.SET_VISIBILITY_OPEN_STATUS:
      return Object.assign({}, state, { visibilityOpenStatus: action.visibilityOpenStatus })
    case types.SET_PROGRAM_INFO:
      return Object.assign({}, state, { programInfo: action.programInfo })
    default:
      return state;
  }
}
