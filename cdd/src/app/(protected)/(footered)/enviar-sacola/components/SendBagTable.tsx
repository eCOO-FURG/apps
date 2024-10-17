"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FaBoxOpen, FaCheck, FaExclamation } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { listBags } from "@cdd/app/_actions/bag/list-bags";

import { Bag } from "@shared/interfaces/bag";
import Loader from "@shared/components/Loader";
import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { twMerge } from "tailwind-merge";
import StatusFilterButtons from "./StatusFilterButton";
import Table from "../../ofertas/components/table";
import { IBagStatus } from "../page";

interface BagsProps {
  page: number;
  selectedStatus: IBagStatus;
  setSelectedStatus: (status: IBagStatus) => void;
}

export interface IStatus {
  name: string;
  key: string;
}

export default function SendBagTable({ page, selectedStatus, setSelectedStatus }: BagsProps) {
  const router = useRouter();

  const statuses: IStatus[] = [
    { name: "Separadas", key: "SEPARATED" },
    { name: "Enviadas", key: "DISPATCHED" },
    { name: "Entregues", key: "RECEIVED" },
    { name: "Retornadas", key: "DEFERRED" },
  ];

  const [bags, setBags] = useState<Bag[]>([]);
  const [bagsFiltered, setBagsFiltered] = useState<Bag[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearch = useDebounce(name);
  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  const handleStatusFilterClick = (status: IStatus) => {
    setSelectedStatus({ status: status.key as IBagStatus["status"] });
  };

  useEffect(() => {
    setIsLoading(true);
    const cycle = getFromStorage("selected-cycle");

    if (!cycle) {
      toast.error("Selecione um ciclo para ver os pedidos!");
      setIsLoading(false);
      return;
    }

    const { id } = cycle;

    listBags({
      cycle_id: id,
      page,
      status: selectedStatus.status,
      name: debounceSearch,
    })
      .then((response) => {
        console.log(response)
        if (response.data) {
          setBags(response.data);
          setBagsFiltered(response.data);
        } else {
          toast.error("Nenhuma sacola encontrada.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        handleError(error);
        setIsLoading(false);
      });
  }, [page, debounceSearch, selectedStatus]);

  const handleClick = (id: string) => {
    router.push(`/enviar-sacola/${id}`);
  };

  const getStatus = (
    status: IBagStatus["status"]
  ) => {
    const colorStatus = {
      SEPARATED: "bg-battleship-gray",
      DISPATCHED: "bg-caramel",
      RECEIVED: "bg-rain-forest",
      DEFERRED: "bg-error",
    };

    return (
      <div
        className={twMerge(
          "flex justify-center items-center m-auto bg-rain-forest w-4 h-4 p-1 rounded-full",
          `${colorStatus[status]}`
        )}
      >
        {status === "SEPARATED" && <FaExclamation size={10} color="white" />}
        {status === "DISPATCHED" && <HiDotsHorizontal color="white" />}
        {status === "RECEIVED" && <FaCheck color="white" />}
        {status === "DEFERRED" && <IoCloseSharp color="white" />}
      </div>
    );
  };

  const headers = [
    { label: "Código", style: "w-[30%]" },
    { label: "Cliente", style: "w-1/2" },
    { label: "Status", style: "w-1/5 text-center" },
  ];

  const info =
    bagsFiltered.length > 0
      ? bagsFiltered.map((bag) => ({
          id: bag.id,
          data: [
            { detail: bag.id },
            { detail: `${bag.user.first_name} ${bag.user.last_name}` },
            { detail: getStatus(bag.status as IBagStatus["status"]) },
          ],
        }))
      : [];

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <div className="w-full flex gap-2 items-center mt-4 mb-4">
          <SearchInput onChange={setName} />
        </div>
        <StatusFilterButtons
          statuses={statuses}
          selectedStatus={selectedStatus.status}
          handleStatusFilterClick={handleStatusFilterClick}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-3">
          <Loader className="mt-3" loaderType="component" />
        </div>
      ) : !isLoading && bags.length === 0 ? (
        <div className="flex flex-col justify-center gap-1 items-center mt-3 text-slate-gray">
          <FaBoxOpen className="text-walnut-brown" size={64} />
          <span className="text-center w-52">Nenhuma sacola encontrada!</span>
        </div>
      ) : (
        <>
          <Table headers={headers} info={info} onRowClick={handleClick} />
        </>
      )}
    </div>
  );
}
