import type { NextApiHandler } from 'next'
import { AppDataSource } from "../../data/datasource";

const initDbHandler: NextApiHandler = async (request, response) => {
  // to initialize initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  try {
    await AppDataSource.initialize();
  } catch (e) {
    console.log(e)
  }

  response.send({})
}

export default initDbHandler
