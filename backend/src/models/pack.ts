import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey,
} from "sequelize";

import { connectionSql } from "../database/connectionSql";
import Product from "./Product";

class Pack extends Model<InferAttributes<Pack>, InferCreationAttributes<Pack>> {
  declare product?: InferAttributes<Product>;
  declare id: CreationOptional<number>;
  declare qty: number;
  declare product_id: ForeignKey<Product["code"]>;
  declare pack_id: ForeignKey<Product["code"]>;
}
    
Pack.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    qty: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    pack_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "packs",
    sequelize: connectionSql
  }
);

Pack.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

Pack.belongsTo(Product, {
  foreignKey: "pack_id",
  as: "pack",
});

export default Pack;
