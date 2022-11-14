import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'root';
const MONGO_PORT = process.env.MONGO_PORT || '23017';
const MONGO_HOST = process.env.MONGO_HOST || `localhost:${MONGO_PORT}`;
const MONGO_DBNAME = process.env.MONGO_DB || 'test';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}`;


export const config = {
    mongo: {
        url: MONGO_URL
    },
    database: {
        connection : process.env.DB_CONNECTION || "mysql",
        host : process.env.DB_HOST || '127.0.0.1',
        port : process.env.DB_PORT || 3306,
        database : process.env.DB_DATABASE || 'test',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
    },
    server: {
        port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337
    },
    redis: {

    },
    token: {
        expireTime: process.env.SERVER_TOKEN_EXPIRETIME || 3600,
        secret: process.env.SERVER_TOKEN_ISSUER || 'coolIssuer',
        issuer: process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret'
    }
};
