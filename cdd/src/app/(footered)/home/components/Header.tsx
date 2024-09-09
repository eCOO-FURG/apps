"use client";

import { getUser } from "@cdd/app/_actions/user/get-user";
import { useHandleError } from "@shared/hooks/useHandleError";
import SkeletonLoader from "@shared/components/SkeletonLoader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
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
    <header className="flex items-center mb-4">
      <span className="flex items-center gap-2 text-lg">
        {isLoading ? (
          <>
            Olá, <SkeletonLoader />
          </>
        ) : (
          <>
            Olá , <strong className="font-semibold">{name}</strong>
          </>
        )}
      </span>
      <div className="flex ml-auto">
        <button className="mr-4 text-xl md:text-2xl">
          <HiOutlineBell />
        </button>
        <Link
          href={"/api/auth/logout"}
          className="text-theme-primary md:text-lg"
        >
          Sair
        </Link>
      </div>
    </header>
  );
}
