import Service from "#services/base";
import LoanQuery from "#models/loanQuery";
import UserService from "#services/user";
import { generateRandomPassword } from "#utils/jwt";

class LoanQueryService extends Service {
  static Model = LoanQuery;

  static async create(loanQueryData) {
    const { userId } = loanQueryData;
    const loanQuery = new this.Model(loanQueryData);
    await loanQuery.validate();
    if (!userId) {
      const password = generateRandomPassword(10);
      loanQueryData.password = password;
      const createdUser = await UserService.create(loanQueryData);
      loanQueryData.userId = createdUser.id;
    }

    await loanQuery.save();
    return loanQuery;
  }

  static async update(id, loanQueryData) {
    delete loanQueryData.leadId;
    delete loanQueryData.userId;

    const data = await super.update(id, loanQueryData);
    return data;
  }
}

export default LoanQueryService;
