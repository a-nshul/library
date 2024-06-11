// src/pages/AdminPage.js
import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-4 mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <main>
        <AdminDashboard />
      </main>
    </div>
  );
}

export default AdminPage;
