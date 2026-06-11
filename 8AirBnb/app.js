//external module
const express = require("express");
const bodyParser = require("body-parser");
//local module
const userRouter = require("./Routes/userRouter");
const rootDir = require("./utils/pathUtils");

//core modules
const path = require("path");

const hostRouter = require("./Routes/hostRouter");
const app = express();
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});
app.use(express.urlencoded());
app.use(userRouter);

app.use(hostRouter);
app.use((req, res, next) => {
  // res.sendFile(path.join(__dirname, "views", "404.html"));
  res.sendFile(path.join(rootDir, "views", "404.html"));
});
const Port = 3005;
app.listen(Port, () => {
  console.log(`Server is running at address localhost:${Port}`);
});
