import "reflect-metadata"
import { DataSource } from "typeorm"
import { Group } from "./entities/group"
import { dbHost, dbPass, dbPort, dbSchema, dbUser } from "../config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPass,
  database: dbSchema,
  entities: [Group],
  synchronize: true,
  logging: false,
})