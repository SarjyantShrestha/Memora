import { useState, useEffect } from "react";
import { NotebookPen, FolderClosed } from "lucide-react";
import Categories from "./Categories";
import { Hash, User, LogOut } from "lucide-react";
import NoteManager from "./NoteModals/NoteManager";
import CategoryManager from "./NoteModals/CategoryManager";
import { jwtDecode } from "jwt-decode";

import { useAppContext } from "../context/Contexts";

const SideMenu = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [manageCategory, setManageCategory] = useState(false);
  const { name, setName, logout } = useAppContext();
  const accessToken = localStorage.getItem("accessToken");
  const decodedToken: any = accessToken ? jwtDecode(accessToken) : null;

  useEffect(() => {
    if (decodedToken?.name) {
      setName(decodedToken.name);
    }
  }, [decodedToken, setName]);

  return (
    <>
      <div className="flex flex-col h-full w-64 mb-10 py-6 px-4 overflow-hidden border border-gray-200 rounded-lg">
        <div className="space-y-3 mb-8">
          <button
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            onClick={() => setIsFormOpen(true)}
          >
            <NotebookPen size={16} className="mr-2" />
            <span className="font-medium">New Note</span>
          </button>

          <button
            className="flex items-center justify-center w-full bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 border-none"
            onClick={() => setManageCategory(true)}
          >
            <FolderClosed size={16} className="mr-2" />
            <span className="font-medium">New Category</span>
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-3 flex justify-between items-center border-b border-gray-300 pb-2">
          <h3 className="font-semibold text-sm text-gray-700">CATEGORIES</h3>
        </div>

        {/* Categories List */}
        <div className="overflow-auto">
          <Categories Icon={Hash} />
        </div>

        {isFormOpen && (
          <NoteManager
            isFormOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            note={null}
            isEditing={false}
          />
        )}

        {manageCategory && (
          <CategoryManager
            isFormOpen={manageCategory}
            onClose={() => setManageCategory(false)}
          />
        )}
      </div>
      {/* User info and logout - always at the bottom on mobile, right-aligned on larger screens */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm rounded-lg mx-4 md:mx-6 lg:mx-8">
        <div className="flex items-center gap-3">
          {/* Profile Avatar with gradient background */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm">
            <User size={20} className="text-white" />
          </div>

          {/* Name with better typography */}
          {name && (
            <div className="flex flex-col">
              <span className="text-gray-800 font-medium text-sm md:text-base">
                {name}
              </span>
            </div>
          )}
        </div>

        {/* Logout button with improved interaction */}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-red-100"
        >
          <LogOut size={18} />
        </button>
      </div>
    </>
  );
};

export default SideMenu;
