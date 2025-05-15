import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

router.use((req, res, next) => {
  Promise.resolve(authMiddleware(req, res, next)).catch(next);
});

router.post('/', async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const taskList = await prisma.taskList.create({
      data: {
        title,
        collaborators: {
          create: [{ userId: req.user!.id, role: 'admin' }],
        },
      },
    });
    res.status(201).json(taskList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const taskLists = await prisma.taskList.findMany({
      where: {
        collaborators: {
          some: { userId: req.user!.id },
        },
      },
      include: { tasks: true, collaborators: true },
    });
    res.json(taskLists);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const taskList = await prisma.taskList.update({
      where: { id: Number(id) },
      data: { title },
    });
    res.json(taskList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.taskList.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;