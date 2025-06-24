"use client";
import { fetchOffers } from "@consumer/app/_components/GET/fetch-offers";
import RedirectCart from "@consumer/app/_components/redirectCart";
import OrderCard from "@consumer/app/components/OrderCard";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { CatalogDTO, OfferDTO } from "@shared/interfaces/dtos";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Ofertas() {

	const searchParams = useSearchParams();
	const data = searchParams.get('data');
	const params = data ? JSON.parse(decodeURIComponent(data as string)) : null;

	const [offers, setOffers] = useState([] as OfferDTO[]);
	const [page, setPage] = useState(1 as number);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const { ref, inView } = useInView();
	const { handleError } = useHandleError();

	const LocalStorage = useLocalStorage();

	const cycle = useMemo(() => LocalStorage.getFromStorage("selected-cycle"),[]);

	const searchOffers = async () => {
		setIsLoading(true);

		try {			
			const response = await fetchOffers({
				page: page,
				cycle_id: cycle.id,
				available: true,
				category_id: params?.category_id
			});

			if (response.message) {
				handleError(response.message as string);
				return;
			} else if (response.data) {

				const dataOffers: OfferDTO[] = response.data ?? [];
				
				if (dataOffers.length == 0) {
					setHasMore(false);
					return;
				}

				const newOffers = [...offers, ...dataOffers];
				setOffers(newOffers as OfferDTO[]);
				const nextPage = page + 1;
				setPage(nextPage);
			}
		} catch (error) {
			handleError((error as string) ?? "Erro desconhecido.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (inView && (inView && !isLoading) && hasMore ) {
			searchOffers();
		}
	}, [inView, isLoading, hasMore]);

	return (
		<div className="flex flex-col h-full">
			<div className="px-3 w-full overflow-y-scroll flex flex-col items-center gap-3.5 h-full pt-3.5">
				{offers && offers.length !== 0 ? (
					offers.map((offer, index) => {
						return (
							<OrderCard
								key={index}
								offer={offer}
								farm={offer.catalog.farm}
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
			<div className="h-footer w-full">
				<RedirectCart />
			</div>
		</div>
	);
}