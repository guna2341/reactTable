const express = require('express');
const router = express.Router();
const authentication = require('./validateLogin');
const authModel = require('../schema/authModel');

router.get('/profile', authentication, async (req, res, next) => {
    const users = await authModel.find({});
    return res.json({user:req.user.userName,totalUsers:users});
})

module.exports = router;