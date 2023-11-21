"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    migrations: [__dirname + "/**/migrations/*.{ts,js}"],
    entities: [__dirname + "/**/entities/*.{ts,js}"]
});
exports.default = AppDataSource;
//# sourceMappingURL=dataSource.js.map