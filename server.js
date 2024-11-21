Clone the Repository (if applicable).

Initialize the Node.js Environment:

bash
npm init -y  
Install Necessary Dependencies:

bash
npm install express mysql2 dotenv nodemon  
Create server.js and .env Files.

Setup .env File:
Update the .env file with your database credentials:

env
DB_USERNAME=root  
DB_HOST=localhost  
DB_PASSWORD=your_password   # Replace with your MySQL password  
DB_NAME=hospital_db  
server.js File Configuration
Here's how your server.js file should look:

javascript
const express = require('express');  
const mysql = require('mysql2');  
const dotenv = require('dotenv');  

dotenv.config();  

const app = express();  

// Setting up the MySQL connection  
const db = mysql.createConnection({  
  host: process.env.DB_HOST,  
  user: process.env.DB_USERNAME,  
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME  
});  

// Connect to the database  
db.connect((err) => {  
  if (err) {  
    console.error('Database connection failed:', err);  
    return;  
  }  
  console.log('Connected to the database');  
});  

// 1. Retrieve all patients  
app.get('/patients', (req, res) => {  
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';  
  db.query(query, (error, results) => {  
    if (error) {  
      return res.status(500).json({ error: 'An error occurred while retrieving patients' });  
    }  
    res.json(results);  
  });  
});  

// 2. Retrieve all providers  
app.get('/providers', (req, res) => {  
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';  
  db.query(query, (error, results) => {  
    if (error) {  
      return res.status(500).json({ error: 'An error occurred while retrieving providers' });  
    }  
    res.json(results);  
  });  
});  

// 3. Filter patients by First Name  
app.get('/patients/filter', (req, res) => {  
  const firstName = req.query.first_name;  
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';  
  db.query(query, [firstName], (error, results) => {  
    if (error) {  
      return res.status(500).json({ error: 'An error occurred while filtering patients' });  
    }  
    res.json(results);  
  });  
});  

// 4. Retrieve all providers by their specialty  
app.get('/providers/specialty', (req, res) => {  
  const specialty = req.query.specialty;  
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';  
  db.query(query, [specialty], (error, results) => {  
    if (error) {  
      return res.status(500).json({ error: 'An error occurred while retrieving providers by specialty' });  
    }  
    res.json(results);  
  });  
});  

// Listen to the server  
const PORT = 3000;  
app.listen(PORT, () => {  
  console.log(`Server is running on http://localhost:${PORT}`);  
});  
Running the Server
After you’ve set up everything as detailed above, run your server with:

bash
nodemon server.js  


Testing the Endpoints
You can use tools like Postman or cURL to test your API endpoints:

Retrieve all patients:
GET: http://localhost:3000/patients
Retrieve all providers:
GET: http://localhost:3000/providers
Filter patients by First Name:
GET: http://localhost:3000/patients/filter?first_name=John
Retrieve all providers by their specialty:
GET: http://localhost:3000/providers/specialty?specialty=Cardiology
