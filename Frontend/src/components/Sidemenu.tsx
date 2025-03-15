import { NotebookPen, Diamond, PlusCircle } from "lucide-react";
import Categories from "./Categories";

const SideMenu = () => {
  return (
    <div className="flex flex-col">
      {/* Add Note Button */}
      <button className="flex items-center bg-purple-600 text-white py-3 px-4 rounded-lg mb-6 hover:bg-purple-700 transition-colors duration-200 cursor-pointer">
        <NotebookPen size={18} className="mr-2" />
        <span className="font-medium">Add Note</span>
      </button>

      {/* Categories Section Title*/}
      <div className="flex justify-between items-center text-md font-medium mb-4 text-gray-600">
        <span>CATEGORIES</span>
        <PlusCircle
          size={20}
          className="text-gray-500 cursor-pointer hover:text-blue-600"
        />
      </div>

      {/* List of category*/}
      <div className="flex-1 py-2 max-h-[calc(90vh-200px)] overflow-auto bg-gray-100 rounded-b-lg">
        <Categories Icon={Diamond} />
      </div>
    </div>
  );
};

export default SideMenu;
