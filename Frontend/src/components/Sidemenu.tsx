import { useState } from "react";
import { NotebookPen, FolderClosed } from "lucide-react";
import Categories from "./Categories";
import { Hash } from "lucide-react";
import CreateNoteForm from "./NoteModals/CreateNote";
import CategoryManagement from "./NoteModals/CategoryManagement";

const SideMenu = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [manageCategory, setManageCategory] = useState(false);

  return (
    <div className="flex flex-col h-full w-64 py-6 px-4 overflow-hidden">
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
        <CreateNoteForm
          isFormOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {manageCategory && (
        <CategoryManagement
          isFormOpen={manageCategory}
          onClose={() => setManageCategory(false)}
        />
      )}
    </div>
  );
};

export default SideMenu;
