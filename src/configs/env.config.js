import { configDotenv } from "dotenv";
import { cleanEnv, str, num } from "envalid";

configDotenv();

const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  JWT_SECRET: str(),
  DB_USER: str(),
  DB_PASS: str(),
  DB_NAME: str(),
  DB_HOST: str({ default: "localhost" }),
  DB_PORT: num({ default: 3306 }),
  DB_DIALECT: str({ default: "mysql" }),
  NODE_ENV: str(),
});

export default env;
