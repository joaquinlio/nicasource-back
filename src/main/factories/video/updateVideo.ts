import { UpdateVideoController } from "../../../video/application/controller/updateVideo";
import {
  setupUpdateVideo,
  VideoUpdate,
} from "../../../video/domain/useCases/updateVideo";
import { VideoRepository } from "../../../video/infrastructure/repository/video";

const makeUpdateVideo = (): VideoUpdate =>
  setupUpdateVideo(new VideoRepository());

export const makeUpdateVideoController = (): UpdateVideoController =>
  new UpdateVideoController(makeUpdateVideo());
