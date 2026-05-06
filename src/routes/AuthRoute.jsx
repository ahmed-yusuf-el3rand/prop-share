import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

export default function AuthRoute() {
  const { isAuth, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isAuth ? <Navigate to="/dashboard" replace /> : <Outlet />;
}