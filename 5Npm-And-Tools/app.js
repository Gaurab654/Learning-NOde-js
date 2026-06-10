const http = require("http");
const server = http.createServer((req, res) => {
  console.log("In sum request handler is at", req.url);
});
const PORT = 3004;
server.listen(PORT, () => {
  console.log(`server port is localhost:${PORT}`);
});
