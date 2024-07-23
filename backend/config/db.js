require('dotenv').config(); // load .env variables

const mysql = require('mysql2');

// create a connection to the mySQL database
const connection = mysql.createConnection({  
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Establish connection to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.'); 
});


module.exports = connection; //export connection object
