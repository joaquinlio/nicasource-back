import { RequestHandler } from "express";
import { Controller } from "../../utils/controller";

type Adapter = (controller: Controller) => RequestHandler;

export const adaptExpressRoute: Adapter = (controller) => async (req, res) => {
  const { statusCode, data } = await controller.handle({
    ...req.body,
    ...req.params,
    ...req.query,
    userId: req.userId,
  });
  const json = [200, 204].includes(statusCode) ? data : { error: data.message };

  res.status(statusCode).json(json);
};
