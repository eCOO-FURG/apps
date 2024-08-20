import { SuccessReturn, UseCaseHandler } from "@shared/core/UseCase";
import { ecooAPIHTTPProvider } from "@shared/interfaces/ecoo-api-http-provider";

import { User } from "../entities/user";

export const getPrivate: UseCaseHandler<
  { access_token: string },
  { private: User["private"] }
> = async ({ access_token }, stubbed) => {
  if (stubbed) {
    return new SuccessReturn({ 
      private: {
        first_name: "Nome",
        last_name: "Sobrenome",
        email: "Email",
        phone: "(xx) xxxxx-xxxx",
      },
    });
  }

  const privateData = (await ecooAPIHTTPProvider.getPrivate(access_token)).data;

  return new SuccessReturn({ private: privateData });
}

