import log from "../../logger";
import User, { UserInput } from "../models/user.model";

export const createUser = async (
  payload: UserInput
): Promise<User | undefined> => {
  try {
    const newUser: User = await User.create(payload);
    return newUser;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
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
    console.error(error);
    throw new Error(error);
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
    throw new Error(error);
  }
}
