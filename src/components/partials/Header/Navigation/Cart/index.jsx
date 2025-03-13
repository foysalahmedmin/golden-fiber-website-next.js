"use client";

import CartBar from "@/components/partials/CartBar";
// import { ActiveLink } from "@/components/ui/ActiveLink";
import { Button } from "@/components/ui/Button";
import useCart from "@/hooks/state/useCart";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

const Cart = ({ access, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartProducts } = useCart();

  return (
    <div className="relative flex flex-col">
      <Button
        onClick={() => setIsOpen(true)}
        href={"/cart"}
        className="hover:text-primary"
        variant="none"
        shape="none"
        size="none"
      >
        <ShoppingBag />
      </Button>
      {cartProducts?.length > 0 && (
        <span className="absolute right-1 top-1 inline-flex aspect-square min-h-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-accent text-[0.5rem] font-bold leading-none text-accent-foreground">
          {cartProducts?.length || 0}
        </span>
      )}

      <CartBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Cart;
