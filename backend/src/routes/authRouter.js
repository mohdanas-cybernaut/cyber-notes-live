import express from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import passport from "passport";
import { UserModel } from "../models/User.js";
const authRouter = express.Router();
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      //   userProfileURL:'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log( profile);
      UserModel.findOrCreate(
        { googleId: profile.id },
        { email: profile.emails[0]?.value , imageUrl: profile.photos[0]?.value },
        (err, user) => {
          return cb(err, user);
        }
      );
    }
  )
);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

export { authRouter };
