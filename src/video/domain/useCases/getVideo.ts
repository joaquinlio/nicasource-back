import { ServerError } from "../../../utils/errors";
import { IFindVideos } from "../contracts/video";
import { Video } from "../entity/video";

export type VideoGet = (input: { id: number }) => Promise<Video>;

type Setup = (videoRepository: IFindVideos) => VideoGet;

export const setupGetVideo: Setup = (videoRepository) => async (input) => {
  const video = await videoRepository.find(input.id);

  if (!video) throw new ServerError();

  return video;
};
