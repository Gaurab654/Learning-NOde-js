// Core Module
const path = require("path");

// External Module
const express = require("express");
const dns = require("dns");

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));
dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(errorsController.pageNotFound);
const PORT = 3001;
const DB_PATH =
  "mongodb+srv://nachhiring70:gaurab123456@cluster0.r73dpbb.mongodb.net/MongoDatabase?appName=Cluster0";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
