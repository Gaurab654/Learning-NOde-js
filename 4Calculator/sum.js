const sumRequestHandler = (req, res) => {
  console.log("In sum request handler", req.url);
  const body = [];
  req.on("data", (chunk) => body.push(chunk));
  req.on("end", () => {
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    const Result = Number(bodyObj.first) + Number(bodyObj.second);
    res.setHeader("Content-Type", "text/html");
    res.write(`<head><title>Practice Set</title></head>
        <body>
        <h1>Sum of ${Number(bodyObj.first)} and ${Number(bodyObj.second)} is ${Result}</h1>
        <a href="/">GO to Home</a>
        </body>
        `);
    return res.end();
  });
};
exports.sumRequestHandler = sumRequestHandler;
