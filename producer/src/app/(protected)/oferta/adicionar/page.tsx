"use client";

import useCreateOffer from "@producer/hooks/catalogs/useCreateOffer";
import Button from "@shared/components/Button";
import { OfferDTO, ProductDTO } from "@shared/interfaces/dtos";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuChevronLeft, LuX } from "react-icons/lu";
import { toast } from "sonner";
import {
  InputAmount,
  InputPrice,
  InputDescription,
  InputComment,
  InputRecurrence,
  RenderProducts,
  ReviewOffer,
} from "../components";

export default function Home() {
  const router = useRouter();

  const { createOffer } = useCreateOffer();

  const [offer, setOffer] = useState<OfferDTO>({} as OfferDTO);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const minStep = 1;
  const maxStep = 7;

  const handleNextStep = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > minStep) {
      setCurrentStep(currentStep - 1);
    } else {
      cancelOffer();
    }
  };

  const cancelOffer = () => {
    setOffer({} as OfferDTO);
    setCurrentStep(0);
    router.push("/oferta");
  };

  const submitOffer = async () => {
    const formatDate = (date: Date | undefined): string | undefined => {
      if (!date) return undefined;
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const today = new Date();
    let expiresAt: Date | undefined = undefined;
    if (!offer.product.perishable) {
      expiresAt = new Date(today.setMonth(today.getMonth() + 6));
    }

    const offerPayload: any = {
      product_id: offer.product.id,
      amount:
      offer.product.pricing === "UNIT" ? offer.amount : offer.amount * 1000,
      price: offer.price,
      expires_at: formatDate(expiresAt),
    };

    if (offer.closes_at === true) {
      offerPayload.closes_at = null;
    }

    if (offer.description) {
      offerPayload.description = offer.description;
    }

    if (offer.comment) {
      offerPayload.comment = offer.comment;
    }

    const success = await createOffer(offerPayload);
    if (!success) return;
    toast.success("Oferta cadastrada com sucesso");
    router.push("/oferta");
  };

  return (
    <>
      <div className="h-footered-page w-full">
        <div className="flex flex-col items-end justify-center absolute px-6 pt-5 w-inherit">
          <Button
            title="Cancelar"
            className="flex items-center gap-2 text-sm font-medium text-theme-default w-7.5 h-7.5"
            onClick={cancelOffer}
          >
            <LuX className="w-7.5 h-7.5 text-theme-default" />
          </Button>
        </div>
        {currentStep === 1 && (
          <RenderProducts
            handleNextStep={handleNextStep}
            setProduct={(product: ProductDTO) =>
              setOffer({ ...offer, product: product })
            }
          />
        )}
        {currentStep === 2 && (
          <InputAmount
            handleNextStep={handleNextStep}
            pricing={offer.product.pricing ?? "UNIT"}
            amount={offer.amount ?? 0}
            setAmount={(amount) => 
              setOffer({ ...offer, amount: amount })}
          />
        )}
        {currentStep === 3 && (
          <InputPrice
            handleNextStep={handleNextStep}
            price={offer.price ?? 0}
            pricing={offer.product.pricing}
            setPrice={(price) => 
              setOffer({ ...offer, price: price })}
          />
        )}
        {currentStep === 4 && (
          <InputDescription
            handleNextStep={handleNextStep}
            description={offer.description ?? ""}
            setDescription={(description) =>
              setOffer({ ...offer, description: description })
            }
          />
        )}
        {currentStep === 5 && (
          <InputComment
            handleNextStep={handleNextStep}
            comment={offer.comment ?? ""}
            setComment={(comment) =>
              setOffer({ ...offer, comment: comment })
            }
          />
        )}
        {currentStep === 6 && (
          <InputRecurrence
            handleNextStep={handleNextStep}
            setRecurrence={(closes_at) =>
              setOffer({ ...offer, closes_at: closes_at })
            }
          />
        )}
        {currentStep === 7 && (
          <ReviewOffer
            productId={offer.product.id ?? ""}
            productName={offer.product.name ?? ""}
            amount={offer.amount ?? 0}
            price={offer.price ?? 0}
            description={offer.description ?? ""}
            comment={offer.comment ?? ""}
            pricing={offer.product.pricing ?? "UNIT"}
            expires_at={offer.product.perishable ? undefined : offer.expires_at}
            closes_at={offer.closes_at ?? false}
            submitAction={submitOffer}
          />
        )}
      </div>
      <div className="h-footer w-full">
        <div
          className="flex w-full items-center p-5 justify-between
             static bottom-0 h-footer bg-theme-background z-50"
        >
          <div className="flex items-center">
            <LuChevronLeft className="w-7.5 h-7.5 text-theme-default" />
            <Button
              className="flex items-center gap-2 text-sm font-medium text-theme-default w-auto"
              onClick={handlePreviousStep}
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
