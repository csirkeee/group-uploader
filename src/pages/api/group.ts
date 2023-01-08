import "reflect-metadata";

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { GroupEntity } from "../../data/entities/group";
import { createNewGroup, getAllGroups } from "../../services/groupService";
import busboy from "busboy";
import FormData from "form-data";
import axios from "axios";
import { imgurClientId } from "../../config";
import { ImageEntity } from "../../data/entities/image";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const parseForm = async (
  req: NextApiRequest
): Promise<GroupEntity> => {
  const group = new GroupEntity();
  group.images = [];

  const imageUploadPromises: Promise<void>[] = [];

  await new Promise<void>(async (resolve, reject) => {
    const bb = busboy({headers: req.headers});
    bb.on('file', (name, file, info) => {
      const {filename, encoding, mimeType} = info;
      console.log(
        `File [${name}]: filename: [${filename}], encoding: [${encoding}], mimeType: [${mimeType}]`
      );

      imageUploadPromises.push(new Promise<void>((resolve, reject) => {
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
                const imageEntity = new ImageEntity();
                imageEntity.filename = filename;
                imageEntity.url = response.data.data.link;
                imageEntity.group = group;
                group.images.push(imageEntity);

                resolve();
              })
              .catch((error) => {
                console.log('axios error');
                console.log('error: ' + JSON.stringify(error));
                reject(error);
              });
          });
      }));
    });
    bb.on('field', (name, val, info) => {
      console.log(`Field [${name}]: value: [${val}]`);
      if(name === 'name') {
        group.name = val;
      } else if (name === 'description') {
        group.description = val;
      }
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

  console.log("waiting on image uploads");
  console.log(imageUploadPromises.length);
  await Promise.all(imageUploadPromises);

  console.log("image uploads done");

  return group;
};

const addNewGroup = async (request, response: NextApiResponse) => {
  const group = await parseForm(request);

  await createNewGroup(group);

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
