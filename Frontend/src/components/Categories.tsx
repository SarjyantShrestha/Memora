// import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { useAppContext } from "../context/Contexts";

interface CategoriesProps {
  Icon?: LucideIcon;
}

const Categories = ({ Icon }: CategoriesProps) => {
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { fetchCategories } = useAppContext();

  if (fetchCategories.length === 0) {
    return <></>;
  }
  // const handleCategorySelect = (category: string) => {
  //   setSelectedCategory(category);
  // };

  // const handleAllNotes = () => {
  //   setSelectedCategory(null);
  // };

  return (
    <div>
      {/* "All Notes" Button */}
      {/*
      <div
        className="flex items-center py-2 px-6 text-black font-semibold hover:bg-blue-100 rounded-lg cursor-pointer transition-colors duration-200 mb-1"
        onClick={handleAllNotes}
      >
        <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
          Show All Notes
        </span>
      </div>
        */}
      {fetchCategories &&
        fetchCategories.map((category, index) => (
          <div
            key={index}
            className="flex items-center py-2 px-6 text-black rounded-lg  transition-colors duration-200 mb-1"
            // onClick={() => handleCategorySelect(category.name)}
          >
            {Icon && (
              <Icon size={18} className="mr-3 text-gray-500 flex-shrink-0" />
            )}
            <span className="overflow-hidden text-md whitespace-nowrap text-ellipsis max-w-[200px]">
              {category.name}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Categories;
