import { NotFoundError, ServerError } from "../../../utils/errors";
import { IFindVideos, ILikeVideo } from "../../../video/domain/contracts/video";
import { IFindUsers, IFollowerUser } from "../contracts/user";
import { UserProfile } from "../entity/userProfile";

export type ProfileUser = (input: { userId: number }) => Promise<UserProfile>;

type Setup = (
  userRepository: IFindUsers & IFollowerUser,
  videoRepository: IFindVideos & ILikeVideo
) => ProfileUser;

export const setupProfileUser: Setup =
  (userRepository, videoRepository) => async (input) => {
    const user = await userRepository.findById(input.userId);

    if (!user) throw new ServerError();

    const videos = await videoRepository.findByUserId(input.userId);

    if (!videos) throw new ServerError();

    const result = await userRepository.getFollowers(input.userId);

    if (!result) throw new ServerError();

    const likeVideos = await videoRepository.getUserLikes(input.userId);

    if (!likeVideos) throw new ServerError();

    return {
      ...user.dataValues,
      videos,
      followers: result.Followers,
      likeVideos,
    };
  };
