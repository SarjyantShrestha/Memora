import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useAppContext } from "../../context/Contexts";

const PrivateRoute = () => {
  const { accessToken, setAccessToken } = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !accessToken) {
      setAccessToken(token);
    }
  }, [accessToken, setAccessToken]);

  // If no accessToken, redirect to the login page
  if (!accessToken && !localStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
