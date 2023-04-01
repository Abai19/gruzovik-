import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type authContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
};


const authContextDefaultValues: authContextType = {
    token: null ,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {

    const [token, setToken] = useState<string| null>( "");
    const login = (token: string) => {
      setToken(token);
      localStorage.setItem("token", token)
    };
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
    
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token")
    };

    const value = {
        token,
        login,
        logout,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}