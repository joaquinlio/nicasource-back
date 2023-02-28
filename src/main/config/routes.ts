import { Express } from "express";
import auth from "../../auth/infrastructure/route/auth.route";
import users from "../../user/infrastructure/route/user.route";
import video from "../../video/infrastructure/route/video.route";

export const setupRoutes = (app: Express): void => {
  app.use(users);
  app.use(auth);
  app.use(video);
};
