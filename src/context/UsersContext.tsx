import { createContext, PropsWithChildren, useState } from "react";
import { EmployeeFormValues } from "../types";


type UsersContextType = {
  users: EmployeeFormValues[];
    addUser: (user: EmployeeFormValues) => void;
};


type UsersContextProviderProps = PropsWithChildren
    
export const UsersContext = createContext<UsersContextType>({ users: [], addUser: () => { } });


function UsersContextProvider({ children }:UsersContextProviderProps) {
    const [users, setUsers] = useState<EmployeeFormValues[]>([]);

     function addUser(user: EmployeeFormValues) {
        setUsers((state) => [...state, { ...user,Id: state.length + 1}]);
    }
    
    return (
        <UsersContext.Provider value= {{ users, addUser}}>
            {children}
        </UsersContext.Provider>
    )
}


export default UsersContextProvider