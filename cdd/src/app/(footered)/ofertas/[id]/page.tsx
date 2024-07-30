"use client";

import React from "react";
import { useParams } from "next/navigation";
import MiniTable from "./components/MiniTable";

export default function Home() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="w-full h-full p-5 pb-6 flex items-center flex-col">
    <div className="flex flex-col h-[18%] w-full items-center justify-end mt-4">
      <h1 className="text-3xl font-medium text-slate-gray mb-4 text-center">Verificar oferta</h1>
      <span className="text-sm font-medium text-slate-gray mb-6 text-center">
        Confira os dados abaixo:
      </span>
    </div>
    <div className="w-full h-[72%] overflow-y-auto">
      <MiniTable />
    </div>
    <div className="w-full h-[10%] flex justify-center items-end">
      <div className="gap-4 flex">
        <button>
        </button>
        <button>
        </button>
      </div>
    </div>
  </div>
  );
}
