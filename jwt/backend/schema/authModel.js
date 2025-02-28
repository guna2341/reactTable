const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    userName: String,
    password: String,
    refreshToken: String,
})

const authModel = mongoose.model("UserDetails", authSchema);

module.exports = authModel;