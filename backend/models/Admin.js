const mongoose = require('mongoose');
const AdminSchema=new mongoose.Schema({
  username: 
  { type: String, 
    required: true, 
    unique: true 
  },
  name: 
  { type: String, 
    required: true 
  },
  password: 
  { type: String, 
    required: true 
  },
  email: 
  { type: String, 
    required: true 
  },
  contactNumber: 
  { type: String, 
    required: true 
  },
},
{timeseries:true});
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;