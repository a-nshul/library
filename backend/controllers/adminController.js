const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');
const jwtSecret = 'your_jwt_secret';

const createAdmin = async (req, res) => {
  try {
    const {username,name,password,email,contactNumber}=req.body;
    const existingusername=await Admin.findOne({username});
    if(existingusername){
          return res.status(400).json({message:'username already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({
          username,
          name,
          password:  hashedPassword,
          email,
          contactNumber,
        });
        res.status(200).json({newAdmin,message:"Admin created successfully"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) 
    return res.status(404).json({ message: 'Admin not found or username is incorrect' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) 
    return res.status(400).json({ message: 'Invalid credentials or password is incorrect' });
    const token = jwt.sign({ id: admin._id, username: admin.username }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token ,message:"admin suceesfully login "});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({admins,message:"admin founds successfully"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Please provide a valid ID to update admin' });
    }
    const { username, name, email, contactNumber } = req.body;
    if(!username || ! name || ! email || ! contactNumber){
      return res.status(400).json({message:"Please provide all the details to the update admin"})
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { username, name, email, contactNumber },
      { new: true }
    );
    res.status(200).json({updatedAdmin,message:"Admin data successfully updated"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Please provide a valid ID to delete admin' });
    }
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    const deleteAdmin=await Admin.findByIdAndDelete(id);
    res.status(200).json({ deleteAdmin,message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAdmin,
  adminLogin,
  getAdmins,
  updateAdmin,
  deleteAdmin
};
