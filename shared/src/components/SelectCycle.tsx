"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

import { FiChevronDown } from "react-icons/fi";

import Loader from "./Loader";
import { ICycle } from "../interfaces/cycle";
import { useHandleError } from "../hooks/useHandleError";
import { useCycleProvider } from "../context/cycle/index";
import { getCycles } from "../_actions/cycles/get-cycles";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function SelectCycle() {
  const [cycles, setCycles] = useState<ICycle[]>([]);
  const { cycle, setCycle } = useCycleProvider();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  
  const { handleError } = useHandleError();
  const { getFromStorage, setInStorage } = useLocalStorage();

  const handleCycleChange = (selectedCycle: ICycle) => {
    setCycle(selectedCycle);
    setInStorage("selected-cycle", selectedCycle);
    setIsOpen(false); 
  };

  const handleClickButton = () => {
    const storedCycle = getFromStorage("selected-cycle");
    if (!storedCycle) {
      toast.warning("Selecione um ciclo para ver mais informações sobre ele!");
      return;
    }
    router.push("/informacoes-ciclo");
  };

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const response = await getCycles();
        if (response.message) {
          handleError(response.message);
        } else {
          setCycles(response.data);
        }
      } catch (error) {
        toast.error("Erro ao buscar os ciclos.");
      }
    };

    fetchCycles();

    const savedCycle = getFromStorage("selected-cycle");
    if (savedCycle) {
      setCycle(savedCycle);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-2" ref={selectRef}>
      <span className="text-sm leading-[19px] text-slate-gray tracking-tight-2-percent">
        Para começar, selecione o{" "}
        <button
          className="underline underline-offset-[3px] font-bold"
          type="button"
          onClick={handleClickButton}
        >
          Ciclo
        </button>
      </span>

      <div className="relative w-full">
        <button
          type="button"
          className="relative w-full h-12 px-4 bg-white border rounded-lg flex justify-between items-center text-slate-gray focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!cycle ? <Loader loaderType="login" /> : (
            <>
              <span>{cycle ? `Ciclo ${cycle.alias}` : "Selecione um ciclo"}</span>
              <FiChevronDown
                className={`text-slate-gray transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
              />
            </>
          )}
        </button>

        {isOpen && (
          <ul className="absolute mt-1 w-full bg-white border border-slate-gray rounded-lg shadow-lg max-h-48 overflow-auto z-10 transition-all duration-200">
            {cycles.length > 0 ? (
              cycles.map((cycleOption) => (
                <li
                  key={cycleOption.id}
                  onClick={() => handleCycleChange(cycleOption)}
                  className={`px-4 py-2 text-theme-default cursor-pointer hover:bg-gray-100 ${
                    cycleOption.id === cycle?.id ? "bg-gray-100" : ""
                  }`}
                >
                  {`Ciclo ${cycleOption.alias}`}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-center text-theme-default">Nenhum ciclo disponível</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
