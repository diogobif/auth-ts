import express from "express";
import {
  createUserHandler,
  loginHandler,
  logoutHandler,
} from "../controller/user.controller";
import { validateRequest, validateAuthRoute } from "../middleware";
import { createUserSchema, loginSchema } from "../schemas";

enum UserRoutesEnum {
  CREATE = "/api/users",
  LOGIN = "/api/users/login",
  LOGOUT = "/api/users/logout",
}

export const userRouter = (router: express.Router) => {
  router.post(
    UserRoutesEnum.CREATE,
    validateRequest(createUserSchema),
    createUserHandler
  );

  router.post(UserRoutesEnum.LOGIN, validateRequest(loginSchema), loginHandler);

  router.put(UserRoutesEnum.LOGOUT, validateAuthRoute(), logoutHandler);
};
