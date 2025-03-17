import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import { authapi } from "../config/axios";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
}

interface Category {
  id: number;
  name: string;
}

interface ContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  fetchCategories: Category[];
  setFetchCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  loadCategories: () => void;
  logout: () => void;
  fetchNotes: () => void;
  // Sorting states
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default undefined value
const Context = createContext<ContextType | undefined>(undefined);

// Props interface
interface ContextProviderProps {
  children: ReactNode;
}

// Provider component
export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [fetchCategories, setFetchCategories] = useState<Category[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  //For sorting
  const [sortBy, setSortBy] = useState("createdAt");
  const [orderBy, setOrderBy] = useState("DESC");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Fetch categories after login
  const loadCategories = async () => {
    try {
      const response = await authapi.get("/categories");

      // Check if response status is 422
      if (response.status === 422) {
        setFetchCategories([]); // Clear categories if status is 422
        console.error("Error fetching categories: Empty category list");
        return;
      }

      const categoryList: Category[] = response.data.categories.map(
        (category: { id: string; name: string }) => ({
          id: category.id,
          name: category.name,
        }),
      );
      setFetchCategories(categoryList);
    } catch (error: any) {
      setFetchCategories([]);

      console.error("Error fetching categories:", error.response.data.message);
    }
  };
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      loadCategories();
    }
  }, [isAuthenticated, accessToken]); // Only run when authenticated or accessToken changes

  // Logout function
  const logout = async () => {
    localStorage.removeItem("accessToken"); // Remove access token
    try {
      const response = await authapi.post("/auth/logout", {});

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
    setAccessToken(null); // Clear state
    navigate("/login"); // Redirect to login page
  };

  //Fetch notes
  const fetchNotes = async (filters = {}) => {
    try {
      const response = await authapi.get("/notes", {
        params: {
          sortBy: sortBy || "createdAt", // Default to 'createdAt'
          orderBy: orderBy || "DESC", // Default to 'DESC'
          search: searchQuery || "",
          ...filters, // Allow additional filters like category and search
        },
      });

      if (response.status === 200) {
        console.log(response.data.notes);
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Update fetchNotes when sorting changes
  useEffect(() => {
    fetchNotes();
  }, [searchQuery, sortBy, orderBy]);

  // Create the value object to pass to the provider
  const value: ContextType = {
    email,
    setEmail,
    accessToken,
    setAccessToken,
    isRegistered,
    setIsRegistered,
    logout,
    name,
    setName,
    isAuthenticated,
    setIsAuthenticated,
    fetchCategories,
    setFetchCategories,
    notes,
    setNotes,
    fetchNotes,
    loadCategories,
    sortBy,
    setSortBy,
    orderBy,
    setOrderBy,
    searchQuery,
    setSearchQuery,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// Custom hook to use the context
export const useAppContext = (): ContextType => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an ContextProvider");
  }

  return context;
};

export default ContextProvider;
