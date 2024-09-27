"use client";

import { getUser } from "@shared/_actions/account/get-user"
import { useHandleError } from "@shared/hooks/useHandleError";
import SkeletonLoader from "@shared/components/SkeletonLoader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineBell, HiOutlinePencilAlt } from "react-icons/hi";
import { toast } from "sonner";


export function Header() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  const { handleError } = useHandleError()

  useEffect(() => {
    (async () => {
      await getUser()
        .then((response) => {
          if (response.message) {
            const messageError = response.message;

            handleError(messageError)
          } else if (response.data) {
            const { first_name, last_name } = response.data;
            setName(`${first_name} ${last_name}`);
            setIsLoading(false)
          }
        })
        .catch((error) => {
          toast.error(error)
        })
    })()
  }, [])

  return (
    <header className="w-full flex items-start justify-between px-2.5 text-lg leading-5.5 sticky pb-2.5 top-0 pt-9 z-50 bg-theme-background">
      <div className="flex-shrink">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
            <span className="flex gap-1 items-center">
              Olá, <Link href={"/alterar-cadastro"}><strong className="font-semibold hover:underline">{name}</strong></Link>
              <Link href={"/alterar-cadastro"}>
                <HiOutlinePencilAlt size={16} />
              </Link>
            </span>
        )}
      </div>
      <div className="flex gap-4.5">
        <button disabled className="">
          <HiOutlineBell size={24} />
        </button>
        <Link href="/api/auth/logout" title="Sair" type="button" aria-label="Sair" className="pt-0.5">
          Sair
        </Link>
      </div>
    </header>
  );
}
