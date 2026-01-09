import { useContext, createContext, useState, useEffect } from "react";
import { account } from "../services/appwrite";
const AuthContext = createContext();

export default function AuthProvider({ children }) {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        account.get()
            .then(user => setUser(user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])
    return (
        <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    return useContext(AuthContext);
}