import express, { Request, Response } from 'express';
import authRoutes from './routes/auth';

const app = express();
const port = 5000;

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});