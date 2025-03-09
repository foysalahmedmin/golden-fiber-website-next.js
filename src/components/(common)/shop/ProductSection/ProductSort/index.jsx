"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownToggler,
} from "@/components/ui/Dropdown";
import { QueryLink } from "@/components/ui/QueryLink";
import { useSearchParams } from "next/navigation";

const ProductSort = () => {
  const sorts = [
    { label: "Newest", value: "-date" },
    { label: "Oldest", value: "date" },
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
  ];
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const currentSort = currentParams.get("sort");
  const currentSortLabel =
    sorts?.find((item) => item?.value === currentSort)?.label || "None";

  return (
    <div className="flex items-center gap-2">
      <span>Sort By: </span>{" "}
      <Dropdown>
        <DropdownToggler
          variant="link"
          className="inline-block px-0 py-0 font-bold"
        >
          {currentSortLabel}
        </DropdownToggler>
        <DropdownContent className="left-auto w-60 bg-background px-0 py-2">
          <ul className="divide-y">
            {sorts?.map((item, i) => (
              <li key={i}>
                <QueryLink
                  params={{ sort: item?.value }}
                  className="block px-2 py-1"
                >
                  {item?.label}
                </QueryLink>
              </li>
            ))}
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

export default ProductSort;
