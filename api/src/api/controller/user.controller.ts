import { Request, Response } from "express";
import { create, login } from "../../db/services/user.service";
import { UserOutput } from "../../db/models/user.model";
import { CreateUserDto, LoginDto } from "../dto";
import { RestResponseCodesEnum, ServiceResponse } from "../../db/types";
import lodash from "lodash";
import Session from "../../db/models/session.model";
import { deleteSession } from "../../db/services/session.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const serviceResponse: ServiceResponse<UserOutput> = await create(
      req.body as CreateUserDto
    );

    if (
      serviceResponse.code === RestResponseCodesEnum.SUCCESS &&
      serviceResponse.response
    ) {
      return res.send({
        result: lodash.omit(serviceResponse.response.parseToJson(), ["id"]),
      });
    }

    return res.status(serviceResponse.code).send(serviceResponse.message ?? "");
  } catch (error: any) {
    res.status(RestResponseCodesEnum.ERROR).send(error.message);
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const serviceResponse: ServiceResponse<Session> = await login(
      req.body as LoginDto
    );

    if (
      serviceResponse.code === RestResponseCodesEnum.SUCCESS &&
      serviceResponse.response
    ) {
      return res.send({
        token: serviceResponse.response.dataValues.token,
        refreshToken: serviceResponse.response.dataValues.refresh_token,
      });
    }

    return res.status(serviceResponse.code).send(serviceResponse.message ?? "");
  } catch (error: any) {
    res.status(RestResponseCodesEnum.ERROR).send(error.message);
  }
}

export async function logoutHandler(req: Request, res: Response) {
  try {
    const response: boolean = await deleteSession(
      // @ts-ignore
      req.user.id
    );

    if (response) {
      return res.sendStatus(RestResponseCodesEnum.SUCCESS);
    }

    return res.sendStatus(RestResponseCodesEnum.ERROR);
  } catch (error: any) {
    res.status(RestResponseCodesEnum.ERROR).send(error.message);
  }
}
