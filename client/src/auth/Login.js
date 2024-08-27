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
            document.cookie = `token=${response.data.token}; path=/; secure; HttpOnly; SameSite=Strict`;
            navigate('/');
        } catch (err) {
            setMessage(err.response?.data?.msg || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                    minLength="8"
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {message && <div style={{ color: message.includes('successful') ? 'green' : 'red', marginTop: '10px' }}>
                {message}
            </div>}
            <div className="links">
                <p>Don't have an account?{' '}
                    <button type='button' onClick={() => navigate('/signup')}>Signup
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
