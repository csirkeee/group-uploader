import "reflect-metadata";

import type { NextApiHandler, NextApiResponse } from 'next';
import { AppDataSource } from "../../data/datasource";
import { GroupEntity } from "../../data/entities/group";
import { createNewGroup, getAllGroups } from "../../services/groupService";

const addNewGroup = async (requestBody, response: NextApiResponse) => {
  const group = new GroupEntity();
  group.name = requestBody.name;
  group.description = requestBody.description;
  await createNewGroup(group);

  response.send('Success!');
};

const getGroups = async (response: NextApiResponse<any>) => {
  const allGroups = await getAllGroups();

  response.json(allGroups);
};

const groupHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    await addNewGroup(request.body, response);
  } else {
    await getGroups(response);
  }
};

export default groupHandler;
