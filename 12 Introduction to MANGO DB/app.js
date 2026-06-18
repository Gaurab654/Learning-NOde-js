// Core Module
const path = require("path");
const dns = require("dns");

// External Module
const express = require("express");

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");
const { mongoConnect, getDb } = require("./utils/databaseUtil");
const errorsController = require("./controllers/errors");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));

app.use(storeRouter);
app.use("/host", hostRouter);
app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const PORT = 3000;
//function calling
const startServer = async () => {
  try {
    const client = await mongoConnect();

    console.log("Database is connected basically" + client);

    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("DB connection failed:", err);
  }
};

startServer();
