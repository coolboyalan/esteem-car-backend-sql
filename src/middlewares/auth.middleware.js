import { verifyToken } from "#utils/jwt";
import UserService from "#services/user";

export default function (req, res, next) {
  let token = req.headers["authorization"];

  if (!token) {
    throw {
      status: false,
      message: "Token expired please login",
      httpStatus: 401,
    };
  }

  token = token.split(" ")[1];

  const payload = verifyToken(token);

  const { email } = payload;

  next();
}
