import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { useAppContext } from "../../context/Contexts";

interface CreateNoteFormProps {
  isFormOpen: boolean;
  onClose: () => void;
}

const CreateNoteForm = ({ isFormOpen, onClose }: CreateNoteFormProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { fetchedCategories } = useAppContext();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      content: "",
      categories: [] as string[],
    },
  });

  // Watch for changes to the form fields
  const categories = watch("categories");

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

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prevSelected) => {
      const newSelected = prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category];

      // Update the form value
      setValue("categories", newSelected);
      return newSelected;
    });
  };

  const onFormSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Here you would handle saving the note with the selected categories
    onClose();
  };

  if (!isFormOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center transition-all duration-300 ease-in-out text-gray-600"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-black mb-4">Create Note</h2>
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
              className="w-full py-2 bg-transparent border rounded border-gray-300 focus:outline-none focus:border-blue-500 p-2 resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Categories:
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-auto">
              {fetchedCategories.map((category) => (
                <div
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`
                    flex items-center p-2 border rounded cursor-pointer
                    ${
                      categories.includes(category)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }
                  `}
                >
                  <div
                    className={`
                    w-5 h-5 mr-2 flex items-center justify-center rounded border
                    ${
                      categories.includes(category)
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-400"
                    }
                  `}
                  >
                    {categories.includes(category) && (
                      <Check size={16} color="white" />
                    )}
                  </div>
                  <span className="text-sm">{category}</span>
                </div>
              ))}
            </div>
            {/* Hidden input to track selected categories */}
            <input type="hidden" {...register("categories")} />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:bg-gray-200 py-2 px-4 border border-gray-300 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteForm;
