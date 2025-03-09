"use client";

import { Button } from "@/components/ui/Button";
import useCart from "@/hooks/state/useCart";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const AddToCardButton = forwardRef(
  (
    {
      productId,
      stockId,
      availableQuantity,
      quantity,
      className,
      children = <span>Add to Card</span>,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { addItemToCart } = useCart();
    const handleAddToCart = (e) => {
      e.stopPropagation();
      addItemToCart({ id: stockId, quantity: quantity });
    };

    return (
      <Button
        disabled={!availableQuantity || availableQuantity < 1 || disabled}
        onClick={(e) => handleAddToCart(e)}
        className={cn("", className)}
        {...props}
        ref={ref}
      >
        {children}
      </Button>
    );
  },
);

AddToCardButton.displayName = "AddToCardButton";

export default AddToCardButton;
