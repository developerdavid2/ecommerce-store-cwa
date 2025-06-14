"use client";
import Image from "next/image";
import { X } from "lucide-react";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/ui/quantity-selector";

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  images: { url: string }[];
  size: { name: string };
  colour: { name: string; value: string };
}

interface CartItemProps {
  data: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onIncreaseQuantity = () => {
    cart.incrementQuantity(data.id);
  };

  const onDecreaseQuantity = () => {
    cart.decrementQuantity(data.id);
  };

  const itemTotal = Number(data.price) * data.quantity;

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt={data.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <Button
            onClick={onRemove}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600"
          >
            <X size={15} />
          </Button>
        </div>

        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-black">{data.name}</p>
            </div>

            <div className="mt-1 flex text-sm space-x-4">
              <div className="text-gray-500">Size: {data.size?.name}</div>
              <div className="flex items-center gap-1 text-gray-500">
                Color: {data.colour?.name}
                <div
                  className="h-4 w-4 rounded-full border border-gray-300 ml-1"
                  style={{ backgroundColor: data.colour?.value }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <div className="text-sm text-gray-500">Quantity:</div>
              <QuantitySelector
                quantity={data.quantity}
                onIncrease={onIncreaseQuantity}
                onDecrease={onDecreaseQuantity}
              />
            </div>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="space-y-2">
              <div className="flex justify-between sm:justify-end">
                <span className="text-sm text-gray-500 sm:hidden">
                  Unit Price:
                </span>
                <Currency value={data.price} />
              </div>

              {data.quantity > 1 && (
                <div className="flex justify-between sm:justify-end">
                  <span className="text-sm text-gray-500 sm:hidden">
                    Total:
                  </span>
                  <div className="font-semibold">
                    <Currency value={itemTotal} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
