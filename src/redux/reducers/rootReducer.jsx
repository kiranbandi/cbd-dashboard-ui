import { combineReducers } from 'redux';
import oracle from './oracleReducer';

const rootReducer = combineReducers({
  // short hand property names , we only have one reducer for now
  // but will have more than one in future as project expands
  oracle
})

export default rootReducer;  