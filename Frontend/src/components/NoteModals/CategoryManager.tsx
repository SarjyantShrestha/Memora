import React, { useState, useEffect } from "react";
import { X, Plus, Trash, Loader2, AlertCircle } from "lucide-react";
import { useAppContext } from "../../context/Contexts";
import { authapi } from "../../config/axios";

interface CategoryManagerProps {
  isFormOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: number;
  name: string;
}

const CategoryManager = ({ isFormOpen, onClose }: CategoryManagerProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchCategories, loadCategories } = useAppContext();

  // Load categories when component mounts
  useEffect(() => {
    if (isFormOpen) {
      loadCategoriesInForm();
    }
  }, [isFormOpen, fetchCategories]);

  const loadCategoriesInForm = async () => {
    setLoading(true);
    setError(null);
    try {
      setCategories(fetchCategories as Category[]);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent adding empty category name
    if (!newCategory.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Make the API request to add a new category
      const response = await authapi.post("/categories", {
        name: newCategory.trim(),
      });

      // Check if category was added successfully
      if (response.status !== 201) {
        throw new Error("Failed to add category");
      }

      // Reload categories after successfully adding the new one
      loadCategories();

      // Clear the new category input field
      setNewCategory("");
    } catch (err) {
      setError("Category already exists");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authapi.delete(`/categories/${categoryId}`);

      if (response.status !== 200) {
        throw new Error("Failed to delete category");
      }

      loadCategories();
      // Remove the deleted category from the state
      setCategories(
        categories.filter((category) => category.id !== categoryId),
      );
    } catch (err) {
      setError("Failed to delete category. Please try again.");
      console.error("Error deleting category:", err);
    } finally {
      setLoading(false);
    }
  };

  // If modal is not open, don't render anything
  if (!isFormOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-gray-600">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Manage Categories</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {/* Add Category Form */}
          <form onSubmit={handleAddCategory} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewCategory(e.target.value)
                }
                placeholder="Enter category name"
                className="flex-1 p-2 border border-gray-200 rounded focus:outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                disabled={loading || !newCategory.trim()}
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Plus size={18} />
                )}
                Add
              </button>
            </div>
          </form>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded flex items-start gap-2">
              <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Categories List */}
          <div className="border border-gray-200 rounded overflow-hidden">
            <h3 className="p-2 bg-gray-100 font-medium">Your Categories</h3>
            {loading && categories.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                <p>Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No categories added yet
              </div>
            ) : (
              <ul className="divide-y max-h-64 overflow-y-auto">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="flex justify-between items-center border-none  my-1 p-3 hover:bg-gray-50"
                  >
                    <span>{category.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-500 hover:text-red-700 disabled:text-red-300 cursor-pointer"
                      disabled={loading}
                      type="button"
                    >
                      <Trash size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
