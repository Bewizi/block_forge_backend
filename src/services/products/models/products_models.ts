import { DataTypes, Model, UUIDV4 } from "sequelize";
import database from "../../../shared/config/database_config";

class Products extends Model {
  declare id: string;
  declare name: string;
  declare image: string;
  declare price: string;
  declare description: string;
  declare category: string;
}

Products.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('solid','hollow'),
      allowNull: false,
    },
  
  },
  {
    sequelize: database,
    modelName: "products",
    timestamps: true,
    paranoid: true,
  },
);

export default Products;
