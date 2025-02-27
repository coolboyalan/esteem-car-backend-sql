import Service from "#services/base";
import LoanQuery from "#models/loanQuery";
import UserService from "#services/user";
import { generateRandomPassword } from "#utils/jwt";
import { session } from "#middlewares/session";

class LoanQueryService extends Service {
  static Model = LoanQuery;

  static async create(loanQueryData) {
    const { userId } = loanQueryData;
    loanQueryData.email = "" + Math.random();
    loanQueryData.driverLicenseNumber = "" + Math.random();
    loanQueryData.status = loanQueryData.status ?? "Pending";
    const loanQuery = new this.Model(loanQueryData);
    await loanQuery.validate();
    if (!userId) {
      const password = generateRandomPassword(10);
      loanQueryData.password = password;
      const createdUser = await UserService.create(loanQueryData);
      loanQueryData.userId = createdUser.id;
    }
    if (loanQueryData.tradeCar) {
      const {
        tradeCar,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        vehicleVariant,
        kmDriven,
      } = loanQueryData;

      if (
        !tradeCar ||
        !vehicleMake ||
        !vehicleModel ||
        !vehicleYear ||
        !vehicleVariant ||
        !kmDriven
      ) {
        throw {
          status: false,
          message: "All fields related to car trade are required",
          httpStatus: httpStatus.BAD_REQUEST,
        };
      }
    }
    await this.Model.create(loanQueryData);
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
