const http = require("http");
const requestHandler = require("./ParsingRequest");
const server = http.createServer(requestHandler);
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`server port is localhost:${PORT}`);
});
