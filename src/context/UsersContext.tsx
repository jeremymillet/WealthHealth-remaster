import { createContext, PropsWithChildren, useState } from "react";
import { EmployeeToDB } from "../types";


type UsersContextType = {
  users: EmployeeToDB[];
    addUser: (user: EmployeeToDB) => void;
};


type UsersContextProviderProps = PropsWithChildren
    
export const UsersContext = createContext<UsersContextType>({ users: [], addUser: () => { } });


function UsersContextProvider({ children }:UsersContextProviderProps) {
    const [users, setUsers] = useState<EmployeeToDB[]>([]);

     function addUser(user: EmployeeToDB) {
        setUsers((state) => [...state, { ...user,Id: state.length + 1}]);
    }
    
    return (
        <UsersContext.Provider value= {{ users, addUser}}>
            {children}
        </UsersContext.Provider>
    )
}


export default UsersContextProvider