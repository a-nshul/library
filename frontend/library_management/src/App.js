import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/catalog" element={<UserPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
