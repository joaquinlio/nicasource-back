import { Router } from "express";
import authenticateToken from "../../../auth/infrastructure/middleware/authenticateToken";
import { adaptExpressRoute } from "../../../main/adapters/express-router";
import {
  makeCreateUserController,
  makeFollowUserController,
  makeUnfollowUserController,
} from "../../../main/factories";
import { makeProfileUserController } from "../../../main/factories/user/profileUser";
const route = Router();

route.post(`/user`, adaptExpressRoute(makeCreateUserController()));
route.post(
  `/user/follow`,
  authenticateToken,
  adaptExpressRoute(makeFollowUserController())
);
route.post(
  `/user/unfollow`,
  authenticateToken,
  adaptExpressRoute(makeUnfollowUserController())
);

route.get(
  `/user/profile`,
  authenticateToken,
  adaptExpressRoute(makeProfileUserController())
);

export default route;
