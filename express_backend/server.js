import express from "express";
import bodyParser from "body-parser";
import { hashIt } from "./HashingPassword.js";

const app = express();

const PORT = 3001;

let DB = [];

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

app.listen(PORT, () => {
  console.log(`Running on the PORT: ${PORT}`);
});
