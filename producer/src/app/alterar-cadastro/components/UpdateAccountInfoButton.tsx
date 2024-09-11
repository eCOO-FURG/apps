"use client";

import { useEffect, useState } from "react";
import OldButton from "@shared/components/OldButton";
import { toast } from "sonner";
import { updateUser } from "@producer/app/_actions/update-user/UpdateUserInfo";

interface UpdateAccountInfoButtonProps
 {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  email: string;
  cpf: string;
}

const UpdateAccountInfoButton = ({
  first_name,
  last_name,
  phone,
  password,
  email,
  cpf,
}: UpdateAccountInfoButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {

    console.log(first_name);
    console.log(last_name);
    console.log(phone);
    console.log(password);
    console.log(email);
    console.log("cpf:", cpf);

    await updateUser({ first_name, last_name, phone, password, email, cpf })
    .then((response) => {
      if (response?.reply.message){
        toast.error(response?.reply.message);
        return;
      } else {
        toast.success("Cadastro atualizado com sucesso!");
      }
    }).catch((error) => {
      toast.error(error)
    }).finally(() => {
      setLoading(false)
    })

  };

  return (
    <OldButton
      title="Salvar"
      className={`w-[full] px-2 py-3 font-semibold rounded-lg text-white border-0 bg-[#00735E]`}
      onClick={handleClick}
    >
      {loading ? "Carregando..." : "Salvar"}
    </OldButton>
  );
};

export default UpdateAccountInfoButton;
