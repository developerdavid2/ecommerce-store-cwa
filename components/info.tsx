"use client";
import React, { MouseEventHandler, useState } from "react";
import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import QuantitySelector from "@/components/ui/quantity-selector";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold ">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl ">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        {/*  Size*/}
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Size:</h3>
          <div>{data?.size.name}</div>
        </div>
        {/*  Color*/}
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Colour:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.colour?.value }}
          />
        </div>
      </div>

      {/*  Quantity Selector*/}
      <div className="mt-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold">Quantity:</h3>
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
          />
        </div>
      </div>

      {/*  Shopping Cart*/}
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2 rounded-full cursor-pointer"
          onClick={onAddToCart}
        >
          Add {quantity > 1 && `${quantity} `}To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
