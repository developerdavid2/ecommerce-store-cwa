import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const getTotalItems = useCart((state) => state.getTotalItems);
  const getTotalPrice = useCart((state) => state.getTotalPrice);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const subtotal = totalPrice;
  const shipping = totalPrice > 100 ? 0 : 10; // Free shipping over $100
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    try {
      console.log(
        "Making checkout request to:",
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      );

      // Create array with product IDs and quantities for checkout
      const checkoutItems = items.flatMap((item) =>
        Array(item.quantity).fill(item.id),
      );

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: checkoutItems,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.url) {
        window.location = response.data.url;
      } else {
        toast.error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      {/* Items Summary */}
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.name} × {item.quantity}
              </span>
              <Currency value={Number(item.price) * item.quantity} />
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <>
            <hr className="border-gray-200" />

            {/* Pricing Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                </div>
                <Currency value={subtotal} />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Shipping</div>
                <div className="text-sm">
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <Currency value={shipping} />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Tax</div>
                <Currency value={tax} />
              </div>
            </div>

            <hr className="border-gray-200" />
          </>
        )}

        {/* Total */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-base font-medium text-gray-900">Total</div>
          <Currency value={items.length > 0 ? finalTotal : 0} />
        </div>

        {/* Free Shipping Notice */}
        {totalPrice > 0 && totalPrice < 100 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Add <Currency value={100 - totalPrice} /> more for free shipping!
            </p>
          </div>
        )}
      </div>

      <Button
        disabled={items.length === 0}
        className="w-full mt-6"
        onClick={onCheckout}
      >
        {items.length === 0
          ? "Cart is Empty"
          : `Checkout (${totalItems} ${totalItems === 1 ? "item" : "items"})`}
      </Button>
    </div>
  );
};

export default Summary;
