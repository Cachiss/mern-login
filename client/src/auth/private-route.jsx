import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useauth";
import ThreeBody from '../components/loading';

export const ProtectedRoute = ({ children}) => {
    const { user, isLoaded } = useAuth();
    if(!isLoaded){
        return <ThreeBody />
    }
    return user ? children : <Navigate to="/login" />;
}
