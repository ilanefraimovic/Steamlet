import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ toggleForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("--")
            const response = await axios.post('http://localhost:3000/api/v1/users/create', { // Replace with your actual API endpoint
                userName: username,
                password: password,
            });

            console.log('User created:', response.data);

            // Directly toggle to sign-in form
            toggleForm(); // Switch to the sign-in form
        } catch (error) {
            console.log(error)
            if (error.response) {
                // If the server responded with a status code outside of the 2xx range
                setErrorMessage(error.response.data.error || 'Error creating user');
            } else {
                // If there was an error in setting up the request
                setErrorMessage('Error creating user');
            }
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm" style={{ backgroundColor: '#e1c289' }}>
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
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
                    Sign Up
                </button>
            </form>
            {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
            <p className="mt-4 text-center">
                Already have an account?{' '}
                <button onClick={toggleForm} className="text-blue-500">
                    Sign In
                </button>
            </p>
        </div>
    );
};

export default SignUp;
