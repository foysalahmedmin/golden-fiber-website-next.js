"use client";

import { FormControl } from "@/components/ui/FormControl";
import { cn } from "@/lib/utils";
import {
  SetCartAddress,
  SetCartCity,
  SetCartEmail,
  SetCartName,
  SetCartPhone,
} from "@/redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const DeliveryFormSection = ({ className }) => {
  const dispatch = useDispatch();
  const { email, name, city, address, phone, as_profile } = useSelector(
    (state) => state.order,
  );
  return (
    <section className={cn("space-y-8", className)}>
      <div className="rounded-md bg-card p-4">
        <div className="space-y-6">
          <strong className="block font-medium uppercase">
            2. DELIVERY ADDRESS
          </strong>
          <form className="space-y-4 text-sm">
            <div>
              <label>
                <span className="mb-1 inline-block text-sm font-medium capitalize text-title">
                  Email*
                </span>
                <FormControl
                  value={email}
                  disabled={as_profile}
                  onChange={(e) => dispatch(SetCartEmail(e.target.value))}
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span className="mb-1 inline-block text-sm font-medium capitalize text-title">
                  Name*
                </span>
                <FormControl
                  value={name}
                  disabled={as_profile}
                  onChange={(e) => dispatch(SetCartName(e.target.value))}
                  type="text"
                  placeholder="Enter Your First Name"
                  name="first-name"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span className="mb-1 inline-block text-sm font-medium capitalize text-title">
                  City/Town*
                </span>
                <div className="input block h-auto w-full text-xs">
                  <FormControl
                    value={city}
                    disabled={as_profile}
                    onChange={(e) => dispatch(SetCartCity(e.target.value))}
                    type="text"
                    placeholder="Enter Your City/Town"
                    name="city"
                    required
                  />
                </div>
              </label>
            </div>
            <div>
              <label>
                <span className="mb-1 inline-block text-sm font-medium capitalize text-title">
                  Delivery address*
                </span>
                <FormControl
                  value={address}
                  disabled={as_profile}
                  onChange={(e) => dispatch(SetCartAddress(e.target.value))}
                  type="text"
                  placeholder="Apartment, suit, unit"
                  name="delivery-address-optional"
                />
              </label>
            </div>
            <div>
              <label>
                <span className="mb-1 inline-block text-sm font-medium capitalize text-title">
                  Phone*
                </span>
                <FormControl as="div">
                  <img
                    className="size-6 rounded object-contain object-center"
                    src="/images/flags/bd.svg"
                    alt="flag"
                  />
                  <input
                    value={phone}
                    disabled={as_profile}
                    onChange={(e) => dispatch(SetCartPhone(e.target.value))}
                    type="tel"
                    className="h-full w-full flex-1 border-none outline-none"
                    placeholder="Enter Your Phone Number"
                    name="Phone"
                    required
                  />
                </FormControl>
              </label>
            </div>
            {/* <div>
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  value={as_profile}
                  checked={as_profile}
                  onChange={() => dispatch(ToggleAsProfile())}
                  className="checkbox text-xl"
                  type="checkbox"
                />
                <span className="inline-block font-medium capitalize leading-none text-title">
                  Use as profile address
                </span>
              </label>
            </div> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default DeliveryFormSection;
