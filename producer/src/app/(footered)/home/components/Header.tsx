"use client";

import { getUser } from "@producer/app/_actions/get-user/getUser";
import { useHandleError } from "@shared/hooks/useHandleError";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { toast } from "sonner";

const handleLogout = () => {};

export function Header() {
  const [name, setName] = useState("");
  const { handleError } = useHandleError()

  useEffect(() => {
    (async () => {
      await getUser().then((response) => {
        if (response.message) {
          const messageError = response.message;
          handleError(messageError)
        } else if (response.data) {
          const { first_name, last_name } = response.data;
          setName(`${first_name} ${last_name}`);
        }
      }).catch((error) => {
        toast.error(error)
      })
    })()
  }, [])

  return (
    <header className="flex items-center mb-4 text-slate-gray">
      <span className="text-lg">
        Olá, <Link href={"/alterar-cadastro"}><strong className="font-semibold underline cursor-pointer">{name}!</strong></Link>
      </span>
      <div className="flex ml-auto">
        <button className="mr-4 text-xl md:text-2xl">
          <HiOutlineBell />
        </button>
        <Link
          onClick={handleLogout}
          href={"/api/auth/logout"}
          className="text-theme-primary md:text-lg"
        >
          Sair
        </Link>
      </div>
    </header>
  );
}
