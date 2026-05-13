import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);       // Firebase user
    const [dbUser, setDbUser] = useState(null);   // MongoDB user
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_API_URL}/api/users/${firebaseUser.uid}`
                    );
                    setDbUser(res.data);
                } catch {
                    setDbUser(null);
                }
            } else {
                setDbUser(null);
            }
            setLoading(false);
        });
        return unsub;
    }, []);

    const logout = () => signOut(auth);

    const refreshDbUser = async () => {
        if (user) {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users/${user.uid}`
            );
            setDbUser(res.data);
        }
    };

    return (
        <AuthContext.Provider value={{ user, dbUser, loading, logout, refreshDbUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
