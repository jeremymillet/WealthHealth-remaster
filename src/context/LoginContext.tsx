import { createContext, PropsWithChildren, useState } from "react";

type LoginContextType = {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
};
type UsersContextProviderProps = PropsWithChildren

export const LoginContext = createContext<LoginContextType>({ isLogin: false, setIsLogin: () => { } });

function LoginContextProvider({ children }:UsersContextProviderProps) {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    return (
        <LoginContext.Provider value= {{ isLogin,setIsLogin}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider