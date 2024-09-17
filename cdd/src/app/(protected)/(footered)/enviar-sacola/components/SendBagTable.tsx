"use client";

import { useRouter } from "next/navigation";
import { listBags } from "@cdd/app/_actions/bag/list-bags";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "@shared/components/Button";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import { Bag } from "@shared/interfaces/bag"
import Loader from "@shared/components/Loader";
import { useHandleError } from "@shared/hooks/useHandleError";
import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";

interface BagsProps {
  page: number;
}

export default function SendBagTable({ page }: BagsProps) {
  const router = useRouter();

  const [bags, setBags] = useState<Bag[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearch = useDebounce(name)
  const { handleError } = useHandleError()
  const { getFromStorage } = useLocalStorage()

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const cycle = getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para ver os pedidos!");
        return;
      }

      const { id } = cycle;

      await listBags({
        cycle_id: id,
        page,
        status: "SEPARATED",
        name: debounceSearch
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            setBags(response.data);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })

      await listBags({
        cycle_id: id,
        page,
        status: "DISPATCHED",
        name: debounceSearch
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            setBags(prevBags => [...prevBags, ...response.data]);
            setIsLoading(false);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    })();
  }, [page, name]);

  const handleClick = (id: string) => {
    const path = `/enviar-sacola/${id}`;
    router.push(path);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <div className="w-full flex gap-2 items-center mt-4 mb-4">
          <SearchInput onChange={setName} />
        </div>
      </div>
      {isLoading ? (
        <Loader 
          className="mt-3" 
          appId="CDD"
          loaderType="component"
        />
      ) : !isLoading && bags.length === 0 ? (
        <span className="text-center mt-3 text-slate-gray">
          {name === "" ? "Ainda não há sacolas para serem enviadas." : "Nenhum cliente encontrado."}
        </span>
      ) : (
        <table className="bg-white text-theme-primary text-left leading-7 w-full table-fixed rounded-lg mb-4 overflow-y-hidden">
          <thead className="w-full">
            <tr className="text-[rgb(84,95,113)]">
              <th className="truncate w-1/5 text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center">
                Código
              </th>
              <th className="truncate w-1/2 text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center">
                Cliente
              </th>
              <th className="truncate w-[30%] text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bags.map((bag) => (
              <tr onClick={() => handleClick(bag.id)} key={bag.id} className="text-center cursor-pointer">
                <td className="border-b-[1px] truncate text-[#545F71] px-2 py-3">
                  {/* {getNextSaturdayDate()} */}
                  {bag.id}
                </td>
                <td className="border-b-[1px] truncate text-[#545F71] px-2 py-3">
                  {`${bag.user.first_name} ${bag.user.last_name}`}
                </td>
                {bag.status === "SEPARATED" ? (
                  <td className="border-b-[1px] truncate text-white font-semibold px-2 py-2">
                    <Button className="w-full bg-walnut-brown px-3 py-2 rounded-3xl">Enviar</Button>
                  </td>
                ) : (
                  <td className="w-full border-b-[1px] truncate text-theme-primary font-semibold px-2 py-2">
                    <Button className="w-full bg-theme-background px-3 py-2 rounded-3xl">Enviada</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
