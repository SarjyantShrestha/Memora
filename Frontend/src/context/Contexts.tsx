import React, { createContext, useState, useContext, ReactNode } from "react";
import { useNavigate } from "react-router";
import { authapi } from "../config/axios";

// Define the context type
interface ContextType {
  email: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
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
  const [isRegistered, setIsRegistered] = useState<boolean>(false); // Track registration status
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // // Logout function
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
