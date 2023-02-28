import { VideoLike } from "../../infrastructure/model/videoLike.model";
import { Video } from "../entity/video";

export interface IUploadVideo {
  upload: (
    input: Omit<Video, "id" | "photo" | "creationDate" | "published"> & number
  ) => Promise<Video | null>;
}

export interface IPublishVideo {
  publish: (input: number) => Promise<[affectedCount: number] | null>;
  unpublish: (input: number) => Promise<[affectedCount: number] | null>;
}

export interface IFindVideos {
  find: (input: number) => Promise<Video | null>;
  findByUserId: (input: number) => Promise<Video[] | null>;
  list: () => Promise<Video[] | null>;
}

export interface ILikeVideo {
  like: (userId: number, videoId: number) => Promise<VideoLike | null>;
  dislike: (userId: number, videoId: number) => Promise<number | null>;
  getUserLikes: (userId: number) => Promise<any>;
}

export interface IUpdateVideo {
  update: (
    input: Omit<Video, "creationDate" | "published">
  ) => Promise<[affectedCount: number] | null>;
}
