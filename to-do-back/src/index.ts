import express, { Request, Response } from 'express';
import authRoutes from './routes/auth';
import taskListRoutes from './routes/tasklist';
import taskRoutes from './routes/tasks';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/tasklists', taskListRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});