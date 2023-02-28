import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../../main/config/env";
import { unauthorized } from "../../../utils/htttp";
interface ITokenPayload {
  iat: number;
  exp: number;
  id: number;
}

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers?.authorization;

  if (!token) return res.status(401).send(unauthorized());

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).send(unauthorized());

    const { id } = decoded as ITokenPayload;

    req.userId = id;
    next();
  });
}
