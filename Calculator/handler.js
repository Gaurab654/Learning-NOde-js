const { sumRequestHandler } = require("./sum");
const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
<head>
       <title>My Calculator Portal</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; margin-top: 100px;">

    <h1 style="color: #007bff; font-size: 40px;">
        Welcome to My Calculator Portal
    </h1>

    <p style="font-size: 18px; color: #555;">
        Perform quick and easy calculations.
    </p>

    <a 
        href="/calculator"
        style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            font-size: 18px;
            border-radius: 8px;
            margin-top: 20px;
        "
    >
        Open Calculator
    </a>

</body>
</html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Calculator App</title>
</head>

<body style="
    margin: 0;
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #74ebd5, #ACB6E5);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
">

    <div style="
        background: white;
        padding: 30px;
        border-radius: 15px;
        width: 350px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        text-align: center;
    ">

        <h1 style="
            margin-bottom: 20px;
            color: #333;
        ">
            Simple Calculator
        </h1>

        <form action="/calculator-result" method="POST">

            <input 
                type="text" 
                name="first" 
                placeholder="Enter first number"
                style="
                    width: 100%;
                    padding: 12px;
                    margin: 10px 0;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-size: 16px;
                "
                
            >

            <input 
                type="text" 
                name="second" 
                placeholder="Enter second number"
                style="
                    width: 100%;
                    padding: 12px;
                    margin: 10px 0;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-size: 16px;
                "
            
            >

            <button 
                type="submit"
                value="Sum"
                style="
                    width: 100%;
                    padding: 12px;
                    margin-top: 15px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                "
            >
                Calculate
            </button>

        </form>

    </div>

</body>
</html>
        `);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculator-result" &&
    req.method === "POST"
  ) {
    return sumRequestHandler(req, res);
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`<head><title>Practice Set</title></head>
        <body>
        <h1>404 page doesnt exist</h1>
        <a href="/">GO to Home</a>
        </body>`);
  return res.end();
};

module.exports = requestHandler;
