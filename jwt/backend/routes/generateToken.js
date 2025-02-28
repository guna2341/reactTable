const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/refresh', (req, res ) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(403).send("Login");
        }
        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
            if (err) {
                return res.status(403).send("Invalid token");
            }
            else
                {
                const accessToken = jwt.sign(
                { userName: user.userName },
                process.env.ACCESS_KEY,
                {
                    expiresIn: "30s",
                }
            );
                return res.json({accessToken: accessToken });
        }
        });

    }
    catch (err) {
        console.log("Error while refreshing token", err);
        return res.status(500).send("Some error occurred, try again");
    }
})

module.exports = router;