"use client";

import { Catalog, Farm, fetchCatalogs } from "@consumer/app/_actions/fetch-catalogs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { Cycle, fetchCycles } from "../../_actions/fetch-cycles";
import RedirectCart from "@consumer/app/_components/redirectCart";
export default function Produtores() {

  const [cycles, setcycle] = useState([] as Cycle[]);
  const [cycleId, setCycleId] = useState('' as string);
  const [producers, setProducers] = useState([] as any[]);
  const [page, setPage] = useState(1 as number);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView()


  useEffect(() => {
    (async () => {
      setcycle(await fetchCycles());
    })();
  }, []);
  
  const searchProducers = async () => {

    const typeCycle = process.env.NEXT_PUBLIC_ENV == "dev" || process.env.NEXT_PUBLIC_ENV == "homolog" ? "livre" : "semanal";
    
    const cycleId = cycles.find(
      (cycle) => cycle.alias.toLocaleLowerCase() == typeCycle
    )?.id;

    setCycleId(cycleId as string);

    const catalogs: Catalog[] = await fetchCatalogs(cycleId, page);

    let newProducers = catalogs.map((catalog) => {
      return { id: catalog.id, name: catalog.farm.name, caf: catalog.farm.caf };
    });

    if(newProducers.length == 0){
      setIsLoading(false)
      return
    }

    setProducers((producers) => [...producers, ...newProducers])
    setPage((page) => page + 1)

  }

  useEffect(() => {
    if (inView) {
      searchProducers();
    }
  }, [inView, cycles])


  return (
    <>
      <div className="flex flex-col h-full">
        <div className="overflow-y-auto">
        {producers && producers.length !== 0
          ? producers.map((producer) => {
              return (
                <>
                  <Link href={`/ofertas/${producer?.id}/${producer?.name}/${cycleId}`}>
                    <div className="min-w-88 h-25 bg-[rgb(246,246,246)] flex rounded-2xl m-2.5">
                      <div className="flex w-20 h-20 ml-2.5 mt-2.5 mb-2.5 mr-5 bg-rain-forest rounded-xl">
                       <Image
                          src={ producer.caf != "123456789" ? "/produtor.jpg" : "/produtor2.jpeg"}
                          className="w-full h-full object-cover rounded-[10px]"
                          width={80}
                          height={80}
                          alt={`produtor.jpg`}
                          />
                      </div>
                      <div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
                        <span className="w-full text-left font-poppins text-base text-slate-gray">
                          {producer.name}
                        </span>
                      </div>
                      <div className="flex min-w-24 min-h-20 items-center justify-center m-2">
                        <Image
                          src="/arrow.png"
                          alt="arrow"
                          width={10}
                          height={7}
                        />
                      </div>
                    </div>
                  </Link>
                </>
              );
            })
          : null}
        <div>
          { isLoading && cycles.length > 0 ?
            <div ref={ref}>
            </div>: null
          }
        </div>
      </div>
      <div className="min-h-18">
        <RedirectCart/>
      </div>
      </div>
    </>
  );
}
