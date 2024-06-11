import React, { useState, useEffect } from 'react';
import { fetchBooks, createBook, deleteBook } from '../api/api';

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ name: '', author: '', availabilityStatus: true });

  useEffect(() => {
    fetchBooks().then((res) => setBooks(res.data));
  }, []);

  const handleAddBook = () => {
    createBook(newBook).then((res) => {
      setBooks([...books, res.data]);
      setNewBook({ name: '', author: '', availabilityStatus: true });
    });
  };

  const handleDeleteBook = (id) => {
    deleteBook(id).then(() => setBooks(books.filter((book) => book._id !== id)));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <h3 className="text-xl">Add New Book</h3>
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Book Name"
          value={newBook.name}
          onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleAddBook}>Add Book</button>
      </div>
      <h3 className="text-xl">Book List</h3>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="flex justify-between items-center">
            {book.name} by {book.author} - {book.availabilityStatus ? 'Available' : 'Unavailable'}
            <button className="bg-red-500 text-white p-2" onClick={() => handleDeleteBook(book._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
