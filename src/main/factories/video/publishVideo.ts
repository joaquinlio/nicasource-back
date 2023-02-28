import { PublishVideoController } from "../../../video/application/controller/publishVideo";
import {
  setupPublishVideo,
  VideoPublish,
} from "../../../video/domain/useCases/publishVideo";
import { VideoRepository } from "../../../video/infrastructure/repository/video";

const makePublishVideo = (): VideoPublish =>
  setupPublishVideo(new VideoRepository());

export const makePublishVideoController = (): PublishVideoController =>
  new PublishVideoController(makePublishVideo());
