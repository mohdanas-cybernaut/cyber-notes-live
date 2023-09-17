import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRouter.js";
import {noteRouter} from "./routes/noteRouter.js"
import mongoose from "mongoose";
import cors from "cors"
import passport from "passport";
import { UserModel } from "./models/User.js";
import multer from "multer"
import path from "path"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
// app.use()
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Db connected");
  })
  .catch((e) => {
    console.log(e);
  });

//Serialization
passport.serializeUser((user, done) => {
  done(null, user?.id);
});
passport.deserializeUser((id, done) => {
  UserModel.findById(id)
    .then((data) => done(null, data))
    .catch((e) => done(e, null));
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/pdf",noteRouter)
app.get("/out", (req, res) => {
  req.logOut((err) => {
    console.log(err);
  });
  res.redirect("/");
});
app.get("/api/auth", (req, res) => {
  if (req.isAuthenticated()) res.sendStatus(200);
  else res.sendStatus(401);
});
app.use(express.static(path.resolve('./dist')));

// Serve the React app on all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./dist', 'index.html'));
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
