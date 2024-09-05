import { v4 as uuid } from "uuid";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import config from "config";
import { createUser, findUserByEmail } from "../dal/user.dal";
import { CreateUserDto, LoginDto } from "../../api/dto";
import { RestResponseCodesEnum, ServiceResponse } from "../types";
import log from "../../logger";
import Session from "../models/session.model";
import { createSession } from "./session.service";

async function encriptPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));
  return await bcrypt.hashSync(password, salt);
}

export async function create(
  payload: CreateUserDto
): Promise<ServiceResponse<User>> {
  try {
    const userWithSameEmail: User | null = await findUserByEmail(payload.email);
    if (!userWithSameEmail) {
      payload.password = await encriptPassword(payload.password);

      const newUser: User | undefined = await createUser({
        ...payload,
        id: uuid(),
      });

      if (newUser) {
        return {
          code: RestResponseCodesEnum.SUCCESS,
          response: newUser,
        };
      }
    } else {
      return {
        code: RestResponseCodesEnum.DUPLICATED,
        message: ["There is already a user with the email", payload.email].join(
          " "
        ),
      };
    }
  } catch (error: any) {
    log.error(error);

    return {
      code: RestResponseCodesEnum.ERROR,
      message: "Something bad happened",
    };
  }

  return {
    code: RestResponseCodesEnum.ERROR,
    message: "Something bad happened",
  };
}

export async function login(
  payload: LoginDto
): Promise<ServiceResponse<Session>> {
  try {
    const userWithSameEmail: User | null = await findUserByEmail(payload.email);

    if (userWithSameEmail) {
      const isValid: boolean = await userWithSameEmail.comparePasswords(
        payload.password
      );

      if (isValid) {
        const sessionResponse: Session | undefined = await createSession(
          userWithSameEmail
        );

        if (sessionResponse) {
          return {
            code: RestResponseCodesEnum.SUCCESS,
            response: sessionResponse,
          };
        }

        return {
          code: RestResponseCodesEnum.ERROR,
          message: "Something bad happened",
        };
      }
    }

    return {
      code: RestResponseCodesEnum.NOT_FOUND,
      message: ["No user was found with the email:", payload.email].join(" "),
    };
  } catch (error: any) {
    log.error(error);

    return {
      code: RestResponseCodesEnum.ERROR,
      message: "Something bad happened",
    };
  }
}
