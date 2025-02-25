import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class LoanQuery extends BaseModel {}

LoanQuery.initialize({
  userType: {
    type: DataTypes.ENUM("Business", "Individual"),
    allowNull: true,
  },
  title: {
    type: DataTypes.ENUM("Mr", "Mrs", "Ms", "Dr"),
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  callbackRequested: {
    type: DataTypes.BOOLEAN,
    default: true,
  },
  loanAppliedFor: {
    type: DataTypes.ENUM("Car", "Van", "Others"),
  },
  purchasePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  longTerm: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  paymentFrequency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  depositAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  modelYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  applicationType: {
    type: DataTypes.ENUM("Single", "Joint"),
    allowNull: true,
  },
  maritalStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dependents: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  driverLicenseType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  driverLicenseNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  driverLicenseVersion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nzCitizenOrResident: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  citizenshipDetails: {
    type: DataTypes.JSON,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timeAtCurrentAddressYears: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  timeAtCurrentAddressMonths: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sameAsPostalAddress: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  residentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  employerName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  employeeName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companyName: {
    type: DataTypes.STRING,
  },
  companyAddress: {
    type: DataTypes.STRING,
  },
  typeOfEmployee: {
    type: DataTypes.STRING,
  },
  dateOfJoining: {
    type: DataTypes.DATE,
  },
  workExperience: {
    type: DataTypes.DECIMAL(10, 2),
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  employmentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timeInJob: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentFrequency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  income: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  partnerPaymentFrequency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  partnerIncome: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  otherIncome: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  homeOwnership: {
    type: DataTypes.ENUM("Owned", "Rent"),
    allowNull: true,
  },
  rentAggrement: {
    type: DataTypes.STRING,
    file: true,
  },
  //vehiclesValue: {
  //  type: DataTypes.DECIMAL(10, 2),
  //  allowNull: true,
  //},
  //furnitureValue: {
  //  type: DataTypes.DECIMAL(10, 2),
  //  allowNull: true,
  //},
  //creditCardLimit: {
  //  type: DataTypes.DECIMAL(10, 2),
  //  allowNull: true,
  //},
  //creditCardMonthlyPayments: {
  //  type: DataTypes.DECIMAL(10, 2),
  //  allowNull: true,
  //},
  //loanBalance: {
  //  type: DataTypes.DECIMAL(10, 2),
  //  allowNull: true,
  //},
  //loanMonthlyPayments: {
  //  type: DataTypes.DECIMAL(10, 2),
  //  allowNull: true,
  //},
  //livingExpenses: {
  //  type: DataTypes.DECIMAL(10, 2),
  //  allowNull: true,
  //},
  //motorVehicleExpenses: {
  //  type: DataTypes.DECIMAL(10, 2),
  //  allowNull: true,
  //},
});

export default LoanQuery;
