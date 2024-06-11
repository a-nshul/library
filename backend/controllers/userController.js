const User = require('../models/User');
const mongoose = require('mongoose');
const createUser = async (req, res) => {
  try {
    const { username, name, email, contactNumber } = req.body;
    const existingusername=await User.findOne({username});
    if(existingusername){
      return res.status(400).json({message:'username already exists'});
    }
    const newUser =await User.create({
      username,
      name,
      email,
      contactNumber,
    })
    res.status(200).json({newUser,message:"User created successfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const countUser=await User.countDocuments();
    res.status(200).json({users,message:"User found successfully",countUser});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Please provide a valid ID to update user" });
    }
    const { username, name, email, contactNumber } = req.body;
    if(!username || !name || !email || !contactNumber){
      return res.status(400).json({message:"Please provide all the details to the update user"})
    }
    const updatedUser = await User.findByIdAndUpdate(id, { username, name, email, contactNumber }, { new: true });
    res.status(200).json({updatedUser,message:"User updated successfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

const deleteUser = async (req, res) => {
  try {
    const{id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Please provide a valid ID to delete user" });
    }
    const deleteUser=await User.findByIdAndDelete(id);
    res.status(200).json({deleteUser,message:"User deleted successfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
};
