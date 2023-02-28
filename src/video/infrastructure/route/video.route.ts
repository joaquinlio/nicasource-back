import { Router } from "express";
import authenticateToken from "../../../auth/infrastructure/middleware/authenticateToken";
import { adaptExpressRoute } from "../../../main/adapters/express-router";
import {
  makeGetVideoController,
  makeLikeVideoController,
  makeListVideoController,
  makePublishVideoController,
  makeUnpublishVideoController,
  makeUpdateVideoController,
  makeUploadVideoController,
} from "../../../main/factories";
import { makeDislikeVideoController } from "../../../main/factories/video/dislikeVideo";

const route = Router();

route.post(
  `/video`,
  authenticateToken,
  adaptExpressRoute(makeUploadVideoController())
);
route.put(
  `/video`,
  authenticateToken,
  adaptExpressRoute(makeUpdateVideoController())
);
route.post(
  `/video/publish`,
  authenticateToken,
  adaptExpressRoute(makePublishVideoController())
);
route.post(
  `/video/unpublish`,
  authenticateToken,
  adaptExpressRoute(makeUnpublishVideoController())
);
route.post(
  `/video/like`,
  authenticateToken,
  adaptExpressRoute(makeLikeVideoController())
);

route.post(
  `/video/dislike`,
  authenticateToken,
  adaptExpressRoute(makeDislikeVideoController())
);

route.get(
  `/videos`,
  authenticateToken,
  adaptExpressRoute(makeListVideoController())
);
route.get(
  `/video/:id`,
  authenticateToken,
  adaptExpressRoute(makeGetVideoController())
);

export default route;
