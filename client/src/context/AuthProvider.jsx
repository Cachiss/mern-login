import { useState, useEffect, createContext } from "react";
import { getUser } from "../api/user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
             getUser(window.localStorage.getItem('_idtoken'))
                 .then((res) => {
                     if(res.status != 200){
                        setLoaded(true);
                     }
                     else{
                         res.json()
                                .then((res) => {
                                    setUser(res.user)
                                    setLoaded(true);
                                    console.log("in context",isLogin)
                                })
                                .catch((err) => {
                                    setLoaded(true);
                                })
                     }
                 })
         }, []);
         
    return (
        <AuthContext.Provider value={{user, isLoaded}}>
            {children}
        </AuthContext.Provider>
    );
}

