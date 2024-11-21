"use client";
import { fetchCatologsById } from "@consumer/app/_actions/fetch-catalogs-by-id";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import OrderCard from "@consumer/app/components/OrderCard";
import RedirectCart from "@consumer/app/_components/redirectCart";
import { IOfferWithProduct } from "@shared/interfaces/offer";
import { ICatalogMerge } from "@shared/interfaces/catalog";
import React from "react";

export default function Ofertas() {

  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const params = data ? JSON.parse(decodeURIComponent(data as string)) : null;


  const [offers, setOffers] = useState([] as IOfferWithProduct[]);
  const [page, setPage] = useState(1 as number);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const mapQuantity = {
    UNIT: 1,
    WEIGHT: 500,
  };

  const searchOffers = async () => {
    setIsLoading(true);

    const responseFarmCatalogs: ICatalogMerge | null =
      await fetchCatologsById(
      params.id as string,
      params.cycle_id as string,
      page
    );

    let offersFarm = responseFarmCatalogs?.offers ?? [];
    offersFarm = offersFarm.filter(
      (offer) => offer.amount >= mapQuantity[offer.product.pricing]
    );

    if (offersFarm.length == 0) {
      setHasMore(false);
      return;
    }

    const newOffers = [...offers, ...offersFarm];
    setOffers(newOffers as IOfferWithProduct[]);
    const nextPage = page + 1;
    setPage(nextPage);

    setIsLoading(false);
  };

  useEffect(() => {
    if (inView || (inView && !isLoading)) {
      searchOffers();
    }
  }, [inView, isLoading]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 w-full overflow-y-scroll flex flex-col items-center gap-3.5 h-full pt-3.5">
        {offers && offers.length !== 0 ? (
          offers.map((offer, index) => {
            return <OrderCard key={index} offer={offer} exclude={false} />;
          })
        ) : (
          <div className="w-full text-center p-2">
            <p>Não há produtos em estoque</p>
          </div>
        )}
        <div className="w-full text-center p-2">
          {hasMore && <div ref={ref}>Carregando...</div>}
        </div>
      </div>
      <div className="h-footer w-full">
        <RedirectCart />
      </div>
    </div>
  );
}
