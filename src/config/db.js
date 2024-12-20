const mysql = require("mysql2");

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: "127.0.0.1", // Ganti dengan host database Anda
  user: "root", // Ganti dengan username database Anda
  password: "root", // Ganti dengan password database Anda
  database: "ftlg_master", // Ganti dengan nama database Anda
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

module.exports = db;
