import "reflect-metadata"

import type { NextApiHandler, NextApiResponse } from 'next'
import { AppDataSource } from "../../data/datasource";
import { GroupEntity } from "../../data/entities/group";

const addNewGroup = async (requestBody, response: NextApiResponse) => {
  const group = new GroupEntity();
  group.name = requestBody.name;
  group.description = requestBody.description;

  const groupRepository = AppDataSource.getRepository(GroupEntity);

  await groupRepository.save(group);

  response.send('Success!');
}

const getGroups = async (response: NextApiResponse<any>) => {
  const groupRepository = AppDataSource.getRepository(GroupEntity)

  const allGroups = await groupRepository.find({relations: ['images']});

  response.json(allGroups);
};

const groupHandler: NextApiHandler = async (request, response) => {
  if(!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  if(request.method === 'POST') {
    await addNewGroup(request.body, response);
  } else {
    await getGroups(response);
  }
}

export default groupHandler
