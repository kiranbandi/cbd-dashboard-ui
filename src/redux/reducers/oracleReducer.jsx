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
    default:
      return state;
  }
}