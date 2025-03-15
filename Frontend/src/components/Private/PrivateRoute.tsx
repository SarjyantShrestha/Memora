import { Navigate, Outlet } from "react-router";
import { useAppContext } from "../../context/Contexts";

const PrivateRoute = () => {
  const { accessToken } = useAppContext();

  // If no accessToken, redirect to the login page
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
