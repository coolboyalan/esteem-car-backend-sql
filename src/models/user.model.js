import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class User extends BaseModel {}

User.initialize(
  {
    role: {
      type: DataTypes.ENUM("user", "admin"),
      default: "user",
      allowNull: false,
    },
    title: {
      type: DataTypes.ENUM("Mr", "Ms", "Mrs", "Dr"),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    mobileNo: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dob: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nzCitizen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    citizenshipDetails: {
      type: DataTypes.JSON,
      validate: {
        isValidJson(value) {
          if (!Array.isArray(value) || !value.length) {
            throw {
              status: false,
              message:
                "Citizenship details must be an array containing citizenship details",
              httpStatus: httpStatus.BAD_REQUEST,
            };
          }

          for (const key of value) {
            if (!key["countryOfBirth"] || !key["countryOfCitizenship"]) {
              throw {
                status: false,
                message:
                  "Country of birth and country of citizenship, both are required",
                httpStatus: httpStatus.BAD_REQUEST,
              };
            }
          }
        },
      },
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    postalCode: {
      type: DataTypes.STRING,
    },
    timeAtCurrentAddressInYears: {
      type: DataTypes.INTEGER,
    },
    timeAtCurrentAddressInMonths: {
      type: DataTypes.INTEGER,
    },
    residentType: {
      type: DataTypes.ENUM("Boarding"),
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

export default User;
