import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the context type
interface ContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
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

  // Create the value object to pass to the provider
  const value: ContextType = {
    email,
    setEmail,
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
