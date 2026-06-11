//External modules
const express = require("express");
//core modules
const path = require("path");
//local modules
const userRouter = express.Router();
const rootDir = require("../utils/pathUtils");

userRouter.get("/", (req, res, next) => {
  //  res.sendFile(path.join(__dirname, "../", "views", "home.html"));
  res.sendFile(path.join(rootDir, "views", "home.html"));
});
module.exports = userRouter;
