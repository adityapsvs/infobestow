const mongoose = require('mongoose');

const schema = new mongoose.Schema({}, { strict: false });

const User =  mongoose.model('User', schema);

module.exports = User;
