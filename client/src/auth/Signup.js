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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="links">
        <p>Have an account?{' '}
          <button type="button" onClick={() => navigate('/login')}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
