import { User } from "@shared/domain/entities/user";

import { ActionHandler } from "..";

interface CreateAccountData {
  email: string;
  cellphone: number;
  password: string;
  first_name: string;
  last_name: string;
  cpf: string;
}

export const createAccount: ActionHandler<
  CreateAccountData,
  Promise<User>
> = async (data, useCases) => {
  const { user } = await (await useCases["create-account"].execute(data)).data;

  return user;
};
