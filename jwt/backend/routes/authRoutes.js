const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const authModel = require("../schema/authModel");

dotenv.config();
const router = express.Router();

// Middleware
router.use(cookieParser());
router.use(express.json());

// Session middleware (Required for Passport)
router.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

router.use(passport.initialize());
router.use(passport.session());

// Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await authModel.findOne({ googleId: profile.id });

        if (!user) {
          user = new authModel({
            googleId: profile.id,
            userName: profile.displayName,
            email: profile.emails[0].value,
          });
          await user.save();
        }

        const payload = { userName: user.userName, email: user.email };

        // Generate Access & Refresh Tokens
        const accessToken = jwt.sign(payload, process.env.ACCESS_KEY, {
          expiresIn: "30s",
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {
          expiresIn: "1min",
        });

        return done(null, { user, accessToken, refreshToken });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize & Deserialize User
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google Login Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const { accessToken, refreshToken } = req.user;

    // Set tokens in cookies
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    res.redirect("http://localhost:5173/profile"); // Redirect to frontend
  }
);

// Logout Route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.redirect("/");
  });
});

module.exports = router;
