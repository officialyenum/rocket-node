import "reflect-metadata"
import { DataSource } from "typeorm"
import { config } from "./config/config";
import { Game } from "./entity/Game";
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.database.host,
    port: 3306,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    logging: true,
    entities: [User, Game],
    migrations: [],
    subscribers: [],
});
