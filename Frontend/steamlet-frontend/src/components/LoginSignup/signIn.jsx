import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ toggleForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        // Instead of making an API call, navigate directly to the home page
        navigate('/home'); // Change '/home' to your desired path
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
