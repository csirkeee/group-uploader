import "reflect-metadata";

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { GroupEntity } from "../../data/entities/group";
import { getAllGroups } from "../../services/groupService";
import busboy from "busboy";
import FormData from "form-data";
import axios from "axios";
import { imgurClientId } from "../../config";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const parseForm = async (
  req: NextApiRequest
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const bb = busboy({headers: req.headers});
    bb.on('file', (name, file, info) => {
      const {filename, encoding, mimeType} = info;
      console.log(
        `File [${name}]: filename: [${filename}], encoding: [${encoding}], mimeType: [${mimeType}]`
      );

      const fileBufferChunks = [];

      file
        .on('data', (data) => {
          console.log(`File [${name}] got ${data.length} bytes`);
          fileBufferChunks.push(data);
        })
        .on('close', () => {
          console.log(`File [${name}] done`);

          const buffer = Buffer.concat(fileBufferChunks);

          const data = new FormData();
          data.append('image', buffer, filename);

          const axiosConfig = {
            method: 'post',
            url: 'https://api.imgur.com/3/upload',
            headers: {
              'Authorization': `Client-ID ${imgurClientId}`,
              ...data.getHeaders()
            },
            data: data
          };

          axios(axiosConfig)
            .then((response) => {
              console.log('job trigger success');
              console.log('success: ' + JSON.stringify(response.status));
              console.log('success: ' + JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log('axios error');
              console.log('error: ' + JSON.stringify(error));
            });
        });
    })
    ;
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
