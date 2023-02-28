import { User } from "../../../user/infrastructure/model/user.model";
import { ILikeVideo, IUploadVideo } from "../../domain/contracts/video";
import { Video } from "../../domain/entity/video";
import { Video as VideoModel } from "../model/video.model";
import { VideoLike } from "../model/videoLike.model";

export class VideoRepository implements IUploadVideo, ILikeVideo {
  async upload({
    title,
    url,
    userId,
  }: Omit<Video, "id" | "creationDate" | "published"> &
    number): Promise<Video | null> {
    return await VideoModel.create({
      title,
      url,
      userId,
    });
  }

  async publish(videoId: number): Promise<[affectedCount: number] | null> {
    return await VideoModel.update(
      { published: true },
      { where: { id: videoId } }
    );
  }

  async find(videoId: number): Promise<Video | null> {
    return await VideoModel.findOne({
      where: { id: videoId },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
  }

  async unpublish(videoId: number): Promise<[affectedCount: number] | null> {
    return await VideoModel.update(
      { published: false },
      { where: { id: videoId } }
    );
  }

  async list(): Promise<Video[] | null> {
    return await VideoModel.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "photo"],
        },
      ],
    });
  }

  async findByUserId(userId: number): Promise<Video[] | null> {
    return await VideoModel.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
  }

  async like(userId: number, videoId: number): Promise<VideoLike | null> {
    return await VideoLike.create({
      userId,
      videoId,
    });
  }

  async dislike(userId: number, videoId: number): Promise<number | null> {
    return await VideoLike.destroy({
      where: {
        userId,
        videoId,
      },
    });
  }

  async update({
    id,
    title,
    url,
  }: Omit<Video, "creationDate" | "published">): Promise<
    [affectedCount: number] | null
  > {
    return await VideoModel.update({ title, url }, { where: { id } });
  }

  async getUserLikes(userId: number): Promise<any> {
    return await VideoLike.findAll({
      where: { userId },
      include: {
        model: VideoModel,
        attributes: [
          "id",
          "title",
          "url",
          "creationDate",
          "published",
          "userId",
        ],
      },
      attributes: [],
    });
  }
}
