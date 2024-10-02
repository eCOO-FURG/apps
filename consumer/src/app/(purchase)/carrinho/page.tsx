"use client";

import SendTelegram from "@consumer/app/_components/sendTelegram";
import { useEffect, useState } from "react";
import { useCartProvider } from "../../../context/cart";
import CardProdutoCart from "./components/card-produto-cart";

export default function FinalizarCompras() {
  
  const { cart } = useCartProvider();
  const [totalPurchase, setTotalPurchase] = useState(0);

  useEffect(() => {
    let total = 0;

    cart.forEach((productCart) => {
      total = total + productCart.price * productCart.quantity;
    });

    setTotalPurchase(total);
  }, [cart]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto">
          {cart && cart.length !== 0
            ? cart.map((product, index) => {
                return (
                  <CardProdutoCart
                    product={product}
                    exclude={true}
                  ></CardProdutoCart>
                );
              })
            : null}
        </div>
        <div className="sticky bottom-0 h-12 bg-light-gray-white flex flex-col">
          <div className="bg-french-gray ml-5 mr-5 w border-[1px]"></div>
          <div className="pl-5 pr-5 w-full font-inter">
            <span className="w-1/2 text-left text-xs p-2 inline-block text-slate-gray">
              Total:
            </span>
            <span className="w-1/2 text-right text-xl font-semibold text-rain-forest font-inter p-2 inline-block">
              {totalPurchase.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
        <div className="min-h-18">
          <SendTelegram />
        </div>
      </div>
    </>
  );
}
