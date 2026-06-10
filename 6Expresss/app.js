const http = require("http");
const express = require("express");
const app = express();
app.use("/", (req, res, next) => {
  console.log("This is a first middleware,", req.url, req.method);
  res.send("<p>Nepal is a landlocked country</>");
  next();
});
app.use((req, res, next) => {
  console.log("This is a Second middleware,", req.url, req.method);
});
const server = http.createServer(app);
const PORT = 3004;
server.listen(PORT, () => {
  console.log(`server port is localhost:${PORT}`);
});
