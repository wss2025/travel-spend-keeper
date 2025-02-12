
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const AuthRequired = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
