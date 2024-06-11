const Book = require('../models/Book');
const mongoose = require('mongoose');
const createBook = async (req, res) => {
  try {
    const {name,author,availabilityStatus}=req.body;
    if(!name || !author || !availabilityStatus){
      return res.status(400).json({message:"Please provide all the details to create a book"})
    }
    const newBook=await Book.create({
      name,
      author,
      availabilityStatus
    })
    res.status(200).json({newBook,message:"Book created successfully"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
  
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const countBook =await Book.countDocuments();
    res.status(200).json({books,message:"Book found successfully",countBook,})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Please provide a valid ID to update user" });
    }
    const {name,author,availabilityStatus}=req.body;
    if(!name || !author || !availabilityStatus){
      return res.status(400).json({message:"Please provide all the details to update a book"})
    }
    const updatedBook=await Book.findByIdAndUpdate(id,{name,author,availabilityStatus},{new:true});
    res.status(200).json({updatedBook,message:"Book updated successfully"});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

const deleteBook = async (req, res) => {
  try {
    const{id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Please provide a valid ID to delete user" });
    }
    const deleteBook=await Book.findByIdAndDelete(id);
    res.status(200).json({deleteBook,message:"Book deleted successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook
};
