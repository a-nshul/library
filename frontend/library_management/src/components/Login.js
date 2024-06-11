// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/api';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleLogin = () => {
    setError(null); 
    adminLogin(credentials)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/admin');
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
        setError(errorMessage);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <input
        className="border p-2 mb-2"
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        className="border p-2 mb-2"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button className="bg-blue-500 text-white p-2" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
