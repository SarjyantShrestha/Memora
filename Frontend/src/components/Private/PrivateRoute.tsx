import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useAppContext } from "../../context/Contexts";

const PrivateRoute = () => {
  const { accessToken, setAccessToken, setIsAuthenticated } = useAppContext();
  console.log("HELLO FROM THE PRIVATE ROUTEEE");

  //If accessToken is valid then set accessToken
  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    if (access) {
      setAccessToken(access);
      setIsAuthenticated(true);
    }
  }, [accessToken, setAccessToken]);

  // If no accessToken, redirect to the login page
  if (!accessToken && !localStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
