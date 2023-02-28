import { IFollowerUser } from "../../../user/domain/contracts/user";
import { ServerError } from "../../../utils/errors";
import { IFindVideos, ILikeVideo } from "../contracts/video";
import { Video as VideoEntity } from "../entity/video";

export type VideoList = (input: { userId: number }) => Promise<VideoEntity[]>;

type Setup = (
  videoRepository: IFindVideos & ILikeVideo,
  userRepository: IFollowerUser
) => VideoList;

export const setupListVideo: Setup =
  (videoRepository, userRepository) => async (input) => {
    const videos = await videoRepository.list();

    if (!videos) throw new ServerError();

    const userLikeVideos = await videoRepository.getUserLikes(input.userId);

    if (!userLikeVideos) throw new ServerError();

    const userFollowings = await userRepository.getFollowings(input.userId);

    if (!userFollowings) throw new ServerError();

    videos.forEach((video: any) => {
      const hasLike = userLikeVideos.some(
        (userLikeVideo: { Video: { id: number } }) =>
          userLikeVideo.Video.id === video.id
      );

      video.dataValues.likedByuser = hasLike;

      const creatorIsFollowedByUser = userFollowings.Following.some(
        (following: { id: number }) => following.id === video.userId
      );

      video.dataValues.creatorIsFollowedByUser = creatorIsFollowedByUser;
    });

    return videos;
  };
