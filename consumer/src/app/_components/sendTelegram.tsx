"use client";

import { useEffect, useState } from "react";
import { useCartProvider } from "../../context/cart";
import Script from "next/script";

export default function sendTelegram() {
  const { cart } = useCartProvider();
  const [ totalPurchase, setTotalPurchase ] = useState(0);

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.onEvent("mainButtonClicked", sendData);
    return () => {
      tg.offEvent("mainButtonClicked", sendData);
    };
  });

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;

    tg.MainButton.setParams({
      text: "Concluir",
      color: "#545F71",
    });
  });

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.MainButton.show();
  }, [cart]);


  useEffect(() => {

    let total = 0;

    cart.forEach((productCart) => {
      if(productCart.pricing == 'UNIT'){
        total = total + (productCart.price * productCart.quantity);
      }else{
        total = total + (productCart.price * productCart.quantity);
      }
    });

    setTotalPurchase(total);
    
  }, [cart]);

  const sendData = async () => {
    const tg = (window as any).Telegram.WebApp;

    const purchase = {
      cart: cart,
      total: totalPurchase
    }

    await tg.sendData(JSON.stringify(purchase));
  };

  return (
    <>
    </>
  );
}
