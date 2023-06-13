import Teams from '../models/Teams.model';

const getAllTeams = async () : Promise<Teams[]> => {
  const result = await Teams.findAll();
  return result;
};

const getByItemId = async (id: number) : Promise<Teams | null> => {
  const resultId = await Teams.findByPk(id);
  return resultId;
};

export { getAllTeams, getByItemId };
