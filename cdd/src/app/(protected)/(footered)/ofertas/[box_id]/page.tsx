"use client";

import FarmOrdersTable from "./components/page";
import { ModelPage } from "@shared/components/ModelPage";

export default function Home() {
  return (
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
