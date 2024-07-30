"use client";
import React from "react";

interface MiniTableProps {
  entrega: {
    id: number;
    nome: string;
    prazo: string;
    conteudo: string[];
  };
}

export default function MiniTable() {
  return (
    <div className="w-full">

    </div>
    // <div className="p-2 pt-1 bg-white rounded-xl text-theme-primary">
    //   <div className="border-b h-11 flex items-center font-inter">
    //     ID da entrega:{" "}
    //     <div className="ml-16 overflow-hidden text-ellipsis font-inter whitespace-nowrap">

    //     </div>
    //   </div>
    //   <div className="border-b h-11 flex items-center font-inter">
    //     Status:{" "}
    //     <div className="ml-16 overflow-hidden text-ellipsis font-inter whitespace-nowrap">

    //     </div>
    //   </div>
    //   <div className="border-b h-11 flex items-center font-inter">
    //     Produtor:{" "}
    //     <div className="ml-3 overflow-hidden text-ellipsis whitespace-nowrap font-inter">

    //     </div>
    //   </div>
    //   <div className="border-b h-11 flex items-center font-inter">
    //     Prazo: <div className="ml-9"></div>
    //   </div>
    //   <div className=" h-11 flex items-center font-inter">Conteúdo:</div>
    //   <ul>
    //     {/* {entrega.conteudo.map((item, index) => (
    //       <li
    //         key={index}
    //         className="mb-1 overflow-hidden text-ellipsis font-inter whitespace-nowrap"
    //       >
    //         {item}
    //       </li>
    //     ))} */}
    //   </ul>
    // </div>
  );
}
