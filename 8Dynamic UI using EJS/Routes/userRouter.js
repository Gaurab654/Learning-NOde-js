//External modules
const express = require("express");
//core modules
const path = require("path");
//local modules
const { registeredHomes } = require("./hostRouter");
const userRouter = express.Router();
const rootDir = require("../utils/pathUtils");

userRouter.get("/", (req, res, next) => {
  //  res.sendFile(path.join(__dirname, "../", "views", "home.html"));
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  //sending ejs
  res.render("Home", { registeredHomes: registeredHomes });
});
module.exports = userRouter;
