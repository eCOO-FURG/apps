import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";

import Button from "@shared/components/Button";

export default function Aprovar() {
  return (
    <div className="w-full h-full flex flex-col p-5 bg-theme-background">
      <div className="w-full h-screen flex justify-center flex-col">
        <div className="w-full h-4/5 flex items-center flex-col justify-center">
          <AiFillCheckCircle className="w-[100px] h-[100px] text-rain-forest" />
          <span className="mt-6 text-center text-3xl text-slate-gray font-medium">
            A oferta foi < br/> aprovada!
          </span>
          <span className="mt-4 text-center text-slate-gray font-medium text-sm">
            A oferta #205004 do produtor < br/> José da Silva foi aprovada.
          </span>
        </div>
        <div className="w-full h-1/5 pb-2 bg-red flex flex-col justify-end gap-4">
          <Link href={"/"}>
            <Button
              className="w-full rounded-lg font-semibold text-slate-gray border-slate-gray border-2 py-[10px]"
            >
              Voltar para a tela inicial
            </Button>
          </Link>
          <Link href={"/ofertas"}>
            <Button
              className="w-full px-2 py-3 font-semibold rounded-lg text-white border-0 p-2 bg-theme-default"
            >
              Verificar outra oferta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
