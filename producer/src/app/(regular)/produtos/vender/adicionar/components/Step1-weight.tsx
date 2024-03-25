"use client";
import { useState } from "react";

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";

interface FormProps {
  goNextClick: () => void;
}

export default function Step1Weight({ goNextClick }: FormProps) {
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const savedOfferProductsDataString = localStorage.getItem(
    "offer-products-data"
  );
  const savedOfferProductsData = savedOfferProductsDataString
    ? JSON.parse(savedOfferProductsDataString)
    : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!weight) {
      setError("Você deve preencher os campos acima!");
      return;
    }

    const newOfferProductData = {
      ...(savedOfferProductsData || {}),
      weigth: weight,
      quantity: "",
    };

    localStorage.setItem(
      "offer-products-data",
      JSON.stringify(newOfferProductData)
    );

    goNextClick();
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[88%] flex flex-col items-center mt-12">
        <span className="text-center font-medium text-3xl text-slate-gray">
          Qual o peso?
        </span>
        <span className="text-center text-slate-gray text-sm mt-5 font-medium">
          Qual o peso do produto que <br />
          ostaria de colocar a venda no nosso <br /> centro de distribuição?
        </span>
        <div className="w-full h-full flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col mt-4 justify-between"
          >
            <div className="w-full flex gap-2 flex-col">
              <div className="w-full flex gap-3">
                <div className="w-full">
                  <Input
                    onChange={handleChange}
                    className="text-primary w-full text-sm"
                    type="number"
                    label="Gramas  (múltiplos de 50)"
                  />
                </div>
              </div>
              {error && (
                <span className="text-red-600 text-sm text-center">
                  {error}
                </span>
              )}
            </div>
            <div>
              <Button
                className="text-white border-0 p-2 bg-default"
                title="Continuar"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
