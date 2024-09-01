import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password length validation
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/auth/signup', {
        username,
        email,
        password,
      });
      
      console.log("User signed up successfully:", response.data);
      navigate('/login');
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      console.error("Error signing up:", 
        error);
      setErrorMessage("User Already exists");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/auth/signup")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="bg-[#12172d] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button type="submit" className="w-full py-2 mt-6 bg-[#6200ea] text-white rounded-lg hover:bg-purple-700 transition duration-300">Sign Up</button>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-400">Have an account?{' '}
            <button type="button" onClick={() => navigate('/login')} className="text-purple-400 hover:underline">Log in</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
