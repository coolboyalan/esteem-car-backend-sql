import mongoose from "mongoose";
import Lead from "#models/lead";
import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class LoanModel extends BaseModel {}

LoanModel.initialize({
  leadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Lead,
      key: Lead.primaryKeyAttribute,
    },
  },
});
