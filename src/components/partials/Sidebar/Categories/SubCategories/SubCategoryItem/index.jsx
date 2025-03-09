import { cn } from "@/lib/utils";
import Link from "next/link";

const SubCategoryItem = async ({ item }) => {
  const { _id, name } = item;

  return (
    <>
      <Link
        href="shop"
        params={{ sub_category: _id }}
        className={cn(
          "short-underline mb-2 block font-semibold text-title hover:text-pretty hover:text-primary hover:after:w-full",
        )}
      >
        {name}
      </Link>
    </>
  );
};

export default SubCategoryItem;
