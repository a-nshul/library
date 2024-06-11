const express = require('express');
const app = express();
const port = 3005;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes =require('./routhes/bookRoutes');
const userRoutes = require('./routhes/userRoutes');
const adminRoutes = require('./routhes/adminRoutes');
const transactionRoutes =require('./routhes/transactionRoutes')
const cors = require("cors");
mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(bodyParser.json());
// Use routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/transactions', transactionRoutes);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});