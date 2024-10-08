import { Link } from "react-router-dom"
import CreateEmployeeForm from "../../components/CreateEmployeeForm/CreateEmployeeForm"
import './Home.css'

function Home() {
    return (
        <div>
            <h1 className="title">HRnet</h1>
            <Link to={"/"} >View Current Employees</Link>
            <h2>Create Employee</h2>
            <div>
                <CreateEmployeeForm/>
            </div>
        </div>
    )
}

export default Home