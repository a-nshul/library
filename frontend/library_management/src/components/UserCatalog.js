// src/components/UserCatalog.js
import React, { useState, useEffect } from 'react';
import { fetchBooks, createTransaction } from '../api/api';

function UserCatalog() {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState('');  // Should be set from context or props

  useEffect(() => {
    fetchBooks().then((res) => setBooks(res.data));
  }, []);

  const handleBorrowBook = (bookId) => {
    createTransaction({ userId, bookId, dueDate: new Date(), transactionType: 'borrowed' }).then(() => {
      setBooks(books.map((book) => book._id === bookId ? { ...book, availabilityStatus: false } : book));
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Library Catalog</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="flex justify-between items-center">
            {book.name} by {book.author} - {book.availabilityStatus ? 'Available' : 'Unavailable'}
            {book.availabilityStatus && (
              <button className="bg-green-500 text-white p-2" onClick={() => handleBorrowBook(book._id)}>Borrow</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCatalog;
