// src/pages/SignIn.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ toggleForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            console.log('Dispatching login action');
            const resultAction = await dispatch(login(username, password));
            console.log('Result action:', resultAction); // Check the result in the console
    
            // Check for success based on action type and userId
            if (resultAction && resultAction.type === 'LOGIN_SUCCESS') {
                console.log('Login successful:', resultAction.payload);
    
                if (resultAction.payload.userId) {
                    console.log("userid from sign in: ", resultAction.payload.userId);
                    localStorage.setItem('userId', resultAction.payload.userId);
                    navigate('/home'); // Redirect to home
                } else {
                    setErrorMessage('Login failed. Please try again.'); // Handle case where userId is not present
                }
            } else {
                // Handle failure
                if (resultAction.payload && resultAction.payload.sets.length === 0) {
                    setErrorMessage('No sets found. Please check your credentials.');
                } else {
                    setErrorMessage('Invalid credentials. Please check your username and password.');
                }
            }
        } catch (error) {
            console.error('Unexpected error during login process:', error);
            setErrorMessage('An unexpected error occurred. Please try again.'); // This will be shown if the above code fails
        }
    };
    
    
    
    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm" style={{ backgroundColor: '#d89841' }}>
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Sign In
                </button>
            </form>
            {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
            <p className="mt-4 text-center">
                Don't have an account?{' '}
                <button onClick={toggleForm} className="text-blue-500">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default SignIn;
