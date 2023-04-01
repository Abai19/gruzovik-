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
    const [token, setToken] = useState<string| null>( ""
    //   () => {
    //   if (typeof window !== 'undefined') {
    //     const value = window.localStorage.getItem('token');
    //     return value !== null ? value : '';
    //   } else {
    //     return '';
    //   }
    // }
    );
    // useEffect(() => {
    //   localStorage.setItem('token', token !== null ? token : "");
    // }, [token]);
    const login = (token: string) => {
      setToken(token);
      localStorage.setItem("token", token)
    };

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