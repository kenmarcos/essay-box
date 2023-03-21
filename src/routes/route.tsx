import { useAuth } from "@/providers/Auth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/" />;
};

export const PublicRoute = () => {
  const { token } = useAuth();

  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};
