const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

const createTransaction = async (req, res) => {
    const { userId, bookId, dueDate, transactionType } = req.body;

    try {
      // Check if the book is available for borrowing
      if (transactionType === 'borrowed') {
        const book = await Book.findById(bookId);
        if (!book.availabilityStatus) {
          return res.status(400).json({ message: 'Book is currently unavailable' });
        }
      }
  
      // Create the transaction
      const newTransaction = await Transaction.create({
        user: userId,
        book: bookId,
        dueDate,
        transactionType,
      });
  
      // Update the book availability status
      if (transactionType === 'borrowed') {
        await Book.findByIdAndUpdate(bookId, { availabilityStatus: false });
      } else if (transactionType === 'returned') {
        await Book.findByIdAndUpdate(bookId, { availabilityStatus: true });
      }
  
      res.status(201).json(newTransaction);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const getUserTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ user: userId }).populate('book');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports={createTransaction,getUserTransactions}