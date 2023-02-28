import { UnpublishVideoController } from "../../../video/application/controller/unpublishVideo";
import {
  setupUnpublishVideo,
  VideoUnpublish,
} from "../../../video/domain/useCases/unpublishVideo";
import { VideoRepository } from "../../../video/infrastructure/repository/video";


const makeUnpublishVideo = (): VideoUnpublish =>
  setupUnpublishVideo(new VideoRepository());

export const makeUnpublishVideoController = (): UnpublishVideoController =>
  new UnpublishVideoController(makeUnpublishVideo());
