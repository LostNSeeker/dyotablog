import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        try {
            const res = await axios.post('http://localhost:5001/api/auth/reset-password', { token, newPassword });
            setMessage(res.data.msg);
            setError('');
            setTimeout(() => {
                navigate('/login'); // Redirect to login after successful password reset
            }, 1000);
        } catch (err) {
            setError(err.response.data.msg || 'Error resetting password');
            setMessage('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="bg-[#12172d] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-2xl font-semibold text-center mb-6">Reset Password</h2>
                {message && <div className="text-green-500 text-sm text-center mb-4">{message}</div>}
                {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-300">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-300">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-6 bg-[#6200ea] text-white rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
