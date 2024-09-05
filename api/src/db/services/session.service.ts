import log from "../../logger";
import Session from "../models/session.model";
import User from "../models/user.model";
import {
  create,
  deleteSessionByUserId,
  getSessionByRefreshToken,
} from "../dal/session.dal";
import { findUserById } from "../dal/user.dal";
import { sign } from "../../utils/jwt.utils";
import { ConfigParamsEnum } from "../../utils/types";
import config from "config";

export async function createSession(
  payload: User
): Promise<Session | undefined> {
  try {
    const newSession: Session | undefined = await create(payload);

    return newSession;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function deleteSession(payload: string): Promise<boolean> {
  try {
    await deleteSessionByUserId(payload);
    return true;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function refreshToken(
  payload: string
): Promise<Session | undefined> {
  try {
    const session: Session | undefined = await getSessionByRefreshToken(
      payload
    );
    if (session) {
      const userData: User | null = await findUserById(
        session.dataValues.user_id
      );

      if (userData) {
        const sessionToken: string = sign(userData.dataValues, {
          expiresIn: config.get(ConfigParamsEnum.ACCESSTOKENTTL),
        });

        const refreshToken: string = sign(userData.dataValues, {
          expiresIn: config.get(ConfigParamsEnum.REFRESHTOKENTTL),
        });

        session.update({
          refresh_token: refreshToken,
          token: sessionToken,
        });

        return session;
      }
    }
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}
