import Lead from "#models/lead";
import User from "#models/user";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class LoanQuery extends BaseModel {}

LoanQuery.initialize(
  {
    loanQueryNumber: {
      type: DataTypes.STRING,
      editable: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: User.primaryKeyAttribute,
      },
    },
    leadId: {
      type: DataTypes.INTEGER,
      references: {
        model: Lead,
        key: Lead.primaryKeyAttribute,
      },
    },
    userType: {
      type: DataTypes.ENUM("Business", "Individual"),
      allowNull: false,
    },
    loanAppliedFor: {
      type: DataTypes.ENUM("Car", "Van", "Others"),
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    loanTerm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paymentFrequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    depositAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    applicationType: {
      type: DataTypes.ENUM("Single", "Joint"),
      allowNull: false,
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dependents: {
      type: DataTypes.ENUM("1", "2", "3", "4+"),
      allowNull: false,
    },
    driverLicenseType: {
      type: DataTypes.ENUM("Type 1", "Type 2"),
      allowNull: false,
    },
    driverLicenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driverLicenseVersion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driverLicenseDocument: {
      type: DataTypes.STRING,
      file: true,
    },
    homeOwnership: {
      type: DataTypes.ENUM("Owned", "Rent"),
      allowNull: false,
    },
    rentAgreement: {
      type: DataTypes.STRING,
      file: true,
    },
    employerName: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
    },
    employmentType: {
      type: DataTypes.ENUM("Full-Time", "Part-Time", "Contract"),
    },
    timeInThisJob: {
      type: DataTypes.INTEGER,
      min: 1,
    },
    paidFrequency: {
      type: DataTypes.ENUM("Bi-Weekly", "Weekly", "Monthly"),
    },
    takeHomeIncome: {
      type: DataTypes.DECIMAL(10, 2),
    },
    partnerPaidFrequency: {
      type: DataTypes.ENUM("Bi-Weekly", "Weekly", "Monthly"),
    },
    partnerTakeHomeIncome: {
      type: DataTypes.DECIMAL(10, 2),
    },
    otherIncome: {
      type: DataTypes.BOOLEAN,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    companyAddress: {
      type: DataTypes.STRING,
    },
    typeOfEmployee: {
      type: DataTypes.ENUM("Salaried", "Self Employed"),
    },
    dateOfJoining: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM("Approved", "Disapproved", "Pending", "In Progress"),
      allowNull: false,
      default: "Pending",
    },
    comments: {
      type: DataTypes.TEXT,
    },
    tradeCar: {
      type: DataTypes.BOOLEAN,
    },
    vehicleMake: {
      type: DataTypes.STRING,
    },
    vehicleModel: {
      type: DataTypes.STRING,
    },
    vehicleYear: {
      type: DataTypes.INTEGER,
    },
    vehicleVariant: {
      type: DataTypes.STRING,
    },
    kmDriven: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0, // Ensure it's a positive number
      },
    },
  },
  {
    hooks: {
      afterCreate: async (loanQueryInstance) => {
        loanQueryInstance.loanQueryNumber = `LOAN-NO-${loanQueryInstance.id}`;
        await loanQueryInstance.save();
      },
    },
  },
);

Lead.hasMany(LoanQuery, {
  foreignKey: "leadId",
  as: "loanQueries",
});

User.hasMany(LoanQuery, {
  foreignKey: "userId",
  as: "loanQueries",
});

export default LoanQuery;
