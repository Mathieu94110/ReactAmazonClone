import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppLayout from "../../components/Layout/AppLayout";
import { AuthContext } from "../../components/Providers/AuthProvider";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" />;
}

export default ProtectedRoute;
