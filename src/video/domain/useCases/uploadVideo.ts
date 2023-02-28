import { ServerError } from "../../../utils/errors";
import { IUploadVideo } from "../contracts/video";
import { Video } from "../entity/video";

export type VideoUpload = (
  input: Omit<Video, "id" | "creationDate" | "published"> & number
) => Promise<Video>;

type Setup = (videoRepository: IUploadVideo) => VideoUpload;

export const setupUploadVideo: Setup = (videoRepository) => async (input) => {
  const uploadedVideo = await videoRepository.upload(input);

  if (!uploadedVideo) throw new ServerError();

  return uploadedVideo;
};
