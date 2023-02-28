import { UploadVideoController } from "../../../video/application/controller/uploadVideo";
import {
  setupUploadVideo,
  VideoUpload,
} from "../../../video/domain/useCases/uploadVideo";
import { VideoRepository } from "../../../video/infrastructure/repository/video";

const makeUploadVideo = (): VideoUpload =>
  setupUploadVideo(new VideoRepository());

export const makeUploadVideoController = (): UploadVideoController =>
  new UploadVideoController(makeUploadVideo());
