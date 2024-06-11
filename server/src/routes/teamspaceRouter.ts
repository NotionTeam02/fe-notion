import express, { Request, Response, Router } from 'express';
import Teamspace from '../models/Teamspace';
import articleRouter from './articleRouter';

const teamspaceRouter: Router = express.Router();

teamspaceRouter.use('/article', articleRouter);

teamspaceRouter.get('/:teamspaceId', async (req: Request, res: Response) => {
  try {
    const { teamspaceId } = req.params;
    const teamspaceIdNumber = Number(teamspaceId);

    if (isNaN(teamspaceIdNumber)) return res.status(400).json({ message: 'Invalid teamspace ID' });

    const teamspace = await Teamspace.findOne({ id: teamspaceIdNumber });

    if (!teamspace) return res.status(404).json({ message: 'Teamspace not found' });

    res.json(teamspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

teamspaceRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Invalid teamspace name' });
    }

    const isDuplicate = await Teamspace.findOne({ title });
    if (isDuplicate) {
      return res.status(409).json({ message: 'Teamspace name already exists' });
    }

    const newTeamspace = new Teamspace({ title });
    await newTeamspace.save();

    res.status(201).json({ message: 'Teamspace successfully created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

teamspaceRouter.patch('/:teamspaceId', async (req: Request, res: Response) => {
  try {
    const { teamspaceId } = req.params;
    const teamspaceIdNumber = Number(teamspaceId);
    const { title } = req.body;

    if (isNaN(teamspaceIdNumber) || teamspaceIdNumber <= 0)
      return res.status(400).json({ message: 'Invalid teamspace ID' });

    if (!title || typeof title !== 'string' || title.trim() === '')
      return res.status(400).json({ message: 'Invalid teamspace name' });

    const updatedTeamspace = await Teamspace.findOneAndUpdate(
      {
        id: teamspaceIdNumber,
      },
      {
        title,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTeamspace) return res.status(404).json({ message: 'Teamspace not found' });

    res.status(200).json(updatedTeamspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

teamspaceRouter.delete('/:teamspaceId', async (req: Request, res: Response) => {
  try {
    const { teamspaceId } = req.params;
    const teamspaceIdNumber = Number(teamspaceId);

    const deletedTeamspace = await Teamspace.findOneAndDelete({ id: teamspaceIdNumber });

    if (!deletedTeamspace) return res.status(404).json({ message: 'Teamspace not found' });

    res.status(200).json({ message: 'Teamspace successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
