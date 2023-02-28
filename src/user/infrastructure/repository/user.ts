import { Sequelize } from "sequelize";
import { Video } from "../../../video/infrastructure/model/video.model";
import {
  ICreateUser,
  IFindUsers,
  IFollowerUser,
} from "../../domain/contracts/user";
import { User as UserEntity } from "../../domain/entity/user";
import { Follow } from "../model/follow.model";
import { User } from "../model/user.model";

export class UserRepository implements ICreateUser, IFindUsers, IFollowerUser {
  async create(input: Omit<UserEntity, "id">): Promise<UserEntity> {
    return await User.create(input);
  }
  async findByEmail(input: string): Promise<UserEntity | null> {
    return await User.findOne({ where: { email: input } });
  }
  async findById(input: number): Promise<UserEntity | null> {
    return await User.findByPk(input, {
      attributes: { exclude: ["password"] },
    });
  }

  async follow(
    followingId: number,
    followerId: number
  ): Promise<Follow | null> {
    return await Follow.create({
      followingId,
      followerId,
    });
  }

  async unfollow(
    followingId: number,
    followerId: number
  ): Promise<number | null> {
    return await Follow.destroy({
      where: {
        followingId,
        followerId,
      },
    });
  }

  async getFollowers(userId: number): Promise<any> {
    return await User.findByPk(userId, {
      include: [
        {
          model: User,
          as: "Followers",
          through: {
            attributes: [],
          },
          attributes: ["id", "name"],
        },
      ],
      attributes: [],
    });
  }

  async getFollowings(userId: number): Promise<any> {
    return await User.findByPk(userId, {
      include: [
        {
          model: User,
          as: "Following",
          through: {
            attributes: [],
          },
          attributes: ["id", "name"],
        },
      ],
      attributes: [],
    });
  }
}
