"use client";

import { useEffect, useState } from "react";

import ProducerTable from "../components/ProducerTable";
import Title from "../components/Title";

import { getFarms } from "@admin/_actions/farm/get-farms";

import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError"

type Admin = {
  id: string;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string | null;
};

type DataItem = {
  id: string;
  name: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
  tally: string;
  tax: number;
  description: string | null;
  admin: Admin;
  created_at: string;
  updated_at: string | null;
};

export default function page() {
  const [name, setName] = useState<string>("");
  const [farms, setFarms] = useState<DataItem[]>();
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
        setFarms(response.data);
      });
    })();
  }, [debounceSearch])
  
  return (
    <div className="w-full flex flex-col h-full gap-5">
      <div className="flex w-full items-center justify-between">
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
