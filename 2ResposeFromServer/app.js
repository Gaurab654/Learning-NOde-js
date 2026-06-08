const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1 >Welcome to Home page</h1>");
    res.write("<h2 >Enter your Details::</h2>");
    res.write('<form action="/submit-details" method="POST">');
    res.write(
      '<input type="text" id="name" name="name" placeholder="Enter your name"><br><br>',
    );
    res.write('<label for="gender">Gender:</label>');
    res.write('<input type="radio" id="male" name="gender" value="male">');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="female" name="gender" value="female">');
    res.write('<label for="female">Female</label><br><br>');
    res.write('<button type="submit">Submit</button>');
    res.write("</form>");

    return res.end();
  } else if (req.url === "/product") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Nepal </title></head>");
    res.write("<body><p>This is a /product URl</p></body>");
    res.write("</html>");
    return res.end();
  } else if (
    req.method == "POST" &&
    req.url.toLowerCase() === "/submit-details"
  ) {
    fs.writeFileSync("user-details.txt", "This if a text file ");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Nepal </title></head>");
  res.write(
    "<body><p>Nepal is a landlocked countery having an area of 147181 sq km</p></body>",
  );
  res.write("</html>");
  res.end();
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server port is localhost:${PORT}`);
});
