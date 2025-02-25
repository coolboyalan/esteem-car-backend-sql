import BaseModel from "#models/base";
import { DataTypes } from "sequelize";

class Contact extends BaseModel {}

Contact.initialize({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING(500),
  },
});

export default Contact;
