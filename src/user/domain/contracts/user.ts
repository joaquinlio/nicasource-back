import { Follow } from "../../infrastructure/model/follow.model";
import { User } from "../entity/user";

export interface ICreateUser {
  create: (input: Omit<User, "id">) => Promise<User | null>;
}

export interface IFindUsers {
  findByEmail: (input: string) => Promise<User | null>;
  findById: (input: number) => Promise<User | null>;
}

export interface IHashPassword {
  hash: (input: string) => Promise<string | null>;
  compare: (password: string, hashedPassword: string) => Promise<boolean>;
}

export interface IFollowerUser {
  follow: (followingId: number, followerId: number) => Promise<Follow | null>;
  unfollow: (followingId: number, followerId: number) => Promise<number | null>;
  getFollowers: (userId: number) => Promise<any>;
  getFollowings: (userId: number) => Promise<any>;
}
