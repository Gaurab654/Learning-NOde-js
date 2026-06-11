const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use((req, res, next) => {
  console.log("First Dummy Middleware", req.url, req.method);
  next();
});
app.use((req, res, next) => {
  console.log("Second Dummy Middleware", req.url, req.method);
  next();
});
app.get("/", (req, res, next) => {
  console.log("Handling For GET", req.url, req.method);
  res.send(
    `<h1>Nepal is a landlocked country having an area of 1234.....</h1>`,
  );
  next();
});
app.get("/contact-us", (req, res, next) => {
  console.log("Handling For GET", req.url, req.method);
  res.send(
    `<h1>PLease give your details</h1>
    <form action="contact-us" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  <br><br>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  <br><br>

  <button type="submit">Submit</button>
</form>`,
  );
  next();
});
app.use((req, res, next) => {
  console.log("This shouldnt run", req.url, req.method);
  next();
});
app.use(bodyParser.urlencoded());
app.post("/contact-us", (req, res, next) => {
  console.log("Handling contact us for POST", req.url, req.method, req.body);
  res.send(`<h1>We will contact you man</h1>`);
  next();
});
const Port = 3004;
app.listen(Port, () => {
  console.log(`Server is running at address localhost:${Port}`);
});
