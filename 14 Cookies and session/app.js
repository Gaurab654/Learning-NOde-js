// External Module
const express = require("express");
const session = require("express-session");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_PATH =
  "mongodb+srv://nachhiring70:gaurab123456@cluster0.r73dpbb.mongodb.net/Database?appName=Cluster0";

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const errorsController = require("./controllers/errors");
const rootDir = require("./utils/pathUtils");
const path = require("path");
const { default: mongoose } = require("mongoose");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use(express.urlencoded());
app.use(
  session({
    secret: "Gaurab nachhiring",
    resave: false,
    saveUninitialized: true,
    store,
  }),
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3000;

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
