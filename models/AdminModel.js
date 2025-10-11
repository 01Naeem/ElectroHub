const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    adminname:{
        type: String,
    },
    adminid:{
        type: String,
        required: [true, "Admin ID Must Required"]
    },
    password:{
        type: String,
        required: [true, "Admin Password Must Required"]
    }
})


module.exports = mongoose.model('Admin', AdminSchema);