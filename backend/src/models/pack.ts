import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey
} from "sequelize";

import { connectionSql } from "../database/connectionSql";
import product from "./product";

class Pack extends Model<InferAttributes<Pack>, InferCreationAttributes<Pack>> { 
  declare id: CreationOptional<number>;
  declare qty: number;
  declare product_id: ForeignKey<product["code"]>;
  declare pack_id: ForeignKey<product["code"]>;
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

Pack.belongsTo(product, {
  foreignKey: "product_id",
  as: "product",
});

Pack.belongsTo(product, {
  foreignKey: "pack_id",
  as: "pack",
});

export default Pack;
