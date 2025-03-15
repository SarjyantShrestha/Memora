import { useState } from "react";
import { NotebookPen, Diamond, FolderClosed, Plus, Filter } from "lucide-react";
import Categories from "./Categories";
import NoteModal from "./NoteModal";
import { Hash } from "lucide-react";

const SideMenu = () => {
  const [opened, setOpened] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    category: [],
  });

  const handleCloseModal = () => setOpened(false);
  const handleSaveNote = () => {
    console.log("New note saved:", note);
    setOpened(false);
  };

  return (
    <div className="flex flex-col h-full w-64 py-6 px-4 overflow-hidden">
      {/* Action Buttons */}
      <div className="space-y-3 mb-8">
        <button
          className="flex items-center justify-center w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          onClick={() => {
            setNote({
              title: "",
              content: "",
              date: "",
              category: [],
            });
            setOpened(true);
          }}
        >
          <NotebookPen size={16} className="mr-2" />
          <span className="font-medium">New Note</span>
        </button>

        <button className="flex items-center justify-center w-full bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200">
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

      {/* Note Modal */}
      <NoteModal
        opened={opened}
        onClose={handleCloseModal}
        note={note}
        setNote={setNote}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default SideMenu;
