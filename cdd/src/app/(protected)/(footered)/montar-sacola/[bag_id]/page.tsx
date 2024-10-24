"use client"

import { ModelPage } from "@shared/components/ModelPage";
import BagMiniTable from "./components/BagMiniTable";

export default async function Home() {
  return (
    <ModelPage
      title="Conteúdo da sacola"
      titleGap="gap-2"
      titleClassName="w-96"
      subtitle="Monte a sacola abaixo e, após concluir, marque como pronta"
      subtitleClassName="w-96"
      overflowAuto={true}
    >
      <BagMiniTable />
    </ModelPage>
  );
}
