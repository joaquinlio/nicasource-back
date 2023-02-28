import env from "../config/env";
import { JwtTokenHandler } from "../gateways/jwt";

export const makeJwt = (): JwtTokenHandler =>
  new JwtTokenHandler(env.jwtSecret);
