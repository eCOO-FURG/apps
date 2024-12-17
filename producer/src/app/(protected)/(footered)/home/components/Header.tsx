"use client";

import { fetchProfile } from "@shared/_actions/users/GET/fetch-profile";
import SkeletonLoader from "@shared/components/SkeletonLoader";
import { useHandleError } from "@shared/hooks/useHandleError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineBell, HiOutlinePencilAlt } from "react-icons/hi";
import { toast } from "sonner";

export function Header() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const { handleError } = useHandleError();

  useEffect(() => {
    (async () => {
      await fetchProfile()
        .then((response) => {
          if (response.message) {
            handleError(response.message);
          } else if (response.data) {
            const { first_name } = response.data;

            setName(first_name);
            setIsLoading(false);
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        });
    })();
  }, []);

  const logout = () => {
    router.push("/api/auth/logout");
  };

  return (
    <header className="w-full flex items-start justify-between px-3 text-lg leading-5.5 top-0 z-10 bg-theme-background pb-2.5">
      <div className="flex-shrink">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <span className="flex gap-1 items-center text-slate-gray">
            Olá,{" "}
            <Link href={"/perfil"} className="flex gap-1 items-center">
              <strong className="font-semibold underline underline-offset-2">
                {name}!
              </strong>
              <HiOutlinePencilAlt size={18} />
            </Link>
          </span>
        )}
      </div>
      <div className="flex gap-4.5">
        <button disabled className="text-theme-primary">
          <HiOutlineBell size={24} />
        </button>
        <button
          onClick={logout}
          title="Sair"
          type="button"
          aria-label="Sair"
          className="pt-0.5 text-slate-gray"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
