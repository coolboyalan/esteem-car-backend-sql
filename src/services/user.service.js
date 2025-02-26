import bcrypt from "bcryptjs";
import User from "#models/user";
import httpStatus from "http-status";
import Service from "#services/base";
import { createToken } from "#utils/jwt";

class UserService extends Service {
  static Model = User;

  static async create(userData) {
    const { role, nzCitizen } = userData;
    if (!role) {
      userData.role = "user";
    }
    if (nzCitizen === null || nzCitizen === undefined) {
      userData.nzCitizen = false;
    }

    const user = await super.create(userData);
    return user;
  }

  static async login(userData) {
    const { email, password } = userData;
    let user = await this.Model.findOne({ where: { email } });
    if (!user) {
      throw {
        status: false,
        message: "User not found",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }
    const verification = await bcrypt.compare(password, user.password);
    if (!verification) {
      throw {
        status: false,
        message: "Invalid password",
        httpStatus: httpStatus.UNAUTHORIZED,
      };
    }

    user = user.toJSON();
    delete user.password;
    return {
      token: createToken({ email }),
      userData: {
        ...user,
      },
    };
  }
}

export default UserService;
