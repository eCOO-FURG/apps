'use client'

import { useState } from "react";
import { toast } from "sonner";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { listBags } from "@cdd/app/_actions/list-bags";
import SendBagTable from "./components/SendBagTable";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const backPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = async () => {
    if (!hasNextPage) return;

    const cycle_idString = localStorage.getItem("selected-cycle") as string;

    if (!cycle_idString) {
      toast.warning("Selecione um ciclo para começar uma oferta!");
      return;
    }

    const { id } = JSON.parse(cycle_idString);

    const response = await listBags({
      page: page + 1,
      cycle_id: id,
      status: "SEPARATED",
    });

    if (response.length > 0) {
      setPage((prev) => prev + 1);
    } else {
      setHasNextPage(false);
    }
  };

  return (
    <div className="w-full h-full p-5 pb-6 flex items-center flex-col">
      <div className="flex flex-col h-[18%] w-full items-center justify-end mt-4">
        <h1 className="text-3xl font-medium text-slate-gray mb-4 text-center">Enviar sacolas</h1>
        <span className="text-sm font-medium text-slate-gray mb-6 text-center">
          Envie as sacolas abaixo
        </span>
      </div>
      <div className="w-full h-[72%] overflow-y-auto">
        <SendBagTable page={page} />
      </div>
      <div className="w-full h-[10%] flex justify-center items-end">
        <div className="gap-4 flex">
          <button onClick={backPage}>
            <IoIosArrowBack />
          </button>
          {page}
          <button onClick={nextPage}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
