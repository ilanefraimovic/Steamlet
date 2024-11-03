// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Create this reducer

const rootReducer = combineReducers({
    auth: authReducer, // Add your auth reducer here
});

export default rootReducer;
