import React, { useState } from 'react';

const SignUp = ({ toggleForm }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Directly toggle to sign-in form
        toggleForm(); // Switch to the sign-in form
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
