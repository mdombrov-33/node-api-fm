import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

import { protect } from "./utils/auth";
import { createUser, signIn } from "./handlers/users";
import { error } from "console";

const express = require("express");

const app = express();

// const customLogger = (message) => (req, res, next) => {
//   console.log(`Hello from ${message}`);
//   next();
// };

app.use(cors()); // allow cross-origin requests
app.use(morgan("dev")); // log requests to the console
app.use(express.json()); // allow client to send json data
app.use(express.urlencoded({ extended: true })); // take query string and put it in a object
// app.use(customLogger("custom logger")); // custom logger

app.get("/", (req, res) => {
  console.log("Hello from express");
  res.status(200);
  res.json({ message: "Hello" });
});

app.use("/api", protect, router);

app.post("/user", createUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
