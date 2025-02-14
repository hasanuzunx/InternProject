import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "314",
  database: "localstorage",
  entities: [User],
  synchronize: true,
});

