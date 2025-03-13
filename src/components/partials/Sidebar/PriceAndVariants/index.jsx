"use client";

import {
  MaxInput,
  MinInput,
  RangeSlider,
  RangeSliderInput,
} from "@/components/ui/RangeSlider";
import { useDebounce } from "@/hooks/utils/useDebounce";
import { cn } from "@/lib/utils";
import { getFilterColors } from "@/network/inventories/api";
import { convertColorFormat } from "@/utils/convertColorFormat";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PriceAndVariants = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingParams = new URLSearchParams(searchParams.toString());
  const updatedParams = new URLSearchParams(searchParams.toString());

  const [colors, setColors] = useState([]);

  const selectedColors = existingParams.get("colors")
    ? decodeURIComponent(existingParams.get("colors") || "")
        .split(",")
        .filter(Boolean)
    : [];

  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  const minValueDebounced = useDebounce(minValue, 500);
  const maxValueDebounced = useDebounce(maxValue, 500);

  useEffect(() => {
    const fetchColors = async () => {
      const data = await getFilterColors();
      setColors(data || []);
    };
    fetchColors();
  }, []);

  const handleColorSelection = (color) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((selected) => selected !== color)
      : [...selectedColors, color];

    updatedColors?.length > 0
      ? updatedParams.set("colors", encodeURIComponent(updatedColors.join(",")))
      : updatedParams.delete("colors");

    router.replace(`?${updatedParams.toString()}`, {
      scroll: false,
      replace: true,
    });
  };

  useEffect(() => {
    if (minValueDebounced || maxValueDebounced) {
      minValueDebounced && updatedParams.set("price_min", minValueDebounced);
      maxValueDebounced && updatedParams.set("price_max", maxValueDebounced);

      router.replace(`?${updatedParams.toString()}`, {
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
            {Array.isArray(colors) &&
              colors?.map((color, i) => (
                <li key={i}>
                  <label
                    style={{
                      "--accent":
                        `${convertColorFormat(color?.code, "hsl")}`.replace(
                          /hsl\((\d+),\s*(\d+%)\s*,\s*(\d+%)\)/,
                          "$1 $2 $3",
                        ),
                    }}
                    className="inline-flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      className="checkbox rounded-full border-2 border-accent bg-accent/25 text-2xl hover:bg-accent/75"
                      name={color?.code}
                      value={color?.code || ""}
                      checked={selectedColors.includes(color?.code)}
                      onChange={() => handleColorSelection(color?.code)}
                    />
                    <span className="capitalize">{color?.name}</span>
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
