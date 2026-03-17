/*eslint-disable react-refresh/only-export-components */
import { useState , createContext , useContext} from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user , setUser] = useState({
        token: localStorage.getItem("token") || null,
        email: localStorage.getItem("email") || null,
        role: localStorage.getItem("role") || null, 
    });
    

    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.roles);
        setUser({
            token: data.token,
            email: data.email,
            role: data.roles,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        setUser({
            token: null,
            email: null,
            role: null,
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};


export const useAuth = () => useContext(AuthContext);

