// backend/routes/pet-routes.js
const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Pet routes');
});

module.exports = router;