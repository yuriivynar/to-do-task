import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

router.use((req, res, next) => {
  Promise.resolve(authMiddleware(req, res, next)).catch(next);
});

router.post('/', async (req: Request, res: Response) => {
  const { title, description, taskListId } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        taskListId: Number(taskListId),
        completed: false,
      },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;