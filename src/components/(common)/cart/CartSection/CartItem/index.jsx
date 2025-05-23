"use client";

import { Button } from "@/components/ui/Button";
import {
  QuantityDecreaseTrigger,
  QuantityIncreaseTrigger,
  QuantityInput,
  QuantitySelector,
} from "@/components/ui/QuantitySelector";
import useCart from "@/hooks/state/useCart";
import { urls } from "@/lib/base";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

const CartItem = ({ className, item, index }) => {
  const {
    addCartItem,
    removeCartItem,
    getCartItemQuantity,
    getCartItemSubtotal,
  } = useCart();
  const { _id, name, short_description, stocks, thumbnail } = item;

  const {
    _id: stockId,
    quantity: availableQuantity,
    selling_price,
    color,
  } = stocks || {};

  const image = urls?.product_thumbnail + "/" + thumbnail;

  const handleRemove = () => {
    removeCartItem({ id: stockId });
  };

  const handleSetQuantity = (quantity) => {
    addCartItem({ id: stockId, quantity });
  };
  return (
    <tr className={cn("border-b", className)}>
      <td className="w-[4em] whitespace-nowrap py-[0.5em] text-center text-[1em]">
        {index + 1}
      </td>
      <td className="whitespace-nowrap px-[1em] py-[0.5em] text-left text-[1em]">
        <div className="inline-flex items-center gap-[0.5em]">
          <div className="size-[4em] rounded bg-muted/15 p-[0.25em] shadow-inner dark:bg-background">
            <Image
              className="size-full object-contain object-center"
              src={image}
              alt={name}
              width={100}
              height={100}
            />
          </div>
          <div className="flex-1">
            <h5 className="text-[1.15em] leading-tight">{name}</h5>
            <small className="text-[0.875em]">{short_description}</small>
            <div className="leading-[1.25em]">
              <div className="flex items-center gap-[0.25em] text-muted-foreground">
                <strong className="text-[0.875em] text-foreground">
                  Color:
                </strong>
                <span
                  style={{ backgroundColor: color?.code }}
                  className="size-[1em] rounded-full"
                />
                <span className="text-[0.875em]">{color?.name}</span>
              </div>
              {/* <div className="flex items-center gap-[0.25em] text-muted-foreground">
                <strong className="text-[0.875em] text-foreground">
                  Size:
                </strong>
                <span className="text-[0.875em]">XXL</span>
              </div> */}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-[1em] py-[0.5em] text-center text-[1em]">
        {selling_price} BDT
      </td>
      <td className="whitespace-nowrap px-[1em] py-[0.5em] text-center text-[1em]">
        <QuantitySelector
          quantity={getCartItemQuantity({ id: stockId }) || 0}
          setQuantity={handleSetQuantity}
          maxValue={availableQuantity}
          minValue={0}
          className="inline-flex"
        >
          <QuantityDecreaseTrigger />
          <QuantityInput />
          <QuantityIncreaseTrigger />
        </QuantitySelector>
      </td>
      <td className="whitespace-nowrap py-[0.5em] text-center text-[1em] font-semibold">
        {getCartItemSubtotal({
          id: stockId,
          price: selling_price,
        })?.toFixed(2)}{" "}
        BDT
      </td>
      <td className="whitespace-nowrap py-[0.5em] text-center text-[1em]">
        <Button
          onClick={handleRemove}
          className="text-[0.75em] [--accent:var(--destructive)]"
          variant="outline"
          shape="icon"
        >
          <X />
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
