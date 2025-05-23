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

const ProductCartCard = ({ className, item }) => {
  const {
    addCartItem,
    removeCartItem,
    getCartItemQuantity,
    getCartItemSubtotal,
  } = useCart();
  const { name, media, stock } = item || {};
  const { thumbnail, gallery } = media || {};
  const {
    _id: stockId,
    quantity: availableQuantity,
    selling_price,
    color,
  } = stock || {};

  const image = urls?.product_thumbnail + "/" + thumbnail;

  const handleRemove = () => {
    removeCartItem({ id: stockId });
  };

  const handleSetQuantity = (quantity) => {
    addCartItem({ id: stockId, quantity });
  };

  return (
    <div
      className={cn(
        "flex justify-between border-b py-[1em] text-xs last:border-b-0",
        className,
      )}
    >
      <div className="self-stretch whitespace-nowrap px-[1em] text-left text-[1em]">
        <div className="inline-flex items-center gap-[0.5em]">
          <div className="size-[7em] rounded bg-muted/15 p-[0.25em] shadow-inner dark:bg-background">
            <Image
              className="size-full object-contain object-center"
              src={image}
              alt={name}
              width={100}
              height={100}
            />
          </div>
          <div className="flex-1">
            <h5 className="text-[1.15em] leading-[1.5em]">{name}</h5>
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
            <div>
              <div className="flex items-center gap-[0.25em] text-muted-foreground">
                <strong className="text-[0.875em] text-foreground">
                  Price:
                </strong>
                <span className="text-[0.875em]">{selling_price} BDT</span>
              </div>
              <div className="text-[0.75em]">
                <QuantitySelector
                  quantity={getCartItemQuantity({ id: stockId }) || 0}
                  setQuantity={handleSetQuantity}
                  maxValue={availableQuantity}
                  minValue={0}
                  className="inline-flex"
                >
                  <QuantityDecreaseTrigger />
                  <QuantityInput className="w-[3em]" />
                  <QuantityIncreaseTrigger />
                </QuantitySelector>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch whitespace-nowrap py-[1em] text-center text-[1em]">
        <div className="flex h-full flex-col items-end justify-between">
          <div>
            <Button
              onClick={() => handleRemove()}
              className="h-[2em] shrink-0 rounded-full text-[0.75em] [--accent:var(--destructive)]"
              variant="outline"
              shape="icon"
              size="sm"
            >
              <X />
            </Button>
          </div>
          <div>
            <span className="block font-bold">
              {getCartItemSubtotal({
                id: stockId,
                price: selling_price,
              })?.toFixed(2)}{" "}
              BDT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCartCard;
