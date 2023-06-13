import { Request, Response } from 'express';
import { getAllTeams, getByItemId } from '../service/Teams.service';

const getAllTeamController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await getAllTeams();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getByIdController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const result = await getByItemId(+id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAllTeamController, getByIdController };
