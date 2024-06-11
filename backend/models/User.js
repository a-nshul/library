const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: 
  { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: 
  { 
    type: String, 
    required: true 
  },
  email: 
  { 
    type: String, 
    required: true 
  },
  contactNumber: 
  { 
    type: String, 
    required: true 
  },
},{timeseries:true});
const User = mongoose.model('User', UserSchema);
module.exports = User;