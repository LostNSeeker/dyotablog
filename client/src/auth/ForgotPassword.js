import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/auth/forgot-password', { email });
            setMessage('Password reset link has been sent to your email.');
        } catch (err) {
            setMessage(err.response?.data?.msg || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
            <form onSubmit={onSubmit} className="bg-[#12172d] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-2xl font-semibold text-center mb-6">Forgot Password</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <button type="submit" className="w-full py-2 mt-6 bg-[#6200ea] text-white rounded-lg hover:bg-purple-700 transition duration-300">
                    Send Reset Link
                </button>

                {message && (
                    <div className={`mt-4 text-sm text-${message.includes('link') ? 'green' : 'red'}-500`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default ForgotPassword;
