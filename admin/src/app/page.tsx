'use client';

import { HiOutlineInformationCircle } from "react-icons/hi";
import LastSalesTable from "./components/LastSalesTable";
import Button from "@shared/components/Button";

export default function Home() {
  return (
    <div className="flex h-full gap-14">
      <div className="w-2/3 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="pl-6 font-semibold">Informações de acesso</h1>
          <div className="flex flex-col h-44 bg-white rounded-2xl p-5 gap-1">
            <div className="text-xs font-inter">Unidade:</div>
            <div className="text-4xl font-semibold text-slate-blue">Armazém FURG</div>
            <div className="text-xs mt-12 font-inter">
              IP:
              <span className="font-bold"> 192.158.1.38 </span>
              | Acessado dia: <span className="font-bold"> 02-11-2024 </span>
              | Hora: <span className="font-bold"> 21:04</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="pl-6 font-semibold">Últimas vendas</h1>
          <LastSalesTable />
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="pl-6 font-semibold">Vendas nesse mês</h1>
          <div className="flex flex-col h-44 bg-white rounded-2xl p-5 gap-1">
            <div className="flex items-top justify-between gap-20">
              <div className="text-4xl font-semibold text-rain-forest">R$ 1.893,44</div>
                <button>
                  <HiOutlineInformationCircle className="text-2xl text-theme-primary" />
                </button>
              </div>
            <div className="font-inter text-theme-primary">
              Taxas: R$ 378,69
            </div>
            <Button className=" mt-3 text-ms font-inter font-semibold w-full h-12 bg-rain-forest rounded-md text-white">
              Visualizar as vendas
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="pl-6 font-semibold">Faturamento dos últimos meses</h1>
          <div className="flex flex-col h-44 bg-white rounded-2xl p-5 gap-1">
            a
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="pl-6 font-semibold">Vendas por dia</h1>
          <div className="flex flex-col h-44 bg-white rounded-2xl p-5 gap-1">
            a
          </div>
        </div>
      </div>
    </div>
  );
}
