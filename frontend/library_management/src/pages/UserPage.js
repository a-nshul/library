// src/pages/UserPage.js
import React from 'react';
import UserCatalog from '../components/UserCatalog';

function UserPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-4 mb-4">
        <h1 className="text-2xl font-bold">Library Catalog</h1>
      </header>
      <main>
        <UserCatalog />
      </main>
    </div>
  );
}

export default UserPage;
