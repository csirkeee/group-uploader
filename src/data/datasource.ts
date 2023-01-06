import "reflect-metadata"
import { DataSource } from "typeorm"
import { GroupEntity } from "./entities/group"
import { dbHost, dbPass, dbPort, dbSchema, dbUser } from "../config";
import { ImageEntity } from "./entities/image";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPass,
  database: dbSchema,
  entities: [GroupEntity, ImageEntity],
  synchronize: true,
  logging: false,
})