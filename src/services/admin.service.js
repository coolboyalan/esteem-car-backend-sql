import bcrypt from "bcryptjs";
import Admin from "#models/admin";
import httpStatus from "http-status";
import Service from "#services/base";
import { createToken } from "#utils/jwt";

class AdminService extends Service {
  static Model = Admin;

  static async login(userData) {
    const { email, password } = userData;
    const user = await this.Model.findOne({ where: { email } });
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
    return {
      token: createToken({ email }),
      userData: {
        name: "Admin",
        mobile: "1234567890",
        fullName: "Admin",
        email,
      },
    };
  }
}

export default AdminService;
