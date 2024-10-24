"use client";

import { ModelPage } from "@shared/components/ModelPage";
import FarmOrdersTable from "./components/page";

export default function Home() {
  return (
    // <div className="w-full h-full p-5 pb-6 flex items-center flex-col">
    //   <div className="flex flex-col w-full items-center justify-end mt-4">
    //     <h1 className="text-3xl font-medium text-slate-gray mb-4 text-center">Verificar oferta</h1>
    //     <span className="text-sm font-medium text-slate-gray mb-6 text-center">
    //       Confira os dados abaixo:
    //     </span>
    //   </div>

    // </div>

    <ModelPage
      title="Verificar oferta"
      titleGap="gap-2"
      subtitle="Confira os dados abaixo: "
      subtitleClassName="w-80"
    >
      <FarmOrdersTable />
    </ModelPage>
  );
}
