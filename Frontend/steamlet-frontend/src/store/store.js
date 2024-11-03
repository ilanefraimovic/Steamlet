import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Use named import
import rootReducer from '../reducers/authReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
