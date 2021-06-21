import { combineReducers } from '@reduxjs/toolkit';
import auth from '../app/auth/store';

const createReducer = asyncReducers =>
    combineReducers({
        auth,
        ...asyncReducers
    });

export default createReducer;
