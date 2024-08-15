// "use client";

import Image, { ImageLoader } from "next/image";
import { useEffect, useState } from "react";
import { ProductCart, useCartProvider } from "../../../../context/cart";

export default function CardProdutoCart({
  product,
  // nameFarm,
  exclude,
}: {
  product: ProductCart;
  // nameFarm: string;
  exclude: boolean;
}) {

  const mapQuantity = {
    "UNIT": 1,
    "WEIGHT": 100
  };
  
  const mapTextQuantity = {
    "UNIT": `${mapQuantity["UNIT"]} Unidade`,
    "WEIGHT": `${mapQuantity["WEIGHT"]}g`
  };

  const [count, setCount] = useState(0);
  const { cart, setCart } = useCartProvider();

  useEffect(() => {
    let indexProductCart = cart.findIndex((productCart) => {
      return productCart.id == product.id && productCart.offerId == product.offerId;
    });
    if (indexProductCart !== -1) {
      setCount(cart[indexProductCart].quantity);
    }
  }, [cart, product.id]);

  const handleAdd = () => {
    let indexProductCart = cart.findIndex(
      (productCart) =>
        productCart.id == product.id && productCart.offerId == product.offerId
    );
    let newCart = [...cart];

    if (indexProductCart === -1) {
      
      newCart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        pricing: product.pricing,
        amount: product.amount,
        description: product.description,
        quantity: count + 1,
        offerId: product.offerId,
        // nameFarm: nameFarm
      });
      setCount(count + 1);
      setCart(newCart);

      return;
    }

    newCart[indexProductCart].quantity = count + 1;
    setCount(count + 1);
    setCart(newCart);

  };
  const handleRemove = () => {
    let indexProductCart = cart.findIndex(
      (productCart) =>
        productCart.id == product.id && productCart.offerId == product.offerId
    );

    let newCart = [...cart];

    newCart[indexProductCart].quantity = count - 1;
    setCount(count - 1);
    setCart(newCart);

    if (newCart[indexProductCart].quantity == 0) {
      newCart.splice(indexProductCart, 1);
      setCart(newCart);
    }
  };

  const deleteProductCart = () => {

    const indexProductCart = cart.findIndex(
      (productCart) => productCart.id == product.id && productCart.offerId == product.offerId
    );

    const newCart = [...cart];

    if (indexProductCart !== -1) {
      newCart.splice(indexProductCart, 1);
      setCart(newCart);
    }
  };

  const imageLoader: ImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/dwm7zdljf/image/upload/v1706539060/products/256x256_${src}`;
  };

  return (
    <div className="min-w-[350px] h-[100px] bg-[rgb(246,246,246)] flex rounded-2xl m-[10px]">
      <div className="flex-none w-20 h-20 m-2 bg-[#00735E] rounded-[11px]">
        <Image
          className="rounded-[10px]"
          loader={imageLoader}
          src={product.image}
          width={80}
          height={80}
          alt={`${product.name.toLocaleLowerCase()}.jpg`}
        />
      </div>
      <div className="grow flex flex-col h-20 mt-2 mb-2">
        <p className="w-full text-left font-poppins text-sm">{product.name}</p>
        <p className="w-full text-left font-poppins text-xs">
          Quantidade: {mapTextQuantity[product.pricing]}
        </p>
        {/* <p className="w-full text-left font-poppins text-xs">
          Produtor: {nameFarm}
        </p> */}
        <p className="w-full text-left font-poppins text-[16px] pt-3">
          {product.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
        </p>
      </div>
      <div className="flex-none flex flex-col-reverse mw-[90px] h-20 m-2">
        <div className="flex-none bg-white rounded-md flex flex-row w-24 h-9">
          <div className="flex-none">
            <button
              type="button"
              className={ count != 0 ? "text-[#2F4A4D] text-2xl p-1": "text-[#2F4A4D] text-2xl p-1 opacity-25"}
              onClick={handleRemove}
              disabled={count == 0}
            >
              -
            </button>
          </div>
          <div className="grow">
            <p className="font-poppins text-base text-center text-[#2F4A4D] p-1">
              {count}
            </p>
          </div>
          <div className="flex-none">
            <button
              type="button"
              className={ count != Math.floor(product.amount / mapQuantity[product.pricing]) ? "text-[#2F4A4D] text-2xl p-1": "text-[#2F4A4D] text-2xl p-1 opacity-25"}
              onClick={handleAdd}
              disabled={count == Math.floor(product.amount / mapQuantity[product.pricing])}
            >
              +
            </button>
          </div>
        </div>
        {}
        <div className="grow">
          {exclude ? (
            <>
              <div className="flex flex-row-reverse">
                <div className="w-5 h-5">
                  <Image
                    src="/trash.png"
                    onClick={deleteProductCart}
                    alt="trash"
                    width={15}
                    height={15}
                  ></Image>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
