"use client";

import { useState } from "react";
import { updateUser } from "@producer/app/_actions/UpdateUserInfo";
import OldButton from "@shared/components/OldButton";

interface UpdateAccountInfoButtonProps
 {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
}

const UpdateAccountInfoButton = ({
  first_name,
  last_name,
  phone,
  password,
}: UpdateAccountInfoButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {

    // console.log(first_name);
    // console.log(last_name);
    // console.log(phone);
    // console.log(password);

    await updateUser ({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      password: password,
    }).then((json) => {
      console.log(json);
    }).catch((error) => {
      console.error(error);
    });
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
