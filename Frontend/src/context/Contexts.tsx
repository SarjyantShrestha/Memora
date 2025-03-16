import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import { authapi } from "../config/axios";

// interface Category {
//   id: number;
//   name: string;
// }

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
  notes: string[];
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
  fetchCategories: string[];
  setFetchCategories: React.Dispatch<React.SetStateAction<string[]>>;

  logout: () => void;
  fetchNotes: () => void;
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
  const [fetchCategories, setFetchCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState<any[]>([]);

  const navigate = useNavigate();

  // Fetch categories after login
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      const fetchCategories = async () => {
        try {
          const response = await authapi.get("/categories", {});

          const categoryNames = response.data.categories.map(
            (category: { name: string }) => category.name,
          );

          setFetchCategories(categoryNames);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      fetchCategories();
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
  const fetchNotes = async () => {
    try {
      const response = await authapi.get("/notes"); // Update the endpoint as per your API
      if (response.status === 200) {
        console.log(response.data.notes);
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

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
