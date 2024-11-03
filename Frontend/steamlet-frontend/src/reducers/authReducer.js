import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

const initialState = {
    userId: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                userId: action.payload.userId, // Set the userId from the payload
                error: null, // Clear any previous errors
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload, // Capture the error message
            };
        default:
            return state;
    }
};

export default authReducer;
