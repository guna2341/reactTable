const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

require('dotenv').config();

const posts = [
    {
        name: "guna",
        title:"post 1"
    },
    {
        name: "rahul",
        title:"post 2"
    }
]

const authenticateToken = (req, res, next) => {
    const token = (req?.cookies?.access_token);
    if (!token) return res.status(403).json({ message: "Access denied" });
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403);
        else {
            req.user = user;
            next();
        }
    })
}

app.post('/login', (req, res) => {
    const userName = req.body.userName
    const user = { name: userName }
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN,{expiresIn:"10min"});
    res.cookie("access_token", access_token, {
        httpOnly: true,
        sameSite: "Strict",
        secure:true
    });
    res.json({ message: "Logged in successfully" });
})


app.get('/posts', authenticateToken, (req, res) => {
    res.json(req.user.name);
})

app.get("/", (req, res) => {
  res.json(posts);
}); 

app.listen((8000),() => console.log("Server running on port 8000"))