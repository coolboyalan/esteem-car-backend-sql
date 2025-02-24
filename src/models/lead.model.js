import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Lead extends BaseModel {}

Lead.initialize({
  type: {
    type: DataTypes.ENUM("Business", "Individual"),
    allowNull: false,
  },
  title: {
    type: DataTypes.ENUM("Mr", "Mrs", "Ms", "Dr"),
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Lead;
