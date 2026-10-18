import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { Loader2 } from "lucide-react";

export default function AuthRoute() {
  const { isAuth, loading } = useAuth();

  if (loading)
    return (
      <div className="flex flex-col items-center gap-4 m-60">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    );

  return isAuth ? <Navigate to="/prop-share/dashboard" replace /> : <Outlet />;
}
