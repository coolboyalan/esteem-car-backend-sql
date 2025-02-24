import multer from "multer";
import express from "express";
import routeMapper from "#routes/index";
import sequelize from "#configs/database";
import bodyParser from "#middlewares/bodyParser";

const server = express();

server.use(multer().any());
server.use(express.json());
server.use(bodyParser);
server.use("/api", routeMapper);

export default server;
