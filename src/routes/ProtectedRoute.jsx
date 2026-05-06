import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

export default function ProtectedRoute() {
  const { isAuth, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}