const express = require('express');
const router = express.Router();
const authModel = require('../schema/authModel');
const bcrypt = require("bcrypt");

router.post("/signUp", async (req, res, next) => {
    try {
        const { userName, password } = req?.body;
        const user = await authModel.findOne({ userName: userName });
        if (user) {
            return res.send("User already exists");
        }
        if (userName === '' || password === '') { 
            return res.send("Please provide both username and password");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new authModel({ userName: userName, password: hashedPassword });
        newuser.save();
        return res.status(201).send("User created successfully");
     }
    catch (err) {
        console.log("Erron in signUp", err);
        return res.status(500).send("Some error occured,try again");
    }
});

module.exports = router;