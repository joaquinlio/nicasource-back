import { Video } from "../../../video/domain/entity/video";
import { User } from "../../infrastructure/model/user.model";

export interface UserProfile extends User {
  videos: Video[];
  followers: string[];
  likeVideos: string[];
}
