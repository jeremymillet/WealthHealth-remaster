import { createContext, PropsWithChildren, useState } from "react";


type AuthContextType = {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
    token: string;
    setToken: (value: string) => void;
    logOut: () => void;
};
type AuthContextProviderProps = PropsWithChildren

export const AuthContext = createContext<AuthContextType>({ isLogin: false, setIsLogin: () => { }, token: "", logOut: () => { },setToken: () => { } });


function AuthContextProvider({ children }:AuthContextProviderProps) {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const logOut = () => { 
        setIsLogin(false);
        setToken("");
    }
    return (
        <AuthContext.Provider value= {{ isLogin,setIsLogin,token,logOut,setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider