import { CreateUserDto } from "../../api/dto";
import log from "../../logger";
import User, { UserInput, UserOutput } from "../models/user.model";

export const createUser = async (
  payload: UserInput
): Promise<UserOutput | undefined> => {
  try {
    const newUser: UserOutput = await User.create(payload);
    return newUser;
  } catch (error: any) {
    console.error(error);
  }
};

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const queryResult: User | null = await User.findOne({
      where: {
        email: email,
      },
    });

    return queryResult;
  } catch (error: any) {
    log.error(error);
    return null;
  }
}

export async function findUserById(id: string): Promise<User | null> {
  try {
    const queryResult: User | null = await User.findOne({
      where: {
        id,
      },
    });

    return queryResult;
  } catch (error: any) {
    log.error(error);
    return null;
  }
}
