"use client";
import SelectCycle from "@shared/components/SelectCycle";
import { CycleProvider } from "@shared/context";

import { Header } from "./home/components/Header";
import CardComponent from "./home/components/CardComponent";
import { ReportCardComponent } from "./home/components/ReportCardComponent";

export default function Cdd() {
  return (
    <div className="px-4 pb-10 pt-10 h-[var(--min-page-height)]">
      <CycleProvider>
        <Header />
        <div className="">
          <SelectCycle />
          <CardComponent
            isSelectedCycle={true}
            title="Receber ofertas"
            link="/ofertas"
          />
          <CardComponent
            isSelectedCycle={true}
            title="Montar sacola"
            link="/montar-sacola"
          />
          <CardComponent
            isSelectedCycle={true}
            title="Enviar sacola"
            link="/enviar-sacola"
          />
          <ReportCardComponent />
        </div>
      </CycleProvider>
    </div>
  );
}
