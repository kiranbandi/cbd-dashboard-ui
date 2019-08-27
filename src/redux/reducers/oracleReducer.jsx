import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Perils of having a nested tree strucutre in the Redux State XD XD XD 
export default function oracleReducer(state = initialState.oracle, action) {
  switch (action.type) {
    case types.TOGGLE_LOADER:
      return Object.assign({}, state, { loaderState: !state.loaderState })
    case types.TOGGLE_FILTER_LOADER:
      return Object.assign({}, state, { filterLoaderState: !state.filterLoaderState })
    case types.LOG_IN_SUCCESS:
      return Object.assign({}, state, { sessionStatus: true })
    case types.LOG_OUT:
      return Object.assign({}, state, { sessionStatus: false })
    case types.SET_RESIDENT_LIST:
      return Object.assign({}, state, { residentList: action.residentList })
    case types.SET_RESIDENT_FILTER:
      return Object.assign({}, state, { residentFilter: action.residentFilter })
    case types.SET_RESIDENT_DATA:
      return Object.assign({}, state, { residentData: action.residentData })
    case types.SET_EXPIRED_RESIDENT_DATA:
      return Object.assign({}, state, { expiredResidentData: action.expiredResidentData })
    case types.SET_NARRATIVE_DATA:
      return Object.assign({}, state, { narrativeData: action.narrativeData })
    case types.SET_TOOLTIP_VISIBILITY:
      return Object.assign({}, state, { isTooltipVisible: action.isTooltipVisible })
    case types.SET_TOOLTIP_DATA:
      return Object.assign({}, state, { tooltipData: action.tooltipData })
    case types.TOGGLE_MODAL:
      return Object.assign({}, state, { isModalVisible: !state.isModalVisible })
    case types.SET_USER_DATA:
      return Object.assign({}, state, { userDetails: action.userDetails })
    case types.SET_DATA_DUMP:
      return Object.assign({}, state, { dataDumpPresent: action.dataDumpPresent })
    case types.SET_VISIBILITY_OPEN_STATUS:
      return Object.assign({}, state, { visibilityOpenStatus: action.visibilityOpenStatus })
    case types.SET_PROGRAM_INFO:
      return Object.assign({}, state, { programInfo: action.programInfo })
    case types.TOGGLE_EXAM_SCORE:
      return Object.assign({}, state, { programInfo: { ...state.programInfo, examScoresVisible: !state.programInfo.examScoresVisible } })
    default:
      return state;
  }
}
