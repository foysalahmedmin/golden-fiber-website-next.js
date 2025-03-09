"use client";

import { colors } from "@/assets/data/colors";
import {
  MaxInput,
  MinInput,
  RangeSlider,
  RangeSliderInput,
} from "@/components/ui/RangeSlider";
import { useDebounce } from "@/hooks/utils/useDebounce";
import { cn } from "@/lib/utils";
import { convertColorFormat } from "@/utils/convertColorFormat";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PriceAndVariants = ({ className }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000);

  const minValueDebounced = useDebounce(minValue, 1000);
  const maxValueDebounced = useDebounce(maxValue, 1000);

  const searchParams = useSearchParams();
  const router = useRouter();
  const currentParams = new URLSearchParams(searchParams.toString());
  currentParams.set("price_min", minValueDebounced);
  currentParams.set("price_max", maxValueDebounced);

  useEffect(() => {
    if (minValueDebounced !== 0 || maxValueDebounced !== 10000) {
      router.replace(`?${currentParams.toString()}`, {
        scroll: false,
        replace: true,
      });
    }
  }, [minValueDebounced, maxValueDebounced]);

  return (
    <div className={cn("overflow-y-auto rounded-md border py-6", className)}>
      <div className="mb-4 px-4">
        <h5 className="short-underline pb-1 uppercase">Price & Variants</h5>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div className="px-4">
          <RangeSlider
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            className="mb-4 space-y-4"
          >
            <div className="flex items-center gap-2">
              <MinInput />
              -
              <MaxInput />
            </div>
            <div className="text-xs">
              <RangeSliderInput />
            </div>
          </RangeSlider>
        </div>
        <hr />
        <div className="px-4">
          <strong className="mb-4 block uppercase text-foreground">
            Colors:
          </strong>
          <ul className="grid w-full gap-2 md:grid-cols-2">
            {colors?.map((item, i) => (
              <li key={i}>
                <label
                  style={{
                    "--accent":
                      `${convertColorFormat(item?.hex, "hsl")}`.replace(
                        /hsl\((\d+),\s*(\d+%)\s*,\s*(\d+%)\)/,
                        "$1 $2 $3",
                      ),
                  }}
                  className="inline-flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox rounded-full border-2 border-accent bg-accent/25 text-2xl hover:bg-accent/75"
                    name={item?.value}
                    value={item?.value}
                  />
                  <span className="capitalize">{item?.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* <hr />
        <div className="px-4">
          <strong className="mb-4 block uppercase text-foreground">
            Sizes:
          </strong>
          <ul className="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
            {sizes?.map((item, i) => (
              <li key={i}>
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className={`checkbox border-accent text-base`}
                    name={item?.value}
                    value={item?.value}
                  />
                  <span className="uppercase">{item?.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default PriceAndVariants;
