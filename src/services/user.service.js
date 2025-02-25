import User from "#models/user";
import Service from "#services/base";

class UserService extends Service {
  static Model = User;
}

export default UserService;
