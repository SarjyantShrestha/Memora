import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { useAppContext } from "../../context/Contexts";
import { authapi } from "../../config/axios";

interface CreateNoteFormProps {
  isFormOpen: boolean;
  onClose: () => void;
  note?: any; // Make optional
  isEditing?: boolean; // Make optional
}

const NoteManager = ({
  isFormOpen,
  onClose,
  note,
  isEditing,
}: CreateNoteFormProps) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const { fetchCategories, fetchNotes } = useAppContext();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: note?.title || "",
      content: note?.content || "",
      categoryIds: note?.categories || [],
    },
  });

  // Watch for changes to the form fields
  const categories = watch("categoryIds");

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFormOpen]);

  // Ensure form fields are updated if note is fetched after initial render
  useEffect(() => {
    if (note) {
      setValue("title", note.title);
      setValue("content", note.content);
      setValue("categoryIds", note.categories);
    }
  }, [note, setValue]);

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      const newSelected = prevSelected.includes(categoryId)
        ? prevSelected.filter((c) => c !== categoryId)
        : [...prevSelected, categoryId];

      // Update the form value with the array of category IDs
      setValue("categoryIds", newSelected);
      return newSelected;
    });
  };

  // Handle the delete operation directly in this component
  const handleDelete = async (e: any) => {
    e.preventDefault();

    if (note && note.id) {
      try {
        const response = await authapi.delete(`/notes/${note.id}`);

        if (response.status === 200) {
          console.log("Note deleted");
        }
        fetchNotes();
        onClose();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  // Handle save or update (create or update)
  const handleCreateOrUpdate = async (data: any) => {
    try {
      if (isEditing) {
        // Update the existing note
        const response = await authapi.put(`/notes/${note.id}`, data);
        if (response.status === 200) {
          console.log("Note updated successfully");
          fetchNotes();
        }
      } else {
        // Create a new note
        console.log(data);
        const response = await authapi.post("/notes", data);
        if (response.status === 201) {
          console.log("Note created successfully");
          console.log("note fetch after note creation");
          fetchNotes();
        }
      }
      onClose();
    } catch (error) {
      console.error("Error saving/updating note:", error);
    }
  };

  const onFormSubmit = (data: any) => {
    handleCreateOrUpdate(data);
  };

  if (!isFormOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center transition-all duration-300 ease-in-out text-gray-600 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-black mb-4">
          {isEditing ? "Edit Note" : "Create Note"}
        </h2>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-6">
            <input
              type="text"
              id="title"
              required
              placeholder="Title"
              {...register("title")}
              className="w-full py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <textarea
              id="content"
              placeholder="Write your note..."
              {...register("content")}
              rows={5}
              className="w-full py-2 bg-transparent border rounded border-gray-300 focus:outline-none focus:border-blue-500 p-2 resize-none h-[300px]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Categories:
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-auto">
              {fetchCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`
                    flex items-center p-2 border rounded cursor-pointer
                    ${
                      categories.includes(category.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }
                  `}
                >
                  <div
                    className={`
                    w-5 h-5 mr-2 flex items-center justify-center rounded border
                    ${
                      categories.includes(category.id)
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-400"
                    }
                  `}
                  >
                    {categories.includes(category.id) && (
                      <Check size={16} color="white" />
                    )}
                  </div>
                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
            {/* Hidden input to track selected categories */}
            <input type="hidden" {...register("categoryIds")} />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:bg-gray-200 py-2 px-4 border border-gray-300 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            {isEditing && (
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors cursor-pointer"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteManager;
