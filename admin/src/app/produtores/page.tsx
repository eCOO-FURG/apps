"use client";

import { useEffect, useState } from "react";

import ProducerTable from "../components/ProducerTable";
import Title from "../components/Title";

import { listFarms } from "../../_actions/farms/GET/list-farms";

import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError"
import { ProducerDTO } from "@shared/interfaces/user";

export default function page() {
  const [name, setName] = useState<string>("");
  const [farms, setFarms] = useState<ProducerDTO[]>();
  const debounceSearch = useDebounce(name);
  const { handleError } = useHandleError();

  useEffect(() => {
    (() => {
      listFarms({
        page: 1,
        farm: debounceSearch,
      }).then((response) => {
        if (response.message) {
          handleError(response.message);
        }
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
        <ProducerTable farms={farms}/>
      </div>
    </div>
  );
}
