const express = require('express');
const app = express();
const cors = require('cors');
const Database = require('./database');
const signUp = require('./routes/signUp');
const login = require('./routes/login');
const profile = require('./routes/profile');
const generateToken = require('./routes/generateToken');
const cookieParser = require('cookie-parser');
Database();

app.use(cookieParser());  
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(signUp);
app.use(login);
app.use(profile);
app.use(generateToken);

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(3000, () => console.log('Server is running on port 3000'));
