"use client";

import { Heart, HeartOutline } from "@/assets/images/icons/Heart";
import AddToCardButton from "@/components/partials/Buttons/AddToCardButton";
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

const ProductPurchase = ({ className, product, stock }) => {
  const { getCartItemQuantity } = useCart();
  const { _id: productId } = product;
  const { _id: stockId, quantity: availableQuantity } = stock || {};
  const wishListed = false;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={cn("flex gap-4", className)}>
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        value={1}
        minValue={1}
        maxValue={Number(availableQuantity) || 1}
      >
        <QuantityDecreaseTrigger />
        <QuantityInput />
        <QuantityIncreaseTrigger />
      </QuantitySelector>

      {/* <BayNowButton className="flex-1 px-6" /> */}
      <AddToCardButton
        productId={productId}
        stockId={stockId}
        quantity={quantity}
        disabled={getCartItemQuantity({ id: stockId }) === quantity}
        variant="outline"
        className="primary flex-1 hover:bg-accent hover:text-accent-foreground disabled:opacity-5"
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
