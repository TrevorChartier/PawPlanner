import express from 'express';
import petRoutes from './routes/pet-routes.js';
import taskRoutes from './routes/task-routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON

app.use(cors({
  origin: 'http://127.0.0.1:5500'  // Middleware to allow requests from frontend URL
}));

app.use('/api/pets', petRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke, please try again later...');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
