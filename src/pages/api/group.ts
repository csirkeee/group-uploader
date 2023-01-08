import "reflect-metadata";

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from "../../data/datasource";
import { GroupEntity } from "../../data/entities/group";
import { createNewGroup, getAllGroups } from "../../services/groupService";
import busboy from "busboy";

export const config = {
  api: {
    bodyParser: false,
  },
}

export const parseForm = async (
  req: NextApiRequest
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      console.log(
        `File [${name}]: filename: [${filename}], encoding: [${encoding}], mimeType: [${mimeType}]`
      );
      file.on('data', (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      }).on('close', () => {
        console.log(`File [${name}] done`);
      });
    });
    bb.on('field', (name, val, info) => {
      console.log(`Field [${name}]: value: [${val}]`);
    });
    bb.on('close', () => {
      console.log('Done parsing form!');
      resolve();
    });
    bb.on('error', (e) => {
      console.log('Busboy error!');
      reject(e);
    });
    req.pipe(bb);
  });
};

const addNewGroup = async (request, response: NextApiResponse) => {
  await parseForm(request);

  // console.log('Contents');
  // console.log(JSON.stringify(fields))

  const group = new GroupEntity();
  // group.name = requestBody.name;
  // group.description = requestBody.description;
  // await createNewGroup(group);

  response.redirect("/");
};

const getGroups = async (response: NextApiResponse<any>) => {
  const allGroups = await getAllGroups();

  response.json(allGroups);
};

const groupHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    await addNewGroup(request, response);
  } else {
    await getGroups(response);
  }
};

export default groupHandler;
