import * as actionTypes from '../actions';
import merge from 'lodash/merge';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import validation from './validation.reducer.js';

const rootReducer = combineReducers({
  validation,
  routing: routeReducer
});

export default rootReducer
