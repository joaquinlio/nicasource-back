import { ServerError } from "../../../utils/errors";
import { IUpdateVideo } from "../contracts/video";
import { Video } from "../entity/video";

export type VideoUpdate = (
  input: Omit<Video, "creationDate" | "published">
) => Promise<void>;

type Setup = (videoRepository: IUpdateVideo) => VideoUpdate;

export const setupUpdateVideo: Setup = (videoRepository) => async (input) => {
  const updatedVideo = await videoRepository.update(input);

  if (!updatedVideo) throw new ServerError();

  return this;
};
