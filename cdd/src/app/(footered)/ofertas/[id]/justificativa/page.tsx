"use client";
import Button from "@shared/components/Button";
import Dropdown from "@shared/components/Dropdown";

import RejectModal from "./components/RejectModal";

const justifications = [
  { id: 1, name: "Falta de produtos", unavailable: false },
  { id: 2, name: "Produtos errados", unavailable: false },
  { id: 3, name: "Baixa qualidade", unavailable: false },
  { id: 4, name: "Produtos vencidos", unavailable: false },
  { id: 5, name: "Quantidade errada", unavailable: false },
  { id: 6, name: "Armazenamento incorreto", unavailable: false },
  { id: 7, name: "Pragas / doenças", unavailable: false },
];

export default function Home({ params }: { params: { id: string } }) {
  const entregaSelecionada = ([] as any).find(
    (entrega: { id: number }) => entrega.id === parseInt(params.id)
  );
  return (
    <div className="flex flex-col bg-theme-background px-5 pt-16 justify-start h-full">
      <span className="text-center text-3xl font-medium text-slate-gray">
        Selecione uma <br /> justificativa
      </span>
      <span className="mt-2 text-center text-sm font-medium text-slate-gray">
        Selecione uma justificativa <br /> para rejeitar a entrega
      </span>
      <div className="h-full w-full flex flex-col justify-between gap-y-4">
        <div className="mt-5 h-3/5 ">
          <label className="font-inter text-sm text-theme-primary">
            Justificativa
            <Dropdown data={justifications} />
          </label>
        </div>
        <div className="h-[16%] flex left-4 right-4 items-end">
          <RejectModal
            openButton={
              <Button
                title={"Rejeitar"}
                className="font-inter bg-[#FF7070] h-[44px] text-white "
              />
            }
            link={`/pedidos/${entregaSelecionada?.id}/justificativa/rejeitar`}
          />
        </div>
      </div>
    </div>
  );
}
