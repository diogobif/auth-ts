import log from "../../logger";
import { sign } from "../../utils/jwt.utils";
import { ConfigParamsEnum } from "../../utils/types";
import Session, { SessionInput, SessionOutput } from "../models/session.model";
import User from "../models/user.model";
import config from "config";

export async function create(payload: User): Promise<Session | undefined> {
  try {
    const sessionToken: string = sign(payload.dataValues, {
      expiresIn: config.get(ConfigParamsEnum.ACCESSTOKENTTL),
    });

    const refreshToken: string = sign(payload.dataValues, {
      expiresIn: config.get(ConfigParamsEnum.REFRESHTOKENTTL),
    });

    const newSessionAttributes: SessionInput = {
      token: sessionToken,
      user_id: payload.id,
      refresh_token: refreshToken,
    };

    await deleteSessionByUserId(payload.id);

    const newSession: Session = await Session.create(newSessionAttributes);

    return newSession;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function deleteSessionByUserId(userId: string): Promise<void> {
  try {
    Session.destroy({ where: { user_id: userId } });
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function getSessionByToken(
  token: string
): Promise<Session | undefined> {
  try {
    const session: Session | null = await Session.findOne({ where: { token } });
    if (session) {
      return session;
    }
    return undefined;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function getSessionByRefreshToken(
  token: string
): Promise<Session | undefined> {
  try {
    const session: Session | null = await Session.findOne({
      where: { refresh_token: token },
    });

    if (session) {
      return session;
    }
    return undefined;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}
