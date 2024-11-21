'use client';

import { useState } from "react";

import ProducerTable from "../components/ProducerTable";
import Title from "../components/Title";

import { useDebounce } from "@shared/hooks/useDebounce";
import SearchInput from "@shared/components/SearchInput";

export default function page() {
  const [name, setName] = useState("");
  const debounceSearch = useDebounce(name);

  return (
    // <div className="flex gap-8">
    //   <div className="text-white h-96 bg-yellow-500 flex flex-auto items-center justify-center">
    //     Hello 1
    //   </div>
    //   <div className="text-white h-96 bg-blue-500 flex flex-auto items-center justify-center">
    //     Hello 2
    //   </div>
    //   <div className="text-white h-96 bg-red-500 flex flex-auto items-center justify-center">
    //     Hello 3
    //   </div>
    // </div>
    <div className="w-full flex flex-col h-full gap-5">
      <div className="flex w-full items-center justify-between">
        <Title>Produtores</Title>
        <div className="w-2/5">
          <SearchInput onChange={setName} />
        </div>
      </div>
      <div className="rounded-xl bg-white">
        <ProducerTable name={debounceSearch} />
      </div>
    </div>
  );
}
