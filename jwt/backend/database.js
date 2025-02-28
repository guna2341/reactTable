const express = require('express');
const mongoose = require('mongoose');

function Database() {
    try {
        mongoose.connect("mongodb://localhost:27017/authentication");
        console.log("Database connected successfully");
    }
    catch (err) {
        console.log("Error occured while connecting", err.message);
    }
}

module.exports = Database;