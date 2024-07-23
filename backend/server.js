require('dotenv').config(); // load .env variables

const express = require('express'); // import express library
const app = express(); // initialize express app

const PORT = process.env.PORT || 3000; // set port

app.use(express.json()); // Middleware to parse JSON 

// Test route to send Hello World response to root requests
app.get('/', (req, res) => {
    res.send('Hello World!');
  }); 

// Define Routes
const petRoutes = require('./routes/pet-routes');
const taskRoutes = require('./routes/task-routes');

app.use('/pets', petRoutes);
app.use('/tasks', taskRoutes);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
