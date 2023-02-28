import { LikeVideoController } from "../../../video/application/controller/likeVideo";
import {
  setupLikeVideo,
  VideoLike,
} from "../../../video/domain/useCases/likeVideo";
import { VideoRepository } from "../../../video/infrastructure/repository/video";

const makeLikeVideo = (): VideoLike => setupLikeVideo(new VideoRepository());

export const makeLikeVideoController = (): LikeVideoController =>
  new LikeVideoController(makeLikeVideo());
