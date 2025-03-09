import SubCategoryItem from "./SubCategoryItem";

const SubCategories = ({ categories }) => {
  return (
    <div className="hidden overflow-hidden pl-4 group-hover/category-item:block">
      <ul className="">
        {categories?.map((item, i) => (
          <li key={i} className="border-b border-r p-4">
            <SubCategoryItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategories;
