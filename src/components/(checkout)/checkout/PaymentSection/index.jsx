"use client";

import { Button } from "@/components/ui/Button";
import useCart from "@/hooks/state/useCart";
import { cn } from "@/lib/utils";
import { addGuestOrder } from "@/network/orders/api";
import { clearCart } from "@/redux/slices/cartSlice";
import { SetCartPaymentMethod, SetResetCart } from "@/redux/slices/orderSlice";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SHIPPING_LIST = [
  {
    id: 1,
    label: "Dhaka",
    value: "dhaka",
    charge: 60,
  },
  {
    id: 2,
    label: "Out Of Dhaka",
    value: "out-of-dhaka",
    charge: 100,
  },
];

const PaymentSection = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [shipping, setShipping] = useState({
    id: 1,
    label: "Dhaka",
    value: "dhaka",
    charge: 60,
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    cartProducts,
    subtotal,
    getItemQuantityFromCart,
    getItemSubtotalFromCart,
  } = useCart();
  const { email, name, address, postal, phone, payment_method, city } =
    useSelector((state) => state.order);

  const handleGuestOrder = async () => {
    console.log("handleGuestOrder");
    try {
      setIsLoading(true);
      if (!isAgree) {
        toast.error("Please agree with our terms and conditions");
        return;
      }
      if (
        !name ||
        !email ||
        !address ||
        // !postal ||
        !phone ||
        !payment_method ||
        cartProducts?.length === 0
      ) {
        toast.error("Please fill all the required fields");
        return;
      }

      const response = await addGuestOrder({
        name,
        city,
        phone,
        address,
        email,
        sales_type: payment_method,
        payment_method,
        gross_total: subtotal,
        total: subtotal + (shipping?.charge || 0),
        shipping_charge: shipping?.charge || 0,
        orders: cartProducts?.map((item) => {
          return {
            product: item?._id,
            unit_price: Number(item?.stocks?.selling_price || 0),
            quantity: getItemQuantityFromCart({ id: item?._id }),
          };
        }),
      });
      toast.success("Order Complete");

      if (payment_method === "offline") {
        console.log("hello");
        dispatch(SetResetCart());
        dispatch(clearCart());
        router.replace("/shop");
      } else {
        dispatch(SetResetCart());
        dispatch(clearCart());
        // window.location.replace(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className={cn("space-y-8", className)}>
      <div className="rounded-md bg-card p-4">
        <div className="space-y-6">
          <strong className="block font-medium uppercase">
            3. SELECT PAYMENT METHOD
          </strong>
          <form className="space-y-4">
            <label className="group relative flex cursor-pointer items-center justify-between rounded-md border px-4 py-4 has-[:checked]:border-current">
              <div className="inline-flex items-center gap-2">
                <input
                  className="radio shrink-0 text-xl leading-none"
                  type="radio"
                  value="offline"
                  name="payment-method"
                  checked={payment_method === "offline"}
                  onChange={() => dispatch(SetCartPaymentMethod("offline"))}
                />
                <span className="font-medium leading-none group-has-[:checked]:text-title">
                  Cash on delivery
                </span>
              </div>
              {/* <img
                className="h-8 object-contain object-right"
                src="/images/payment-methods/bkash.png"
                alt="bkash-logo"
              /> */}
              <span className="absolute left-4 top-0 inline-block -translate-y-1/2 bg-card px-2 font-medium">
                Express checkout
              </span>
            </label>
            {/* <label className="group relative flex cursor-pointer items-center justify-between rounded-md border px-4 py-3 has-[:checked]:border-current">
              <div className="inline-flex items-center gap-2">
                <input
                  className="radio shrink-0 text-xl leading-none"
                  type="radio"
                  value="online"
                  name="payment-method"
                  checked={payment_method === "online"}
                  onChange={() => dispatch(SetCartPaymentMethod("online"))}
                />
                <span className="font-medium leading-none group-has-[:checked]:text-title">
                  Credit/Debit Cards
                </span>
              </div>
              <img
                className="h-6 object-contain object-right"
                src="/images/payment-methods/ssl.png"
                alt="ssl-commerce-logo"
              />
            </label> */}
          </form>
        </div>
      </div>
      <div className="rounded-md bg-card p-4">
        <div className="space-y-6">
          <strong className="block font-medium uppercase">
            4. SELECT PAYMENT METHOD
          </strong>
          <form className="space-y-4">
            <>
              {SHIPPING_LIST?.map((item, index) => (
                <label
                  key={index}
                  className="group relative flex cursor-pointer items-center justify-between rounded-md border px-4 py-4 has-[:checked]:border-current"
                >
                  <div className="inline-flex items-center gap-2">
                    <input
                      className="radio shrink-0 text-xl leading-none"
                      type="radio"
                      value={item.value}
                      name="shipping"
                      checked={shipping?.value === item.value}
                      onChange={() => setShipping(item)}
                    />
                    <span className="font-medium leading-none group-has-[:checked]:text-title">
                      {item?.label}
                    </span>
                  </div>
                  <span className="absolute left-4 top-0 inline-block -translate-y-1/2 bg-card px-2 font-medium">
                    {item?.charge} BDT
                  </span>
                </label>
              ))}
            </>
          </form>
        </div>
      </div>
      <div className="rounded-md bg-card pt-4">
        <div className="space-y-6">
          <strong className="block px-4 font-medium uppercase">
            ORDER SUMMARY
          </strong>
          <div className="space-y-4 px-4">
            {cartProducts?.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-1">
                  <span className="block text-title/85">
                    {getItemQuantityFromCart({ id: item?._id })} × {item?.name}
                  </span>
                  <div className="flex items-center gap-2 text-sm">
                    <div>
                      <span className="text-sm">{item?.short_description}</span>
                    </div>
                  </div>
                </div>
                <div className="min-w-20 text-right">
                  <span className="inline-block font-medium uppercase text-title">
                    {getItemSubtotalFromCart({
                      id: item?._id,
                      price: item?.stocks?.selling_price,
                    })?.toFixed(2)}
                    BDT
                  </span>
                </div>
              </div>
            ))}
            <hr />
            <div className="flex items-center">
              <div className="flex-1">
                <span className="block font-semibold uppercase text-title/85">
                  SUBTOTAL
                </span>
              </div>
              <div className="min-w-20 text-right">
                <span className="inline-block font-medium uppercase text-title">
                  {subtotal?.toFixed(2)} BDT
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <span className="block text-title/85">Shipping</span>
                <div className="flex items-center gap-2 text-sm">
                  <span>Regular ({shipping?.days || 0} days delivery)</span>
                </div>
              </div>
              <div className="min-w-20 text-right">
                <span className="inline-block font-medium uppercase text-title">
                  {shipping?.charge || 0}BDT
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-b-md bg-muted-foreground/35 px-4 py-4">
            <div className="flex items-center">
              <div className="flex-1">
                <span className="block font-semibold uppercase text-title/85">
                  ORDER TOTAL
                </span>
              </div>
              <div className="min-w-20 text-right">
                <span className="inline-block text-lg font-semibold uppercase text-title">
                  {(subtotal + (shipping?.charge || 0))?.toFixed(2)} BDT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            className="checkbox border border-current text-xl"
            type="checkbox"
            checked={isAgree}
            onChange={() => setIsAgree(!isAgree)}
          />
          <span className="inline-block text-xs font-medium capitalize leading-none">
            I have read and agree to the website{" "}
            <Link
              href="terms-conditions"
              className="font-medium text-title/85 underline"
            >
              terms and conditions *
            </Link>
          </span>
        </label>
      </div>
      <div>
        <Button
          disabled={isLoading || !isAgree}
          onClick={handleGuestOrder}
          className="primary w-full text-sm uppercase"
        >
          <span>COMPLETE ORDER</span>
          <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </section>
  );
};

export default PaymentSection;
