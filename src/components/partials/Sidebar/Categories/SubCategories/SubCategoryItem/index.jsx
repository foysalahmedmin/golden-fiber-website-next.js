import { cn } from "@/lib/utils";
import Link from "next/link";

const SubCategoryItem = async ({ item }) => {
  const { name } = item;
  return (
    <>
      <Link
        href="#"
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
