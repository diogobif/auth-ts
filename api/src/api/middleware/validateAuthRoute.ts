import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { decode } from "../../utils/jwt.utils";
import { RestResponseCodesEnum } from "../../db/types";
import Session from "../../db/models/session.model";
import { getSessionByToken } from "../../db/dal/session.dal";

const validateAuthRequest =
  () => async (req: Request, res: Response, next: NextFunction) => {
    let bearerToken: string | undefined = get(req, "headers.authorization");

    if (bearerToken) {
      bearerToken = bearerToken.split(" ")[1];
      const session: Session | undefined = await getSessionByToken(bearerToken);

      if (session) {
        const { decoded, valid, expired } = decode(bearerToken);

        if (valid && !expired) {
          // @ts-ignore
          req.user = decoded;

          return next();
        }
      }
    }

    res.sendStatus(RestResponseCodesEnum.UNAUTHORIZED);
  };

export default validateAuthRequest;
