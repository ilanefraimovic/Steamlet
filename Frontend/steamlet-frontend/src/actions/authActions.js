// src/actions/authActions.js
import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3000/api/v1/users/login', { userName: username, password });
        const { userId, sets } = response.data; // Assuming your response has this structure
        
        // Dispatch the success action with userId
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { userId, sets }, // Adjust according to your response structure
        });

        return {
            type: LOGIN_SUCCESS,
            payload: { userId, sets }, // Return the action for checking in the component
        };
    } catch (error) {
        // Handle error and dispatch failure
        console.error('Login error:', error);
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || 'Login failed', // Adjust based on your error response structure
        });

        return {
            type: LOGIN_FAILURE,
            payload: error, // Return the error for checking in the component
        };

    }
};
