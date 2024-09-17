"use client";
import { useState } from "react";

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import { LuChevronLeft } from "react-icons/lu";
import { toast } from "sonner";

interface InputPriceProps {
    handleNextStep: () => void;
    price: number;
    setPrice: (price: number) => void;
}

export function formatPrice(price: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price / 100);
}

export default function InputPrice({ handleNextStep, price, setPrice }: InputPriceProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value.replace(/[^0-9]/g, ""));

        if (!isNaN(value)) {
            const formattedValue = formatPrice(value);

            setPrice(value / 100);
        } else {
            setPrice(0);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!price) {
            toast.error("Você deve preencher o campo acima!");
            return;
        }

        handleNextStep();
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="h-full flex flex-col items-stretch justify-between pt-14"
        >
            <Input
                onChange={handleChange}
                className="text-theme-primary text-sm"
                type="text"
                value={formatPrice(price * 100)}
                label="Preço"
            />
            <Button className="px-2 py-3 bg-theme-default rounded-lg text-white
            font-semibold border-0">
                Continuar
            </Button>
        </form>
    );
}
