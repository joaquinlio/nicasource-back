import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../main/config/db";

export class Video extends Model {
  declare id: number;
  declare title: string;
  declare url: string;
  declare creationDate: string;
  declare published: boolean;
}

Video.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "videos",
    sequelize,
    timestamps: false,
  }
);
