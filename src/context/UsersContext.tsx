import { createContext, PropsWithChildren, useState } from "react";
import { User } from "../types";

type UsersContextType = {
  users: User[];
    addUser: (user: User) => void;
};

type UsersContextProviderProps = PropsWithChildren
    
export const UsersContext = createContext<UsersContextType>({users: [], addUser: () =>{}});

function UsersContextProvider({ children }:UsersContextProviderProps) {
    const [users, setUsers] = useState<User[]>([]);
    function addUser(user: User) {
        setUsers((state) => [...state, { ...user,Id: state.length + 1}]);
    }

    return (
        <UsersContext.Provider value= {{ users, addUser }}>
            {children}
        </UsersContext.Provider>
    )
}
export default UsersContextProvider