// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3005/api',
});

export const fetchBooks = () => API.get('/books');
export const createBook = (book) => API.post('/books', book);
export const deleteBook = (id) => API.delete(`/books/${id}`);

export const fetchUserTransactions = (userId) => API.get(`/transactions/${userId}`);
export const createTransaction = (transaction) => API.post('/transactions', transaction);

export const adminLogin = (credentials) => API.post('/admin/login', credentials);
