const mysql = require("mysql2");


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1123581321Emilio",
  database: "products_system_db",
  port: "3306",
});



db.connect(function (err) {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log("Conectado a la base de datos MySQL con ID:", db.threadId);
});

module.exports = db;
