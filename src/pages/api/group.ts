import "reflect-metadata"

import type { NextApiHandler, NextApiResponse } from 'next'
import { AppDataSource } from "../../data/datasource";
import { Group } from "../../data/entities/group";

const addNewGroup = async (requestBody, response: NextApiResponse) => {
  const group = new Group();
  group.name = requestBody.name;
  group.description = requestBody.description;

  const groupRepository = AppDataSource.getRepository(Group);

  await groupRepository.save(group);

  response.send('Success!');
}

const getGroups = async (response: NextApiResponse<any>) => {
  const groupRepository = AppDataSource.getRepository(Group)

  const allGroups = await groupRepository.find();

  response.json(allGroups);
};

const groupHandler: NextApiHandler = async (request, response) => {
  await AppDataSource.initialize();
  if(request.method === 'POST') {
    await addNewGroup(request.body, response);
  } else {
    await getGroups(response);
  }
}

export default groupHandler
