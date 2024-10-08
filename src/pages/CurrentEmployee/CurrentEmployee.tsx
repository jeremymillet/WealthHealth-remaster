import { Link } from "react-router-dom"
import TabEmployees from "../../components/TabEmployees/TabEmployees"
import './CurrentEmployee.css'
import Header from "../../components/Header/Header"
import { LoginContext } from "../../context/LoginContext";
import { useContext } from "react";

function CurrentEmployee() {
    const loginContext = useContext(LoginContext);
    const { isLogin } = loginContext;

    if (!LoginContext) {
        throw new Error('usersContext must be used within a UsersContext.Provider');
    }

    return (
        <div>
            <Header/>
            <h1>Current Employees</h1>
            <TabEmployees />
            {isLogin ? <Link to={"/createEmployees"}>Create Employees</Link> : "" }
        </div>
    )
}
export default CurrentEmployee