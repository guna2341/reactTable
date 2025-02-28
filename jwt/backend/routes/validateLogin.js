const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token required" });
  }

  const accessToken = authHeader.split(" ")[1]; 

  jwt.verify(accessToken, process.env.ACCESS_KEY, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Access token expired" });
      }
      return res.status(403).json({ message: "Invalid access token" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJwt;
