import multer from "multer";
import express from "express";
import env from "#configs/env";
import routeMapper from "#routes/index";
import sequelize from "#configs/database";
import bodyParser from "#middlewares/bodyParser";
import sessionMiddleware from "#middlewares/session";

const server = express();

if (env.NODE_ENV === "development") {
  sequelize.sync({ alter: true });
}

server.use(multer().any());
server.use(express.json());
server.use(bodyParser);
server.use(sessionMiddleware);
server.use("/api", routeMapper);

export default server;
