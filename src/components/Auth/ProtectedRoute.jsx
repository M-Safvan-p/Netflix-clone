import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Common/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
