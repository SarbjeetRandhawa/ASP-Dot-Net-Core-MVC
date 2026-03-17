import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoute({ children }) {
    const { user } = useAuth();
    if (!user.token || !user) {
        return <Navigate to="/auth/login"/>;
    
    }
    return children;
}
export default ProtectedRoute;