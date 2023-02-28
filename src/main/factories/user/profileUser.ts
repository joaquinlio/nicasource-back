import { ProfileUserController } from "../../../user/application/controller/profileUser";
import {
  ProfileUser,
  setupProfileUser,
} from "../../../user/domain/useCases/profileUser";
import { UserRepository } from "../../../user/infrastructure/repository/user";
import { VideoRepository } from "../../../video/infrastructure/repository/video";

const makeProfileUser = (): ProfileUser =>
  setupProfileUser(new UserRepository(), new VideoRepository());

export const makeProfileUserController = (): ProfileUserController =>
  new ProfileUserController(makeProfileUser());
