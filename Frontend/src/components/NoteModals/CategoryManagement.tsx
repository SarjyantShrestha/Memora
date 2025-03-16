import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../context/Contexts";
import { Trash2 } from "lucide-react";
import { authapi } from "../../config/axios";

interface CategoryProps {
  isFormOpen: boolean;
  onClose: () => void;
}

const CategoryManagement = ({ isFormOpen, onClose }: CategoryProps) => {
  const { fetchedCategories, setFetchedCategories } = useAppContext();
  const { register, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      newCategory: "",
      categories: fetchedCategories || [],
    },
  });

  const [categories, setCategories] = useState<string[]>(
    fetchedCategories || [],
  );

  useEffect(() => {
    setCategories(fetchedCategories); // Sync categories from context
  }, [fetchedCategories]);

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

  //Add Category method
  const addCategory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission

    const categoryName = watch("newCategory").trim(); // Get input value

    if (!categoryName || categories.includes(categoryName)) return; // Prevent empty or duplicate entries

    try {
      const response = await authapi.post("/categories", {
        name: categoryName, // Send as { name: "CategoryName" }
      });

      if (response.status === 201) {
        const updatedCategories = [...categories, categoryName];
        setFetchedCategories(updatedCategories);
        setValue("categories", updatedCategories);
        setValue("newCategory", "");
      }
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const onFormSubmit = (data: any) => {
    console.log("Form Data:", data);
    onClose();
    reset();
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
        <h2 className="text-2xl font-semibold text-black mb-4">
          Manage Categories
        </h2>

        {/* Input Field with Add Button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter new category"
            {...register("newCategory")}
            className="w-full py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={addCategory}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <h3 className="text-md font-medium mb-2 text-gray-800">
          Available Categories
        </h3>
        <ul className="border border-gray-200 rounded-md p-2 max-h-60 overflow-auto">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-2 px-4"
              >
                <span>{category}</span>
                <button
                  type="button"
                  onClick={() => {
                    const updatedCategories = categories.filter(
                      (_, i) => i !== index,
                    );
                    setCategories(updatedCategories);
                    setValue("categories", updatedCategories);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm">No categories available</li>
          )}
        </ul>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex mx-auto"
        >
          Save Categories
        </button>
      </div>
    </div>
  );
};

export default CategoryManagement;
