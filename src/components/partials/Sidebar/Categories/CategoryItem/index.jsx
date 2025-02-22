import { getAllSubCategories } from "@/network/categories/api";
import { ChevronRight } from "lucide-react";
import SubCategories from "../SubCategories";

const CategoryItem = async ({ item }) => {
  const { _id, name } = item;
  const { data: subCategories } = await getAllSubCategories({
    parent_category: _id,
  });
  return (
    <div className="group/category-item">
      <div className="flex cursor-pointer items-center justify-between gap-2 px-4 py-1 hover:bg-muted/25 hover:shadow-inner">
        <span>{name}</span>
        {subCategories?.length > 0 && <ChevronRight size={16} />}
      </div>
      {subCategories?.length > 0 && (
        <SubCategories categories={subCategories} />
      )}
    </div>
  );
};

export default CategoryItem;
