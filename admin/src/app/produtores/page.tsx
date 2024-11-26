"use client";

import { useEffect, useState } from "react";

import IProducerTable from "../components/ProducerTable";
import Title from "../components/Title";

import { getFarms } from "@admin/_actions/farm/get-farms";

import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError"
import { IProducer } from "@shared/interfaces/user";

export default function page() {
  const [name, setName] = useState<string>("");
  const [farms, setFarms] = useState<IProducer[]>();
  const debounceSearch = useDebounce(name);
  const { handleError } = useHandleError();

  useEffect(() => {
    (() => {
      getFarms({
        page: 1,
        farm: debounceSearch,
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
        console.log(response.data);
        setFarms(response.data);
      });
    })();
  }, [debounceSearch])
  
  return (
    <div className="w-full flex flex-col h-full gap-6">
      <div className="flex w-full items-center justify-between pt-8">
        <Title>Produtores</Title>
        <div className="w-2/5">
          <SearchInput onChange={setName} />
        </div>
      </div>
      <div className="rounded-xl bg-white">
        <IProducerTable farms={farms}/>
      </div>
    </div>
  );
}
