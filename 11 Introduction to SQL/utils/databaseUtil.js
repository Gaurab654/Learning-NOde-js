const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "akstwec1946@@##",
  database: "nodedatabase",
});
module.exports = pool.promise();
