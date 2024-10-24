"use client"

import { ModelPage } from "@shared/components/ModelPage";
import SendBagMiniTable from "./components/SendBagMiniTable";

export default async function Home() {
  return (
    <ModelPage
      title="Conteúdo da sacola"
      titleGap="gap-2"
      titleClassName="w-96"
      subtitle="Marque a sacola como enviada assim que ela estiver a caminho do cliente"
      subtitleClassName="w-96"
    >
      <SendBagMiniTable />
    </ModelPage>
  );
}
