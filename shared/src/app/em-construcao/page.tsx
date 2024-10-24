"use client"

import React from "react";

import Image from "next/image";
import { ModelPage } from "../../components/ModelPage";

export default function UnderConstruction() {
  return (
    <ModelPage
      title="Página em construção!"
      titleClassName="pt-20"
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex flex-col items-center gap-2">
          <div className="text-center text-slate-gray mt-4 w-[30ch] flex flex-col items-center gap-6 text-sm font-medium leading-relaxed">
            <p>
              Nosso sistema está em fase de desenvolvimento e a página que você
              acessou ainda não está pronta.
            </p>
            <p>
              Estamos trabalhando para que a sua experiência seja a melhor o
              possível, agradecemos a compreensão!
            </p>
          </div>
        </div>
        <div className="-m-4">
          <Image
            src="/construcao.png"
            alt="Em construção"
            width={360}
            height={235}
            style={{
              objectFit: "contain",
              objectPosition: "bottom",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </ModelPage>
  );
}
