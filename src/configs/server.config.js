import path from "path";
import cors from "cors";
import multer from "multer";
import express from "express";
import env from "#configs/env";
import { fileURLToPath } from "url";
import routeMapper from "#routes/index";
import sequelize from "#configs/database";
import bodyParser from "#middlewares/bodyParser";
import { globalErrorHandler } from "#utils/error";
import sessionMiddleware from "#middlewares/session";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = express();

if (env.NODE_ENV === "development") {
  sequelize.sync({ alter: true });
}

server.use(cors());
server.use(multer().any());
server.use(express.json());
server.use("/uploads", express.static(path.join(__dirname, "../uploads")));
server.use(bodyParser);
server.use(sessionMiddleware);
server.use("/api", routeMapper);
server.use(globalErrorHandler);

export default server;
