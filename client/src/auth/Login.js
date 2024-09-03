import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { email, password } = formData;
    const navigate = useNavigate();
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            setMessage('Login successful!');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', JSON.stringify({ username: response.data.username })); // Save the username
            document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly; SameSite=Strict`;
            navigate('/');
        } catch (err) {
            setMessage(err.response?.data?.msg || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
            <form onSubmit={onSubmit} className="bg-[#12172d] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-2xl font-semibold text-center mb-6">Login</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChange}
                        required
                        minLength="8"
                        className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>

                <div className="mb-4 flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-sm text-purple-400 hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>

                <button type="submit" disabled={isLoading} className="w-full py-2 mt-6 bg-[#6200ea] text-white rounded-lg hover:bg-purple-700 transition duration-300">
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                {message && (
                    <div className={`mt-4 text-sm ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                )}

                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-400">Don't have an account?{' '}
                        <button type='button' onClick={() => navigate('/signup')} className="text-purple-400 hover:underline">
                            Signup
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
