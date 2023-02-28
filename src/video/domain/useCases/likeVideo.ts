import { NotFoundError, ServerError } from "../../../utils/errors";
import { IFindVideos, ILikeVideo } from "../contracts/video";
export type VideoLike = (input: {
  id: number;
  userId: number;
}) => Promise<void>;

type Setup = (videoRepository: IFindVideos & ILikeVideo) => VideoLike;

export const setupLikeVideo: Setup = (videoRepository) => async (input) => {
  const videoFound = await videoRepository.find(input.id);

  if (!videoFound) throw new NotFoundError();

  const likedVideo = await videoRepository.like(input.userId, input.id);

  if (!likedVideo) throw new ServerError();

  return this;
};
