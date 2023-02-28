import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../main/config/db";
import { Video } from "../../../video/infrastructure/model/video.model";
import { VideoLike } from "../../../video/infrastructure/model/videoLike.model";
import { Follow } from "./follow.model";

export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare photo: string;
  declare role: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: false,
  }
);

// Define many-to-many relationship for User and Follow through table Follow
// User can have many followers, identified by 'followingId'

User.belongsToMany(User, {
  through: Follow,
  as: "Followers",
  foreignKey: "followingId",
});

// Define many-to-many relationship for User and Follow through table Follow
// User can follow many other users, identified by 'followerId'
User.belongsToMany(User, {
  through: Follow,
  as: "Following",
  foreignKey: "followerId",
});

// Define one-to-many relationship for User and Video
// User can have many videos, identified by 'userId' in Video table
User.hasMany(Video, { foreignKey: "userId" });

// Define many-to-one relationship for Video and User
// Video belongs to one User, identified by 'userId'
Video.belongsTo(User, { foreignKey: "userId" });

// Define many-to-many relationship for User and Video through table VideoLike
// User can like many videos, identified by 'userId' in VideoLike table
User.belongsToMany(Video, {
  through: VideoLike,
  foreignKey: "userId",
});

// Define many-to-many relationship for Video and User through table VideoLike
// Video can be liked by many users, identified by 'videoId' in VideoLike table
Video.belongsToMany(User, {
  through: VideoLike,
  foreignKey: "videoId",
});

// Define many-to-one relationship for VideoLike and Video
// VideoLike belongs to one Video, identified by 'videoId'
VideoLike.belongsTo(Video, { foreignKey: "videoId" });

// Define one-to-many relationship for Video and VideoLike
// Video can have many VideoLikes, identified by 'videoId' in VideoLike table
Video.hasMany(VideoLike, { foreignKey: "videoId" });
