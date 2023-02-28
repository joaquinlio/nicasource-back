import { Model } from "sequelize";
import { sequelize } from "../../../main/config/db";

export class Follow extends Model {
  declare followingId: number;
  declare followerId: number;
}

Follow.init(
  {},
  {
    tableName: "follows",
    sequelize,
    timestamps: false,
  }
);
