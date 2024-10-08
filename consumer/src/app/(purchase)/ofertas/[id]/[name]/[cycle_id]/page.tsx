"use client";
import {
  CatalogOffers,
  Offer,
  fetchCatologsById,
} from "@consumer/app/_actions/fetch-catalogs-by-id";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CardOferta from "../../../components/card-oferta";
import RedirectCart from "@consumer/app/_components/redirectCart";

export default function Ofertas() {
  const params = useParams();

  const [offers, setOffers] = useState([] as Offer[]);
  const [page, setPage] = useState(1 as number);
  const [nameFarm, setNameFarm] = useState("" as string);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const mapQuantity = {
    UNIT: 1,
    WEIGHT: 500
  };

  const searchOffers = async () => {
    setIsLoading(true);

    const responseFarmCatalogs: CatalogOffers | null = await fetchCatologsById(
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
    setOffers(newOffers);
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
    <>
      <div className="flex flex-col h-full ">
        <div className="pt-3.5 w-full overflow-y-auto flex flex-col items-center gap-3.5">
          {offers && offers.length !== 0 ? (
            offers.map((offer, index) => {
              return (
                <CardOferta
                  key={index}
                  offer={offer}
                  exclude={false}
                />
              );
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
        <div className="min-h-[70px]">
          <RedirectCart />
        </div>
      </div>
    </>
  );
}
