import { FollowUserController } from "../../../user/application/controller/followUser";
import {
  FollowUser,
  setupFollowUser,
} from "../../../user/domain/useCases/followUser";
import { UserRepository } from "../../../user/infrastructure/repository/user";

const makeFollowUser = (): FollowUser => setupFollowUser(new UserRepository());

export const makeFollowUserController = (): FollowUserController =>
  new FollowUserController(makeFollowUser());
