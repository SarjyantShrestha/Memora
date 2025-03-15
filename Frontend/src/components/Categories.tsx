import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface CategoriesProps {
  Icon?: LucideIcon;
}

const Categories = ({ Icon }: CategoriesProps) => {
  const categories: string[] = [
    "Technology",
    "Science",
    "Health",
    "Education",
    "Business",
    "Sports",
    "Music",
    "Art",
    "Travel",
    "Food",
    "Fashion",
    "Lifestyle",
  ];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (categories.length === 0) {
    return <></>;
  }
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="">
      {/* "All Notes" Button */}
      <div className="flex items-center py-2 px-6 text-black font-semibold hover:bg-blue-100 rounded-lg cursor-pointer transition-colors duration-200 mb-1">
        <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
          All Notes
        </span>
      </div>
      {categories &&
        categories.map((category, index) => (
          <div
            key={index}
            className={`flex items-center py-2 px-6 text-black hover:bg-blue-100 rounded-lg cursor-pointer transition-colors duration-200 mb-1 ${
              selectedCategory === category ? "bg-blue-100" : ""
            }`}
            onClick={() => handleCategorySelect(category)}
          >
            {Icon && (
              <Icon size={18} className="mr-3 text-gray-500 flex-shrink-0" />
            )}
            <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
              {category}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Categories;
