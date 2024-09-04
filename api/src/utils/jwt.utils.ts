import jwt from "jsonwebtoken";
import config from "config";
import { ConfigParamsEnum } from "./types";
import log from "../logger";

const privateKey = config.get(ConfigParamsEnum.PRIVATEKEY) as string;

export function sign(object: Object, options?: jwt.SignOptions): string {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    log.error(error);

    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
