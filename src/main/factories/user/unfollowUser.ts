import { UnfollowUserController } from "../../../user/application/controller/unfollowUser";
import {
  setupUnfollowUser,
  UnfollowUser,
} from "../../../user/domain/useCases/unfollowUser";
import { UserRepository } from "../../../user/infrastructure/repository/user";

const makeUnfollowUser = (): UnfollowUser =>
  setupUnfollowUser(new UserRepository());

export const makeUnfollowUserController = (): UnfollowUserController =>
  new UnfollowUserController(makeUnfollowUser());
