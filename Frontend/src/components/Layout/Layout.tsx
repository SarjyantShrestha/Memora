import { useState } from "react";
import { Outlet } from "react-router";
import {
  NotebookPen,
  FolderClosed,
  LogOut,
  Diamond,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const Layout = () => {
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);
  const categories = ["work", "personal"];

  const toggleCategoryExpand = () => {
    setIsCategoryExpanded(!isCategoryExpanded);
  };

  return (
    <div className="relative h-screen w-screen bg-white overflow-y-hidden flex font-roboto">
      {/* Sidebar */}
      <div className="w-64 bg-white py-8 pr-8 pl-4 text-gray-400 flex flex-col relative h-full ">
        <h2 className="text-3xl font-semibold mb-14 text-black uppercase text-center">
          Memora
        </h2>

        {/* Menu List */}
        <ul className="flex-grow space-y-2">
          <li className="flex text-black cursor-pointer p-2 rounded-r-full hover:bg-gray-100 transition-colors">
            <div className="flex items-center ml-6">
              <NotebookPen className="h-5 w-5 mr-3 text-amber-500" />
              <span className="font-medium">Add Note</span>
            </div>
          </li>

          <li
            className="flex justify-between text-black cursor-pointer p-2 rounded-r-full hover:bg-gray-100 transition-colors"
            onClick={toggleCategoryExpand}
          >
            <div className="flex items-center ml-6">
              <FolderClosed className="h-5 w-5 mr-3 text-amber-500" />
              <span className="font-medium">Category</span>
            </div>
            {isCategoryExpanded ? (
              <ChevronDown className="h-4 w-4 mr-4" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-4" />
            )}
          </li>

          {/* Category Tree List - Only visible when expanded */}
          {isCategoryExpanded && (
            <ul className="pl-16 pr-4 text-gray-600 space-y-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex items-center cursor-pointer p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <Diamond className="h-4 w-4 mr-2 text-amber-400" />
                  <span>{category}</span>
                </li>
              ))}
            </ul>
          )}
        </ul>

        {/* Logout Button */}
        <button className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-medium flex items-center shadow-sm transition-colors">
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="absolute top-24 left-64 w-screen h-screen bg-gray-100 p-10 rounded-tl-2xl overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
