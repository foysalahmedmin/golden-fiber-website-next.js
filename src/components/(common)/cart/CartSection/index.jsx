"use client";

import { Button } from "@/components/ui/Button";
import useCart from "@/hooks/state/useCart";
import Link from "next/link";
import CartItem from "./CartItem";

const CartSection = () => {
  const { cartProducts, subtotal } = useCart();
  return (
    <section className="container py-12 md:py-16">
      <div className="rounded-md border">
        <div className="space-y-6 p-6 md:space-y-8 md:p-8">
          <div className="grid grid-cols-1 overflow-x-auto">
            <table className="text-[0.5rem] md:text-[.75rem] lg:text-[1rem]">
              <thead className="border-b">
                <tr>
                  <th className="w-16 whitespace-nowrap pb-[1em] text-center">
                    #
                  </th>
                  <th className="whitespace-nowrap px-[1em] pb-[1em] text-left text-[1em] uppercase">
                    Product
                  </th>
                  <th className="whitespace-nowrap px-[1em] pb-[1em] text-center text-[1em] uppercase">
                    Price
                  </th>
                  <th className="whitespace-nowrap px-[1em] pb-[1em] text-center text-[1em] uppercase">
                    Quantity
                  </th>
                  <th className="whitespace-nowrap px-[1em] pb-[1em] text-center text-[1em] uppercase">
                    Subtotal
                  </th>
                  <th className="w-16 whitespace-nowrap pb-[1em] text-center text-[1em] uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartProducts?.map((item, index) => (
                  <CartItem key={index} item={item} index={index} />
                ))}
              </tbody>
              <tfoot>
                <tr className="border-b">
                  <th
                    colSpan={4}
                    className="whitespace-nowrap px-[1em] py-[1em] text-left text-[1em] uppercase"
                  >
                    Subtotal:
                  </th>
                  <th className="whitespace-nowrap px-[1em] py-[1em] text-center text-[1em] uppercase">
                    {subtotal?.toFixed(2)} BDT
                  </th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex justify-end">
            <Button as={Link} href="/checkout" className="w-full sm:w-auto">
              Process to checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
