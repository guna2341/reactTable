const express = require('express');
const router = express.Router();
const authModel = require('../schema/authModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.post('/login', async (req, res) => {
    try {

        const { userName, password } = req.body;

        const user = await authModel.findOne({ userName: userName });
        if (!user) {
            return res.send("User not found,Please signUp to continue");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) { 
            return res.send("Invalid password");
        }

        const accessToken = jwt.sign({ userName: user.userName },process.env.ACCESS_KEY,{
                        expiresIn: "30s",
                    });

        const refreshToken = jwt.sign({ userName: user.userName }, process.env.REFRESH_KEY, {
            expiresIn:"1min"
        });


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 60*1000
        })
       return res.json({"accessToken" : accessToken});
    }
    catch (err) {
        console.log("Error logging in", err);
    }
})

module.exports = router;