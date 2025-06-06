import { DataTypes, Model } from "sequelize";
import database from "../../../shared/config/database_config";

class User extends Model {
  declare id: string;
  declare firstname: string;
  declare lastname: string;
  declare email: string;
  declare phoneNumber: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^(?:\+234|0)[789]\d{9}$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: "users",
    timestamps: true,
    paranoid: true,
  }
);

export default User;
