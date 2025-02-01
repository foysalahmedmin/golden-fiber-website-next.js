import { getAllCategories } from "@/network/categories/api";
import { ChevronRight } from "lucide-react";
import CategoryList from "../CategoryList";

const CategoryItem = async ({ item }) => {
  const { _id, name } = item;
  const { data: categories } = await getAllCategories({ parent_category: _id });
  return (
    <div className="group/category-item">
      <div className="flex cursor-pointer items-center justify-between gap-2 px-4 py-1 hover:bg-muted/25 hover:shadow-inner">
        <span>{name}</span>
        {categories?.length > 0 && <ChevronRight size={16} />}
      </div>
      {categories?.length > 0 && <CategoryList categories={categories} />}
    </div>
  );
};

export default CategoryItem;
