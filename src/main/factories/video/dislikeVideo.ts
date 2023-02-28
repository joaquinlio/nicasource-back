import { DislikeVideoController } from "../../../video/application/controller/dislikeVideo";
import {
  setupDislikeVideo,
  VideoDislike,
} from "../../../video/domain/useCases/dislikeVideo";
import { VideoRepository } from "../../../video/infrastructure/repository/video";

const makeDislikeVideo = (): VideoDislike =>
  setupDislikeVideo(new VideoRepository());

export const makeDislikeVideoController = (): DislikeVideoController =>
  new DislikeVideoController(makeDislikeVideo());
