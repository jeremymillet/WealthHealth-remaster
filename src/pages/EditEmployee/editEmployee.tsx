import { Link } from "react-router-dom"
import EditEmployeeForm from "../../components/EditEmployeeForm/editEmployeeForm"

function EditEmployeePage() {
    return (
        <div>
            <h1 className="title">HRnet</h1>
            <Link to={"/"} >View Current Employees</Link>
            <h2>Edit Employee</h2>
            <div>
                <EditEmployeeForm/>
            </div>
        </div>
    )
}

export default EditEmployeePage