"use client";

import { Button } from "@/components/ui/Button";
import useCart from "@/hooks/state/useCart";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const AddToCardButton = forwardRef(({ id, quantity, className, children = <span>
      Add to Card
    </span>, ...props }, ref) => {
  const { addItemToCart } = useCart();
  return (
    <Button
      onClick={() => addItemToCart({ id: id, quantity: quantity })}
      className={cn("", className)}
      {...props}
      ref={ref}
    >
      {children}
    </Button>
  );
});

AddToCardButton.displayName = "AddToCardButton";

export default AddToCardButton;
