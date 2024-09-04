import log from "../../logger";
import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { RestResponseCodesEnum } from "../../db/types";

const validateRequest =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error: any) {
      log.error(error);
      return res.status(RestResponseCodesEnum.BAD_REQUEST).send(error.errors);
    }
  };

export default validateRequest;
