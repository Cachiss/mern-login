import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useauth";
import ThreeBody from '../components/loading';

export const OnlyLoggedOut = ({ children}) => {
    const { user, isLoaded } = useAuth();
    console.log(window.location.pathname);
    console.log(user);
    if(!isLoaded){
        return <ThreeBody />
    }
    return user == null ? children : <Navigate to="/" />;
}
