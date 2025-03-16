import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authapi } from "../../config/axios";
import { useAppContext } from "../../context/Contexts";

export const useAuthCheck = () => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAppContext();

  useEffect(() => {
    const checkAuth = async () => {
      // If we already know the user is authenticated, no need to check again
      if (isAuthenticated) {
        setIsChecking(false);
        try {
          await authapi.get("/protected");
          // Authentication successful
          setIsAuthenticated(true);
          setIsChecking(false);
        } catch (error) {
          console.log("Authentication failed even after refresh attempt");
          setIsAuthenticated(false);
          navigate("/login");
          setIsChecking(false);
        }
      } else {
        navigate("/login");
      }
    };

    checkAuth();
  }, [isAuthenticated, setIsAuthenticated]);

  return isChecking;
};
