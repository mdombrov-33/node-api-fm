import express from "express";
import router from "./router";
import morgan from "morgan";

const express = require("express");

const app = express();

// const customLogger = (message) => (req, res, next) => {
//   console.log(`Hello from ${message}`);
//   next();
// };

app.use(morgan("dev")); // log requests to the console
app.use(express.json()); // allow client to send json data
app.use(express.urlencoded({ extended: true })); // take query string and put it in a object
// app.use(customLogger("custom logger")); // custom logger

app.get("/", (req, res) => {
  console.log("Hello from express");
  res.status(200);
  res.json({ message: "Hello" });
});

app.use("/api", router);

export default app;
