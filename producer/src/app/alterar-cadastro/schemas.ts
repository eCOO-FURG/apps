import z from "zod";

import { validateCellphone } from "@shared/utils";

export const updateInfoFieldsSchema = {
  first_name: z.string().min(1, { message: "Campo obrigatório." }).max(255),
  last_name: z.string().min(1, { message: "Campo obrigatório" }).max(255),
  email: z.string().email({ message: "Formato de e-mail inválido." }),
  phone: z.string().min(11, "Formato de telefone inválido.").refine((value) => validateCellphone(value), {
    message: "Formato de telefone inválido.",
  }),
  password: z.string().min(8, { message: "Deve conter pelo menos 8 caracteres." }),
  confirm_password: z.string().min(8, { message: "Deve conter pelo menos 8 caracteres." })
};