import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
} from "sequelize";

import { connectionSql } from "../database/connectionSql";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> { 
  declare code: CreationOptional<number>;
  declare name: string;
  declare cost_price: number;
  declare sales_price: number;
}
    
Product.init(
  {
    code: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(100),
      allowNull: false
    },
    cost_price: {
      type: new DataTypes.DECIMAL(9,2),
      allowNull: false
    },
    sales_price: {
      type: new DataTypes.DECIMAL(9,2),
      allowNull: false
    },
  },
  {
    tableName: "products",
    sequelize: connectionSql
  }
);

export default Product;
