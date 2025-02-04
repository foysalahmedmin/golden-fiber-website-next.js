"use client";

import { Heart, HeartOutline } from "@/assets/images/icons/Heart";
import AddToCardButton from "@/components/partials/Buttons/AddToCardButton";
import BayNowButton from "@/components/partials/Buttons/BayNowButton";
import { Button } from "@/components/ui/Button";
import {
  QuantityDecreaseTrigger,
  QuantityIncreaseTrigger,
  QuantityInput,
  QuantitySelector,
} from "@/components/ui/QuantitySelector";
import useCart from "@/hooks/state/useCart";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ProductPurchase = ({ className, product }) => {
  const { cart, getItemQuantityFromCart } = useCart();
  const { _id, availableStock } = product;
  const wishListed = false;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={cn("flex gap-4", className)}>
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        value={1}
        minValue={1}
        maxValue={Number(availableStock)}
      >
        <QuantityDecreaseTrigger />
        <QuantityInput />
        <QuantityIncreaseTrigger />
      </QuantitySelector>

      <BayNowButton className="flex-1 px-6" />
      <AddToCardButton
        id={_id}
        quantity={quantity}
        disabled={getItemQuantityFromCart(_id) === quantity}
        variant="outline"
        className="primary hover:bg-accent hover:text-accent-foreground disabled:opacity-5"
      />

      <Button
        className="border-border text-foreground"
        shape="icon"
        variant="outline"
      >
        {wishListed ? (
          <Heart className="size-[1.5rem]" />
        ) : (
          <HeartOutline className="size-[1.5rem]" />
        )}
      </Button>
    </div>
  );
};

export default ProductPurchase;
