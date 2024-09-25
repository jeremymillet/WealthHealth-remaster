import { Link } from "react-router-dom"
import TabEmployees from "../../components/TabEmployees/TabEmployees"
import './CurrentEmployee.css'

function CurrentEmployee() {
    return (
        <div>
            <h1>Current Employees</h1>
            <TabEmployees />
            <Link to={"/"}>Home</Link>
        </div>
    )
}
export default CurrentEmployee