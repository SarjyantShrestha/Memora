import { LucideIcon } from "lucide-react";

interface CategoriesProps {
  Icon?: LucideIcon;
}

const Categories: React.FC<CategoriesProps> = ({ Icon }) => {
  const categories: string[] = [
    "test",
    "check",
    "test",
    "check",
    "test",
    "check",
    "test",
    "check",
    "test",
    "check",
    "test",
    "check",
    "test",
    "check",
    "test",
    "check",
    "test",
    "check",
    "test",
    "check",
  ];

  if (categories.length === 0) {
    return <></>;
  }
  return (
    <div className="bg-gray-100 ">
      {categories &&
        categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center py-2 px-6 text-black hover:bg-gray-200 cursor-pointer transition-colors duration-200 mb-1"
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
