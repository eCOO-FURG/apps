"use client";

import { use, useEffect, useState } from "react";

import ProducerTable from "../components/ProducerTable";
import Title from "../components/Title";

import { getFarms } from "@admin/_actions/farm/get-farms";

import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError";

export default function page() {
  const [farm, setFarm] = useState("");
  const debounceSearch = useDebounce(farm);
  const [result, setResult] = useState<any>();
  const { handleError } = useHandleError();

  useEffect(() => {
    getFarms({
      page: 1,
      farm: debounceSearch,
    }).then((response) => {
      if (response.message) {
        handleError(response.message);
      }
      setResult(response);
      console.log("Response", response);
    });
  }, [debounceSearch])

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
          <SearchInput onChange={setFarm} />
        </div>
      </div>
      <div className="rounded-xl bg-white">
        <ProducerTable farm={farm}/>
        {result}
      </div>
    </div>
  );
}
