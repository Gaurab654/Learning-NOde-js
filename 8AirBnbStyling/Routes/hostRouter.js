//External modules
const express = require("express");
//core modules
const path = require("path");
const hostRouter = express.Router();
const rootDir = require("../utils/pathUtils");
hostRouter.get("/host/add-home", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "addHome.html"));
  res.sendFile(path.join(rootDir, "views", "addHome.html"));
});

hostRouter.post("/host/add-home", (req, res, next) => {
  console.log(req.body);

  // res.sendFile(path.join(__dirname, "../", "views", "homeAdded.html"));
  res.sendFile(path.join(rootDir, "views", "homeAdded.html"));
});
module.exports = hostRouter;
