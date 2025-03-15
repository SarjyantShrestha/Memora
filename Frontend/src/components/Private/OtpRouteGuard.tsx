import { Navigate, Outlet } from "react-router";
import { useAppContext } from "../../context/Contexts";

const OtpRouteGuard = () => {
  const { isRegistered } = useAppContext();

  // If the user is not registered, redirect to /signup
  if (!isRegistered) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
};

export default OtpRouteGuard;
