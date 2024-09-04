import { Request, Response } from "express";
import { get } from "lodash";
import Session from "../../db/models/session.model";
import { refreshToken } from "../../db/services/session.service";
import { RestResponseCodesEnum } from "../../db/types";
import log from "../../logger";
import { decode } from "../../utils/jwt.utils";

export async function refreshTokenHandler(req: Request, res: Response) {
  try {
    let tokenToRefresh: string | string[] | undefined = get(
      req,
      "headers.x-refresh"
    );

    if (tokenToRefresh) {
      tokenToRefresh = tokenToRefresh[0] ?? tokenToRefresh;

      const { valid, expired } = decode(tokenToRefresh);

      if (valid) {
        const session: Session | undefined = await refreshToken(
          tokenToRefresh[0] ?? tokenToRefresh
        );

        if (session) {
          res.status(RestResponseCodesEnum.SUCCESS).send({
            token: session.dataValues.token,
            refreshToken: session.dataValues.refresh_token,
          });
        }
      }
    }

    res.status(RestResponseCodesEnum.UNAUTHORIZED).send("Token is not valid");
  } catch (error) {
    log.error(error);
    res.status(RestResponseCodesEnum.ERROR).send("Something bad happened");
  }
}
