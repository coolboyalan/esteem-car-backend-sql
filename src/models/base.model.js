import httpStatus from "http-status";
import { Model, DataTypes, Op } from "sequelize";
import sequelize from "#configs/database";
import { session } from "#middlewares/session";
// import TransactionManager from "#utils/transaction";

// TODO: IMPLEMENT INNER JOIN, FIND A WORKAROUND
class BaseModel extends Model {
  static excludedBranchModels = ["Branch", "City", "State", "Country", "Auth"];

  /**
   * Initialize the model with the given model definition and options.
   * @param {object} modelDefinition - The model definition
   * @param {object} options - The options for the model
   */
  static initialize(modelDefinition, options) {
    const modifiedModelDefinition = this.modifyModelDefinition(modelDefinition);

    this.init(
      {
        ...modifiedModelDefinition,
        //createdBy: {
        //  type: DataTypes.INTEGER,
        //  allowNull: true,
        //  filterable: true,
        //},
        //updatedBy: {
        //  type: DataTypes.INTEGER,
        //  allowNull: true,
        //  filterable: true,
        //},
        createdAt: {
          type: DataTypes.DATE,
          filterable: true, // If you want createdAt to be filterable
        },
        updatedAt: {
          type: DataTypes.DATE,
          filterable: true, // If you want updatedAt to be filterable
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        hooks: {},
        ...options,
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
      },
    );
  }

  static modifyModelDefinition(modelDefinition) {
    return Object.entries(modelDefinition).reduce((acc, [key, value]) => {
      acc[key] = {
        ...value,
        filterable: value.filterable ?? true,
        publicKey: value.publicKey ?? true,
        searchable: value.searchable ?? false,
        ...(modelDefinition[key]["references"]
          ? {
              references: modelDefinition[key]["references"],
              validate: { isInt: { msg: `Invalid ${key}` } },
            }
          : {}),
      };
      return acc;
    }, {});
  }

  static async find(filters) {
    const {
      search = "",
      page = 1,
      limit = 10,
      order = [["createdAt", "DESC"]],
    } = filters;

    const attributes = this.rawAttributes;
    const where = {};

    // Apply filtering based on filterable fields
    Object.keys(filters).forEach((key) => {
      if (attributes[key] && attributes[key].filterable) {
        where[key] = filters[key];
      }
    });

    // Apply search across searchable fields
    if (search) {
      const searchConditions = Object.keys(attributes)
        .filter((key) => attributes[key].searchable)
        .map((key) => ({ [key]: { [Op.iLike]: `%${search}%` } }));

      if (searchConditions.length > 0) {
        where[Op.or] = searchConditions;
      }
    }

    // Calculate pagination
    const offset = (page - 1) * limit;

    // Fetch data with pagination
    const { count, rows } = await this.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return {
      data: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  static async create(data, options = {}) {
    const transaction = session.get("transaction");
    const rawFields = this.getAttributes();
    const createdDocument = await super.create(data);
    return createdDocument;
  }

  async save() {
    const transaction = session.get("transaction");
    await super.save({ transaction });
    return this;
  }

  static getSearchableFields(allowedFields) {
    return Object.keys(allowedFields).filter(
      (field) => allowedFields[field].searchable,
    );
  }

  static getFilterableFields(allowedFields) {
    return Object.keys(allowedFields).filter(
      (field) => allowedFields[field].filterable,
    );
  }

  static rawFields() {
    return this.getAttributes();
  }

  /**
   * Update a record by its ID.
   * @param {any} id - The ID of the record to update
   * @param {Object} updates - The updates to apply to the record
   * @return {Promise<Object>} The updated record
   */
  static async updateById(id, updates) {
    this.idChecker(id);
    const [updatedCount, updatedRecord] = await this.update(updates, {
      where: { id },
    });

    if (updatedCount !== 1) {
      throw {
        status: false,
        httpStatus: httpStatus.NOT_FOUND,
        message: `${this.name} not found`,
      };
    }
    return updatedRecord;
  }

  updateFields(updates) {
    for (let i in updates) {
      this[i] = updates[i];
    }
  }

  /**
   * Delete a record by its ID.
   *
   * @param {any} id - The ID of the record to delete
   * @return {Promise<Object>} The updated record
   */
  static async deleteById(id) {
    this.idChecker(id);
    const time = new Date();
    const [updatedCount, updatedRecord] = await this.update(
      { deletedAt: time },
      {
        where: { id, deletedAt: null },
        individualHooks: true,
      },
    );
    if (updatedCount !== 1 || !updatedRecord || !updatedRecord.length) {
      throw {
        status: false,
        httpStatus: httpStatus.NOT_FOUND,
        message: `${this.name} not found`,
      };
    }
    return updatedRecord;
  }

  static idChecker(id) {
    if (!id || isNaN(id)) {
      throw {
        status: false,
        httpStatus: httpStatus.BAD_REQUEST,
        message: `Invalid or missing ${this.name} id`,
      };
    }
  }

  static objectValidator(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}

export default BaseModel;
