const mysql = require("mysql");


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3332",
  database: "products_system_db",
  port: "3000",
});


db.query("SELECT 1 + 1 AS solution", function (err) {
  if (err) throw err;
  console.log("Conectado a la base de datos");
});

module.exports = db;
