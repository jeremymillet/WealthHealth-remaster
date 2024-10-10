import { Link } from "react-router-dom"
import TabEmployees from "../../components/TabEmployees/TabEmployees"
import './CurrentEmployee.css'
import Header from "../../components/Header/Header"
import useAuthContext from "../../context/hook/useAuthContext";


function CurrentEmployee() {
    const {isLogin} = useAuthContext();
    
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