import { createContext, useState, type PropsWithChildren } from "react";
import type { userDetails } from "@/types/auth";

type AuthContextType = {
    auth: userDetails | null;
    setAuth: React.Dispatch<React.SetStateAction<userDetails | null>>;
};

export const AuthContext = createContext<AuthContextType>({
    auth: null,
    setAuth: () => { },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = useState<userDetails | null>(null);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}