import { Router } from "express";
import { adaptExpressRoute } from "../../../main/adapters/express-router";
import { makeLoginController } from "../../../main/factories/auth/login";

const route = Router();

route.post(`/login`, adaptExpressRoute(makeLoginController()));

export default route;
