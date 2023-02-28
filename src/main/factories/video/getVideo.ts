import { GetVideoController } from "../../../video/application/controller/getVideo";
import {
  setupGetVideo,
  VideoGet,
} from "../../../video/domain/useCases/getVideo";
import { VideoRepository } from "../../../video/infrastructure/repository/video";


const makeGetVideo = (): VideoGet => setupGetVideo(new VideoRepository());

export const makeGetVideoController = (): GetVideoController =>
  new GetVideoController(makeGetVideo());
