import { createContext, PropsWithChildren, useState } from "react";

type TokenContextType = {
    token: string;
    setToken: (value: string) => void;
};
type TokenContextProviderProps = PropsWithChildren

export const TokenContext = createContext<TokenContextType>({ token: "", setToken: () => { } });

function TokenContextProvider({ children }:TokenContextProviderProps) {
    const [token, setToken] = useState<string>("");

    return (
        <TokenContext.Provider value= {{ token,setToken}}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenContextProvider