export interface Video {
  id: number;
  title: string;
  url: string;
  creationDate: string;
  published: boolean;
  userId?: string;
  likedByuser?: boolean;
  creatorIsFollowedByUser?: boolean;
}
