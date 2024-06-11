// src/pages/LoginPage.js
import React from 'react';
import Login from '../components/Login';

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
