import { Model } from "sequelize";
import { sequelize } from "../../../main/config/db";

export class VideoLike extends Model {
  declare videoId: number;
  declare userId: number;
}

VideoLike.init(
  {},
  {
    tableName: "videoLikes",
    sequelize,
    timestamps: false,
  }
);
