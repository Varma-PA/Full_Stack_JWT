import express from "express";
import bodyParser from "body-parser";
import { hashIt } from "./HashingPassword.js";
// import passport from "passport";
import { passport } from "./Passport_Init.js";
import "dotenv/config";
import session from "express-session";
import jwt from "jsonwebtoken";

const app = express();

const PORT = 3001;

const JWT_SECRET = process.env.JWT_SECRET;

app.use(
  session({
    secret: "your_secret_key",
    resave: true,
    saveUninitialized: true,
  })
);

let DB = [];

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send({ hello: "world" });
});

app.post("/test", async (req, res) => {
  const password = req.body.password;
  try {
    const hashedPassword = await hashIt(password);
    res.status(200).send({ hashedPassword });
  } catch (err) {
    console.log(err.error);
    res.status(500).send({ error: err });
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  (req, res) => {
    const token = jwt.sign(req.user, JWT_SECRET);

    res.redirect(`/dashboard?token=${token}`);

    // res.send({ token });
  }
);

app.get("/dashboard", (req, res) => {
  res.send(req.query.token);
});

app.listen(PORT, () => {
  console.log(`Running on the PORT: ${PORT}`);
});
