import { UserRepository } from "../../../user/infrastructure/repository/user";
import { ListVideoController } from "../../../video/application/controller/listVideo";
import {
  setupListVideo,
  VideoList,
} from "../../../video/domain/useCases/listVideo";
import { VideoRepository } from "../../../video/infrastructure/repository/video";

const makeListVideo = (): VideoList =>
  setupListVideo(new VideoRepository(), new UserRepository());

export const makeListVideoController = (): ListVideoController =>
  new ListVideoController(makeListVideo());
