const mongoose = require("mongoose");

const users = mongoose.Schema({
    cnic: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    landlineNum: String,
    faxNum: String,
    address: String,
    province: String,
    city: String,
    resetToken: { type: String, default: null, unique: true },
    resetTokenExpiry: { type: Date, default: null }
});


const Users = mongoose.model('user', users);

module.exports = Users;