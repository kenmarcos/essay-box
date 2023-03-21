import { useAuth } from "@/providers/Auth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { user } = useAuth();

  return user.token ? <Outlet /> : <Navigate to="/" />;
};

export const PublicRoute = () => {
  const { user } = useAuth();

  return user.token ? <Navigate to="/dashboard" /> : <Outlet />;
};
