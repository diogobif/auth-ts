import express from "express";
import validateAuthRequest from "../middleware/validateAuthRoute";
import { refreshTokenHandler } from "../controller/session.controller";

enum SessionRoutesEnum {
  REFRESHTOKEN = "/api/sessions/refresh",
}

export const sessionRouter = (router: express.Router) => {
  router.put(SessionRoutesEnum.REFRESHTOKEN, refreshTokenHandler);
};
