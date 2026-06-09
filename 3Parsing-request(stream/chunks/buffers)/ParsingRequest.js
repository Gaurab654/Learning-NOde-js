const http = require("http");
const fs = require("fs");
const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<h1 style="color:blue; text-align:center;">Welcome to Home page</h1>',
    );
    res.write('<h2 style="color:green;">Enter your Details::</h2>');
    res.write(
      '<form action="/submit-details" method="POST" style="font-family:Arial, sans-serif;">',
    );
    res.write(
      '<input type="text" id="name" name="name" placeholder="Enter your name" style="padding:8px; width:200px; border:1px solid #ccc; border-radius:4px;"><br><br>',
    );
    res.write('<label for="gender" style="font-weight:bold;">Gender:</label>');
    res.write('<input type="radio" id="male" name="gender" value="male">');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="female" name="gender" value="female">');
    res.write('<label for="female">Female</label><br><br>');
    res.write(
      '<button type="submit" style="padding:8px 16px; background-color:#007bff; color:white; border:none; border-radius:4px; cursor:pointer;">Submit</button>',
    );
    res.write("</form>");

    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method === "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      const bodyObject = {};
      for (const [key, value] of params) {
        bodyObject[key] = value;
      }
      //const bodyObject=Object.fromEntities(params);
      fs.writeFileSync("Ram.txt", JSON.stringify(bodyObject));
      console.log(bodyObject);
    });
    //   const arr = ["name", "Gaurab"];
    //const [key, value] = arr;
    //console.log(key);   // "name"
    //console.log(value); // "Gaurab"
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Nepal </title></head>");
  res.write("<body><p>This is a footer</p></body>");
  res.write("</html>");
  res.end();
};
module.exports = requestHandler;
