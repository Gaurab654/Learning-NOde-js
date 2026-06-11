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
/*https://www.google.com/search?q=ipl+match+cricket%2Fhg&sca_esv=a5f6b3e87b7fb00
4&sxsrf=ANbL-n7HlGITC1kyAYi7hU7lb24GBkvKeQ%3A1781121861998&ei=RcMpavq8PKuWwcsP1t
SQ2Ak&biw=1366&bih=633&ved=0ahUKEwi684r_u_2UAxUrS3ADHVYqBJsQ4dUDCBA&uact=5&oq=ipl
+match+cricket%2Fhg&gs_lp=Egxnd3Mtd2l6LXNlcnAiFGlwbCBtYXRjaCBjcmlja2V0L2hnMgUQIRig
ATIFECEYoAEyBRAhGKABMgUQIRigAUjrFVCuDVjbD3ABeAGQAQCYAbQBoAHfA6oBAzAuM7gBA8gBAPgBAZ
gCBKAC-QPCAgoQABhHGNYEGLADwgINEAAYgAQYigUYQxiwA8ICDhAAGOQCGNYEGLAD2AEBwgIXEC4Y3AYY
uAYY2gYY2AIYyAMYsAPYAQHCAgYQABgWGB6YAwCIBgGQBhO6BgYIARABGAmSBwMxLjOgB6oPsgcDMC4zuA
fxA8IHBTAuMS4zyAcQgAgB&sclient=gws-wiz-serp */
