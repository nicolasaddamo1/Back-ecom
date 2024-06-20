import { registerAs } from "@nestjs/config";
import {config as dotenvConfig} from "dotenv";
import { DataSource,DataSourceOptions } from "typeorm";

dotenvConfig({path: "./.env.development"});

const config ={
    type: 'postgres',
    host: `${process.env.DB_HOST}`,
    port: `${parseInt(process.env.DB_PORT)}`,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
    dropSchema: false
};
export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)


    // migraciones en el package.json
    // "typeorm":"ts-node ./node_modules/typeorm/cli",
    // "migration:run": "npm run typeorm migration:run -- -d./src/config/typeorm.ts",
    // "migration:generate": "npm run typeorm -- -d ./src/config/typeorm.ts migration:generate",
    // "migration:create": "npm run typeorm migration:create",
    // "migration:revert": "npm run typeorm -- -d ./src/config/typeorm.ts migration:revert",
    // "migration:show":"npm run typeorm -- -d ./src/config/typeorm.ts migration:show"

    // app.js

//!PARA DEPLOYAR LA BASE DE DATOS EN NEON, CONFIGURAR BIEN!!!!

//     const postgres = require('postgres');
// require('dotenv').config();

// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// const sql = postgres({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: 'require',
//   connection: {
//     options: `project=${ENDPOINT_ID}`,
//   },
// });

// async function getPgVersion() {
//   const result = await sql`select version()`;
//   console.log(result);
// }

// getPgVersion();