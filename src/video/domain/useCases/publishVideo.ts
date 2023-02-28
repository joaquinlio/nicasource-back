import { NotFoundError, ServerError } from "../../../utils/errors";
import { IFindVideos, IPublishVideo, IUploadVideo } from "../contracts/video";
export type VideoPublish = (input: { id: number }) => Promise<void>;

type Setup = (
  videoRepository: IUploadVideo & IPublishVideo & IFindVideos
) => VideoPublish;

export const setupPublishVideo: Setup = (videoRepository) => async (input) => {
  const videoFound = await videoRepository.find(input.id);

  if (!videoFound) throw new NotFoundError();

  const updatePublish = await videoRepository.publish(input.id);

  if (!updatePublish) throw new ServerError();

  return this;
};
