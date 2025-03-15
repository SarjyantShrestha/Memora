import { useState } from "react";
import { NotebookPen, Diamond, PlusCircle } from "lucide-react";
import Categories from "./Categories";
import NoteModal from "./NoteModal";

const SideMenu = () => {
  const [opened, setOpened] = useState(false); // For opening/closing the modal
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    category: [],
  }); // Empty note state for adding new notes

  const handleCloseModal = () => setOpened(false); // Close the modal

  const handleSaveNote = () => {
    console.log("New note saved:", note);
    setOpened(false); // Close modal after saving
  };

  return (
    <div className="flex flex-col">
      {/* Add Note Button */}
      <button
        className="flex items-center bg-blue-500 text-white py-3 px-4 rounded-lg mb-6 hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
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
