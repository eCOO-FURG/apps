import { cookies } from "next/headers";

import { ActionHandler } from "../../";
import { ExceptionReturn, SuccessReturn } from "@shared/core/UseCase";

export const getPrivate: ActionHandler<
  {},
  Promise<{ first_name: string; last_name: string; email: string; phone: string; }>
> = async (_data, useCases) => {
  const result = await await useCases["get-private"].execute({
    access_token: cookies().get("token")?.value as string,
  });

  if (result instanceof ExceptionReturn) {
    throw new Error(result.message);
  }

  return (result as SuccessReturn<any>).data.private;
};
